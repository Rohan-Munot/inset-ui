"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function WaveInterference() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    uniforms: any;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    // Fragment shader - Wave Interference Pattern
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        
        vec3 color = vec3(0.0);
        
        // Create multiple wave sources that interfere with each other
        float waves = 0.0;
        
        // Wave source 1 - rotating
        vec2 p1 = vec2(cos(t * 0.5) * 0.5, sin(t * 0.5) * 0.5);
        float d1 = length(uv - p1);
        waves += sin(d1 * 20.0 - t * 2.0) * 0.5;
        
        // Wave source 2 - rotating opposite
        vec2 p2 = vec2(cos(t * 0.5 + 3.14159) * 0.5, sin(t * 0.5 + 3.14159) * 0.5);
        float d2 = length(uv - p2);
        waves += sin(d2 * 20.0 - t * 2.0) * 0.5;
        
        // Wave source 3 - rotating at different speed
        vec2 p3 = vec2(cos(t * 0.7 + 1.57) * 0.4, sin(t * 0.7 + 1.57) * 0.4);
        float d3 = length(uv - p3);
        waves += sin(d3 * 20.0 - t * 2.0) * 0.5;
        
        // Normalize and create sharp patterns
        float pattern = abs(waves) * 0.5;
        pattern = pow(pattern, 0.8);
        
        // Create RGB channels with different phase offsets
        for(int j = 0; j < 3; j++){
          float offset = float(j) * 0.1;
          float channelWave = 0.0;
          
          channelWave += sin(d1 * 20.0 - t * 2.0 + offset) * 0.33;
          channelWave += sin(d2 * 20.0 - t * 2.0 + offset) * 0.33;
          channelWave += sin(d3 * 20.0 - t * 2.0 + offset) * 0.33;
          
          color[j] = abs(channelWave) * 2.0;
        }
        
        // Add intensity boost at interference peaks
        color *= (1.0 + pattern * 0.5);
        
        // Apply distance fade
        float dist = length(uv);
        float fade = smoothstep(1.5, 0.0, dist);
        color *= fade;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Initialize Three.js scene
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    // Handle window resize
    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };

    // Initial resize
    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    };

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    };

    // Start animation
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }

        sceneRef.current.renderer.dispose();
        geometry.dispose();
        material.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="inset-0 -z-10 h-full w-full"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  );
}
