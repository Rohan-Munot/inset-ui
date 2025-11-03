'use client'

import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

type CPPNLavaProps = {
  speed?: number
  flowIntensity?: number
  noiseScale?: number
  grainIntensity?: number
}

const noiseGLSL = `
  // Hash function for noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  
  // 2D noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  
  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    
    return value;
  }
  
  // CPPN activation functions
  float cppn_sin(float x) {
    return sin(x * 3.14159);
  }
  
  float cppn_tanh(float x) {
    return tanh(x);
  }
  
  float cppn_gauss(float x) {
    return exp(-x * x);
  }
`

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  ${noiseGLSL}
  
  uniform float time;
  uniform float uSpeed;
  uniform float uFlowIntensity;
  uniform float uNoiseScale;
  uniform float uGrainIntensity;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // CPPN layer - combines multiple activation functions
  float cppnPattern(vec2 coord, float t) {
    // Multiple CPPN nodes with different activation functions
    float n1 = cppn_sin(coord.x * 2.0 + t);
    float n2 = cppn_tanh(coord.y * 3.0 - t * 0.5);
    float n3 = cppn_gauss(length(coord - vec2(sin(t * 0.3), cos(t * 0.2))));
    
    // Combine with circular pattern
    float dist = length(coord);
    float n4 = cppn_sin(dist * 5.0 - t);
    
    // Layer combination
    float pattern = n1 * 0.3 + n2 * 0.3 + n3 * 0.2 + n4 * 0.2;
    
    return pattern;
  }
  
  // Create flowing lava pattern
  vec3 lavaFlow(vec2 uv, float t) {
    // Distort UV coordinates for liquid effect
    vec2 flowUV = uv;
    flowUV.x += fbm(uv * 2.0 + vec2(t * 0.1, 0.0)) * uFlowIntensity * 0.1;
    flowUV.y += fbm(uv * 2.0 + vec2(0.0, t * 0.15)) * uFlowIntensity * 0.1;
    
    // CPPN pattern
    float pattern1 = cppnPattern(flowUV * uNoiseScale, t * uSpeed);
    float pattern2 = cppnPattern(flowUV * uNoiseScale * 1.5 + vec2(100.0), t * uSpeed * 0.8);
    
    // Layer noise for organic lava texture
    float noiseLayer1 = fbm(flowUV * 3.0 + vec2(t * 0.05, t * 0.08));
    float noiseLayer2 = fbm(flowUV * 6.0 - vec2(t * 0.03, t * 0.06));
    
    // Combine patterns
    float combined = pattern1 * 0.4 + pattern2 * 0.3 + noiseLayer1 * 0.2 + noiseLayer2 * 0.1;
    
    // Create lava hotspots
    float hotspot = smoothstep(0.3, 0.7, combined);
    float glow = smoothstep(0.5, 0.9, combined);
    
    // Dark lava color palette
    vec3 darkLava = vec3(0.05, 0.01, 0.0);      // Almost black
    vec3 coolingLava = vec3(0.15, 0.05, 0.02);  // Very dark red
    vec3 warmLava = vec3(0.4, 0.08, 0.0);       // Dark orange-red
    vec3 hotLava = vec3(0.8, 0.2, 0.05);        // Bright orange
    vec3 glowLava = vec3(1.0, 0.5, 0.1);        // Yellow-orange glow
    
    // Multi-stage color mixing for depth
    vec3 color = mix(darkLava, coolingLava, smoothstep(0.0, 0.3, combined));
    color = mix(color, warmLava, smoothstep(0.3, 0.5, combined));
    color = mix(color, hotLava, hotspot);
    color = mix(color, glowLava, glow * 0.5);
    
    return color;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Center coordinates for CPPN
    vec2 centeredUV = (uv - 0.5) * 2.0;
    
    // Get lava color
    vec3 lavaColor = lavaFlow(centeredUV, time);
    
    // Add film grain for texture
    float grain = hash(gl_FragCoord.xy + fract(time)) * 2.0 - 1.0;
    lavaColor += grain * uGrainIntensity * 0.02;
    
    // Vignette effect to darken edges
    float vignette = 1.0 - length(centeredUV) * 0.3;
    lavaColor *= vignette;
    
    gl_FragColor = vec4(lavaColor, 1.0);
  }
`

function Scene({
  speed = 1.0,
  flowIntensity = 1.0,
  noiseScale = 2.0,
  grainIntensity = 0.5,
}: CPPNLavaProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          uSpeed: { value: speed },
          uFlowIntensity: { value: flowIntensity },
          uNoiseScale: { value: noiseScale },
          uGrainIntensity: { value: grainIntensity },
        },
        vertexShader,
        fragmentShader,
      }),
    [speed, flowIntensity, noiseScale, grainIntensity]
  )

  useFrame((state, delta) => {
    if (meshRef.current) {
      material.uniforms.time.value += delta * speed
    }
  })

  return (
    <mesh
      ref={meshRef}
      material={material}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default function CPPNLava(props: CPPNLavaProps) {
  return (
    <div className="inset-0 -z-10 h-full w-full">
      <Canvas
        dpr={[1, 2]}
        frameloop="always"
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
      >
        <Scene {...props} />
      </Canvas>
    </div>
  )
}
