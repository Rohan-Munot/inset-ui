'use client'

import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

type GlitchBandsProps = {
  speed?: number
  glitchIntensity?: number
  bandCount?: number
  colorShift?: number
}

const noiseGLSL = `
  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }
  
  float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  
  float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), f);
  }
  
  float noise2d(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash2(i);
    float b = hash2(i + vec2(1.0, 0.0));
    float c = hash2(i + vec2(0.0, 1.0));
    float d = hash2(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
`

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  ${noiseGLSL}
  
  uniform float time;
  uniform float uSpeed;
  uniform float uGlitchIntensity;
  uniform float uBandCount;
  uniform float uColorShift;
  
  varying vec2 vUv;
  
  // Generate glitch offset for horizontal bands
  float getGlitchOffset(float y, float t) {
    float band = floor(y * uBandCount);
    float bandNoise = hash(band + floor(t * 2.0));
    
    // Create occasional glitch spikes
    float glitchTrigger = step(0.85, bandNoise);
    float offset = (hash(band * 7.13 + t * 3.7) - 0.5) * glitchTrigger;
    
    return offset * uGlitchIntensity;
  }
  
  // RGB split effect for more glitchiness
  vec3 rgbSplit(vec2 uv, float offset) {
    float r = step(0.5, noise2d(uv * 10.0 + vec2(time * 0.3, 0.0)) + offset);
    float g = step(0.5, noise2d(uv * 10.0 + vec2(time * 0.3 + 0.1, 0.0)));
    float b = step(0.5, noise2d(uv * 10.0 + vec2(time * 0.3 + 0.2, 0.0)) - offset);
    
    return vec3(r, g, b);
  }
  
  // Vibrant gradient with glitch colors
  vec3 getGlitchColor(vec2 uv, float t) {
    // Horizontal position (with glitch offset)
    float glitchOffset = getGlitchOffset(uv.y, t);
    vec2 distortedUV = vec2(uv.x + glitchOffset, uv.y);
    
    // Create horizontal bands with different intensities
    float band = floor(distortedUV.y * uBandCount);
    float bandRandom = hash(band + floor(t * 0.5));
    
    // Base gradient colors - darker purple, pink, orange, muted white
    vec3 color1 = vec3(0.3, 0.0, 0.6);  // Darker Purple
    vec3 color2 = vec3(0.6, 0.0, 0.5);  // Darker Magenta/Pink
    vec3 color3 = vec3(0.6, 0.25, 0.1); // Darker Orange
    vec3 color4 = vec3(0.7, 0.65, 0.6); // Muted Cream
    
    // Mix colors based on position and noise
    float mixFactor = fract(distortedUV.x + distortedUV.y * 2.0 + t * uSpeed * 0.1);
    mixFactor = smoothstep(0.0, 1.0, mixFactor);
    
    vec3 gradientA = mix(color1, color2, mixFactor);
    vec3 gradientB = mix(color3, color4, mixFactor);
    
    // Vertical gradient with noise
    float verticalMix = uv.y + noise(uv.y * 5.0 + t * 0.2) * 0.3;
    vec3 baseColor = mix(gradientA, gradientB, verticalMix);
    
    // Add bright spots
    float brightSpot = smoothstep(0.7, 1.0, noise2d(distortedUV * 3.0 + vec2(t * 0.15, 0.0)));
    baseColor = mix(baseColor, color4, brightSpot * 0.7);
    
    // RGB split on some bands for extra glitchiness
    if (bandRandom > 0.7) {
      vec3 split = rgbSplit(distortedUV, glitchOffset);
      baseColor = mix(baseColor, split, 0.3);
    }
    
    // Add color shift/aberration
    float aberration = sin(distortedUV.x * 10.0 + t) * 0.5 + 0.5;
    baseColor.r += aberration * uColorShift * 0.2;
    baseColor.b -= aberration * uColorShift * 0.1;
    
    return baseColor;
  }
  
  // Scan line effect
  float scanLine(vec2 uv, float t) {
    float line = sin(uv.y * uBandCount * 6.28318 + t * 2.0) * 0.5 + 0.5;
    return line * 0.1 + 0.9;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Get glitched color
    vec3 color = getGlitchColor(uv, time);
    
    // Apply scan lines
    float scan = scanLine(uv, time);
    color *= scan;
    
    // Add horizontal band edges
    float bandEdge = fract(uv.y * uBandCount);
    float edgeLine = smoothstep(0.95, 1.0, bandEdge) + smoothstep(0.05, 0.0, bandEdge);
    color = mix(color, color * 0.5, edgeLine * 0.3);
    
    // Occasional full-screen glitch flash
    float flashNoise = hash(floor(time * 4.0));
    float flash = step(0.97, flashNoise);
    color += flash * 0.3;
    
    // Boost saturation and contrast
    color = pow(color, vec3(0.9));
    color *= 1.2;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

function Scene({
  speed = 1.0,
  glitchIntensity = 0.3,
  bandCount = 12.0,
  colorShift = 1.0,
}: GlitchBandsProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          uSpeed: { value: speed },
          uGlitchIntensity: { value: glitchIntensity },
          uBandCount: { value: bandCount },
          uColorShift: { value: colorShift },
        },
        vertexShader,
        fragmentShader,
      }),
    [speed, glitchIntensity, bandCount, colorShift]
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

export default function GlitchBands(props: GlitchBandsProps) {
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
