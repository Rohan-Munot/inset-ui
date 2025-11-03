// components/FractalShader.js
'use client' // Mark as a client component

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ShaderMaterial, Vector2 } from 'three'

// This is a simple shader that just passes the vertex position
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

// This is your shader, TRANSLATED for standard WebGL
const fragmentShader = `
  // We need to declare our varying and uniforms
  varying vec2 vUv;
  uniform vec3 u_resolution;
  uniform float u_time;

  // The rest is your shader, with Shadertoy variables replaced
  void main() {
      vec4 O = vec4(0.0);
      vec2 I = gl_FragCoord.xy; // Replaces 'I'

      float i = 0.0;
      float d = 0.0;
      float s;

      vec3 p;
      vec3 r = u_resolution; // Replaces 'r' and 'iResolution'
      float iTime = u_time; // Replaces 'iTime'

      mat2 R = mat2(cos(iTime/2.+vec4(0,33,11,0)));

      for(O*=i; i++<1e2; O+=max(1.3*sin(vec4(1,2,3,1)+i*.3)/s,-length(p*p)))

          p = vec3((I+I - r.xy)/r.y*d*R, d-8.), p.xz*=R,
          d+=s=.012+.07*abs(max(sin(length(fract(p)*p)),length(p)-4.)-i/1e2);  

      O=tanh(O*O/8e5);

      gl_FragColor = O; // Replaces 'O'
  }
`

// This component sets up the shader material and passes uniforms
function ShaderPlane() {
  const materialRef = useRef<ShaderMaterial>(null)

  // We use useMemo to create the uniform object once
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_resolution: {
        value: new Vector2(window.innerWidth, window.innerHeight),
      },
    }),
    []
  )

  // useFrame runs on every frame, updating the time uniform
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime()
    }
  })

  // We render a simple plane mesh that fills the screen
  // and apply our custom shader material to it
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

// This is the main exportable component
export default function FractalShader() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
