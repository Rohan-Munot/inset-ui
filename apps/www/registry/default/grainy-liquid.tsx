'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type GrainyLiquidProps = {
  color1?: string
  color2?: string
  color3?: string
  color4?: string
  speed?: number
  grainIntensity?: number
  liquidIntensity?: number
  className?: string
  style?: React.CSSProperties
}

export default function GrainyLiquid({
  color1 = '#ff6b9d',
  color2 = '#c06c84',
  color3 = '#6c5b7b',
  color4 = '#355c7d',
  speed = 0.7,
  grainIntensity = 0.08,
  liquidIntensity = 1.0,
  className = '',
  style = {},
}: GrainyLiquidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.Camera
    renderer: THREE.WebGLRenderer
    material: THREE.ShaderMaterial
    animationId: number
    geometry: THREE.PlaneGeometry
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Convert hex colors to RGB
    const hexToRgb = (hex: string): THREE.Vector3 => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? new THREE.Vector3(
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255
          )
        : new THREE.Vector3(1, 1, 1)
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const adjustedSpeed = prefersReducedMotion ? speed * 0.1 : speed

    // Vertex shader - simple pass-through
    const vertexShader = `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `

    // Fragment shader with noise functions and grain
    const fragmentShader = `
      precision highp float;
      
      uniform vec2 resolution;
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform vec3 color4;
      uniform float uSpeed;
      uniform float uGrainIntensity;
      uniform float uLiquidIntensity;
      
      varying vec2 vUv;
      
      // Random function for grain
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      // 2D Noise
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      // 3D Noise (simplified Perlin-like)
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                            0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                           -0.577350269189626,  // -1.0 + 2.0 * C.x
                            0.024390243902439); // 1.0 / 41.0
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      // Fractal Brownian Motion for organic liquid effect
      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 0.0;
        
        for(int i = 0; i < 5; i++) {
          value += amplitude * snoise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      void main() {
        vec2 uv = vUv;
        vec2 st = gl_FragCoord.xy / resolution.xy;
        st.x *= resolution.x / resolution.y;
        
        float t = time * uSpeed;
        
        // Create liquid flow with multiple noise layers
        float noise1 = fbm(st * 2.0 + vec2(t * 0.1, t * 0.05)) * uLiquidIntensity;
        float noise2 = fbm(st * 3.0 - vec2(t * 0.08, t * 0.12)) * uLiquidIntensity;
        float noise3 = fbm(st * 1.5 + vec2(sin(t * 0.05) * 0.5, cos(t * 0.03) * 0.5)) * uLiquidIntensity;
        
        // Combine noise for complex liquid movement
        float liquidPattern = (noise1 + noise2 * 0.5 + noise3 * 0.3) * 0.5 + 0.5;
        
        // Create flowing color transitions
        float colorMix1 = sin(liquidPattern * 3.14159 + t * 0.2) * 0.5 + 0.5;
        float colorMix2 = cos(liquidPattern * 2.0 - t * 0.15) * 0.5 + 0.5;
        float colorMix3 = sin(st.y * 2.0 + noise1 * 2.0 + t * 0.1) * 0.5 + 0.5;
        
        // Mix all 4 colors based on liquid patterns
        vec3 finalColor = mix(color1, color2, colorMix1);
        finalColor = mix(finalColor, color3, colorMix2);
        finalColor = mix(finalColor, color4, colorMix3 * 0.3);
        
        // Add subtle gradient overlay
        float gradientMix = smoothstep(0.0, 1.0, st.y);
        finalColor = mix(finalColor, finalColor * 1.2, gradientMix * 0.2);
        
        // Film grain effect
        float grain = random(st + fract(t)) * 2.0 - 1.0;
        finalColor += grain * uGrainIntensity;
        
        // Add temporal grain variation
        float timeGrain = random(st * time) * 0.5 - 0.25;
        finalColor += timeGrain * uGrainIntensity * 0.5;
        
        // Ensure colors stay in valid range
        finalColor = clamp(finalColor, 0.0, 1.0);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { value: 0.0 },
      resolution: { value: new THREE.Vector2() },
      color1: { value: hexToRgb(color1) },
      color2: { value: hexToRgb(color2) },
      color3: { value: hexToRgb(color3) },
      color4: { value: hexToRgb(color4) },
      uSpeed: { value: adjustedSpeed },
      uGrainIntensity: { value: grainIntensity },
      uLiquidIntensity: { value: liquidIntensity },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Mobile optimization

    container.appendChild(renderer.domElement)

    // Handle window resize
    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = width
      uniforms.resolution.value.y = height
    }

    // Initial resize
    onWindowResize()
    window.addEventListener('resize', onWindowResize, false)

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.016 // Approximately 60fps delta
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      material,
      animationId: 0,
      geometry,
    }

    // Start animation
    animate()

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }

        sceneRef.current.geometry.dispose()
        sceneRef.current.material.dispose()
        sceneRef.current.renderer.dispose()
      }
    }
  }, [color1, color2, color3, color4, speed, grainIntensity, liquidIntensity])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    />
  )
}
