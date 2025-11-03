'use client'

import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

type CPPNGradientProps = {
  speed?: number
  noiseScale?: number
  grainIntensity?: number
}

// Noise functions for fluid motion
const noiseGLSL = `
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  
  // Smooth noise for fluid gradients
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f); // Smoothstep
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  // Fractional Brownian Motion for organic flow
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 3; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    
    return value;
  }
`

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Fluid gradient shader with smooth color merging and matte finish
const fragmentShader = `
  ${noiseGLSL}
  
  uniform float time;
  uniform float uSpeed;
  uniform float uNoiseScale;
  uniform float uGrainIntensity;
  
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float t = time * uSpeed * 0.1;

    // Create fluid motion using FBM
    vec2 flowOffset = vec2(
      fbm(uv * uNoiseScale + vec2(t * 0.3, t * 0.2)),
      fbm(uv * uNoiseScale + vec2(t * 0.2, -t * 0.3))
    );
    
    // Apply flow distortion
    vec2 distorted = uv + flowOffset * 0.15;
    
    // Multiple noise layers for color mixing
    float n1 = fbm(distorted * 2.0 + t * 0.5);
    float n2 = fbm(distorted * 1.5 - t * 0.3);
    float n3 = fbm(distorted * 3.0 + vec2(t * 0.4, -t * 0.2));
    float n4 = fbm(distorted * 2.5 + vec2(-t * 0.25, t * 0.35));
    
    // --- New Enhanced Color Palette (9 colors) ---
    vec3 color1 = vec3(0.01, 0.0, 0.02);    // Deep Space Black
    vec3 color2 = vec3(0.05, 0.02, 0.10);    // Midnight Blue
    vec3 color3 = vec3(0.15, 0.05, 0.30);    // Deep Sapphire
    vec3 color4 = vec3(0.30, 0.08, 0.45);    // Royal Purple
    vec3 color5 = vec3(0.60, 0.12, 0.50);    // Vibrant Magenta
    vec3 color6 = vec3(0.85, 0.20, 0.40);    // Electric Rose
    vec3 color7 = vec3(1.00, 0.35, 0.30);    // Bright Coral
    vec3 color8 = vec3(0.98, 0.55, 0.25);    // Warm Orange
    vec3 color9 = vec3(1.00, 0.75, 0.40);    // Fiery Gold

    // Smooth color merging based on position and noise
    float gradientMix = uv.y + n1 * 0.25;
    
    // Multi-layer color blending for smooth transitions
    vec3 color = mix(color1, color2, smoothstep(0.0, 0.18, gradientMix));
    color = mix(color, color3, smoothstep(0.10, 0.28, gradientMix + n2 * 0.1));
    color = mix(color, color4, smoothstep(0.20, 0.38, gradientMix + n3 * 0.1));
    color = mix(color, color5, smoothstep(0.30, 0.48, gradientMix + n4 * 0.1));
    color = mix(color, color6, smoothstep(0.40, 0.58, gradientMix + n1 * 0.12));
    color = mix(color, color7, smoothstep(0.50, 0.68, gradientMix + n2 * 0.12));
    color = mix(color, color8, smoothstep(0.60, 0.78, gradientMix + n3 * 0.12));
    color = mix(color, color9, smoothstep(0.70, 0.90, gradientMix + n4 * 0.15));

    float finalMask = smoothstep(0.7, 0.4, vUv.y); 

    vec3 finalColor = color * finalMask;
    float grain = hash(gl_FragCoord.xy + fract(time)) * 2.0 - 1.0;
    finalColor += (grain * 0.5 ) * uGrainIntensity * 0.04;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

// Create shader material using Drei's shaderMaterial
const GradientMaterial = shaderMaterial(
  {
    time: 0,
    uSpeed: 1.0,
    uNoiseScale: 1.2,
    uGrainIntensity: 0.5,
  },
  vertexShader,
  fragmentShader
)

extend({ GradientMaterial })

// TypeScript declaration for custom material
declare module '@react-three/fiber' {
  interface ThreeElements {
    gradientMaterial: any
  }
}

function Scene({
  speed = 3,
  noiseScale = 1.2,
  grainIntensity = 0.5,
}: CPPNGradientProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)

  useFrame((state, delta) => {
    if (materialRef.current) {
      // Smooth animation
      materialRef.current.time += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <gradientMaterial
        ref={materialRef}
        uSpeed={speed}
        uNoiseScale={noiseScale}
        uGrainIntensity={grainIntensity}
      />
    </mesh>
  )
}

export default function CPPNGradient(props: CPPNGradientProps) {
  const camera = useMemo(
    () => ({
      position: [0, 0, 5] as [number, number, number],
      fov: 45,
      near: 0.1,
      far: 100,
    }),
    []
  )

  return (
    <div className="h-full w-full">
      <Canvas
        camera={camera}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <Scene {...props} />
        <color attach="background" args={['#000000']} />
      </Canvas>
    </div>
  )
}
