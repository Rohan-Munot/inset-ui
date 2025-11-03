'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type ReactThreeFiber,
} from '@react-three/fiber'
import { OrthographicCamera, shaderMaterial } from '@react-three/drei'

type ColorScheme = {
  background: string
  lines: string
  accent: string
}

type InteractiveGridProps = {
  cellSize?: number
  lineThickness?: number
  highlightStrength?: number
  pointerFollowSpeed?: number
  lightScheme?: Partial<ColorScheme>
  darkScheme?: Partial<ColorScheme>
  className?: string
}

const defaultLightScheme: ColorScheme = {
  background: '#fafafa',
  lines: '#e4e4e7',
  accent: '#8b5cf6',
}

const defaultDarkScheme: ColorScheme = {
  background: '#10002b',
  lines: '#3c096c',
  accent: '#c084fc',
}

const InteractiveGridMaterialImpl = shaderMaterial(
  {
    time: 0,
    uResolution: new THREE.Vector2(1, 1),
    uPointer: new THREE.Vector2(-1000, -1000),
    uCellSize: 80,
    uLineThickness: 1.2,
    uBackgroundColor: new THREE.Color(defaultLightScheme.background),
    uLineColor: new THREE.Color(defaultLightScheme.lines),
    uAccentColor: new THREE.Color(defaultLightScheme.accent),
    uHighlightStrength: 0.75,
    uAnimationStrength: 1,
    uNoiseAmount: 0.04,
  },
  /* glsl */ `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    precision highp float;

    // --- Uniforms (same as before) ---
    uniform float time;
    uniform vec2 uResolution;
    uniform vec2 uPointer;
    uniform float uCellSize;
    uniform float uLineThickness;
    uniform vec3 uBackgroundColor;
    uniform vec3 uLineColor;
    uniform vec3 uAccentColor;
    uniform float uHighlightStrength;
    uniform float uAnimationStrength;
    uniform float uNoiseAmount;

    varying vec2 vUv;

    // --- Helper Functions (same as before) ---
    float random(in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float computeGrid(vec2 coord, float cellSize, float thickness) {
      vec2 grid = fract(coord / cellSize);
      float distX = min(grid.x, 1.0 - grid.x);
      float distY = min(grid.y, 1.0 - grid.y);
      float lineX = smoothstep(thickness * 1.5, thickness * 0.1, distX);
      float lineY = smoothstep(thickness * 1.5, thickness * 0.1, distY);
      return max(lineX, lineY);
    }

    // --- Main render loop ---
    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      float cellSize = max(uCellSize, 8.0);
      float thickness = clamp(uLineThickness, 0.25, cellSize * 0.5) / cellSize;

      // --- Base Grid (with subtle scroll) ---
      vec2 scroll = vec2(sin(time * 0.1), cos(time * 0.08)) * 2.0 * uAnimationStrength;
      vec2 animatedCoord = fragCoord + scroll;
      float gridPattern = computeGrid(animatedCoord, cellSize, thickness);
      
      
      // --- 1. GLOBAL (DEFAULT) ANIMATION ---
      
      // Get cell coordinate for per-cell noise
      vec2 fragCell = floor(fragCoord / cellSize);
      
      // Create a slow, pulsing, per-cell noise value
      float globalNoise = noise(fragCell * 0.1 + time * 0.2 * uAnimationStrength);
      float globalPulse = sin(time * 0.4 * uAnimationStrength) * 0.5 + 0.5; // Slower pulse
      
      // We'll use this to animate the base color. 
      // 0.2 is the strength, so it's subtle.
      float globalAnimationMix = globalNoise * globalPulse * 0.2;
      
      // Animate the background color. Mix it slightly towards the line color.
      vec3 animatedBG = mix(uBackgroundColor, uLineColor, globalAnimationMix);
      
      // Re-calculate baseColor with the new animated background
      vec3 animatedBaseColor = mix(animatedBG, uLineColor, gridPattern);


      // --- 2. LOCAL (HOVER) ANIMATION ---

      // Find the cell coordinate for the pointer
      vec2 pointerCell = floor(uPointer / cellSize);

      // Calculate distance in cells
      vec2 cellDelta = abs(pointerCell - fragCell);
      float cellDistance = max(cellDelta.x, cellDelta.y); // Chebyshev distance

      // Create a *different* fluid noise for the hover edge
      float hoverNoise = noise(fragCell * 0.15 - time * 0.25 * uAnimationStrength);
      float falloffRadius = 4.0; // Effect radius in cells
      float noisyRadius = falloffRadius * (0.7 + hoverNoise * 0.6);

      // Calculate the effect strength
      float pointerActive = step(0.0, uPointer.x + 0.5);
      float effectStrength = 1.0 - smoothstep(0.0, noisyRadius, cellDistance);
      
      // Add a pulse to the hover effect
      float hoverPulse = sin(time * 1.5 * uAnimationStrength) * 0.15 + 0.85;
      
      // Final strength of the hover accent
      float accentMix = effectStrength * pointerActive * hoverPulse * uHighlightStrength;
      

      // --- 3. COMBINE ---
      
      // Mix the animated base color with the accent color on hover
      vec3 finalColor = mix(animatedBaseColor, uAccentColor, accentMix);
      
      // (Optional) Make grid lines pop in the accent zone
      finalColor = mix(finalColor, uAccentColor * 1.2, gridPattern * accentMix * 0.5);


      // --- Grain & Vignette (same as before) ---
      float grain = (noise(fragCoord * 0.5) - 0.5) * uNoiseAmount;
      finalColor += grain;

      vec2 norm = fragCoord / uResolution;
      float vignette = smoothstep(0.0, 1.2, distance(norm, vec2(0.5)));
      finalColor = mix(finalColor, finalColor * 0.96, vignette * 0.08);

      gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
    }
  `
)

extend({ InteractiveGridMaterialImpl })

declare module '@react-three/fiber' {
  interface ThreeElements {
    interactiveGridMaterialImpl: any
  }
}

const OFFSCREEN_COORD = new THREE.Vector2(-1000, -1000)

const usePrefersDarkMode = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const update = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsDark(event.matches)
    }

    update(mediaQuery)

    const listener = (event: MediaQueryListEvent) => update(event)
    mediaQuery.addEventListener('change', listener)

    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return isDark
}

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = (event: MediaQueryListEvent | MediaQueryList) => {
      setReduced(event.matches)
    }

    update(mediaQuery)

    const listener = (event: MediaQueryListEvent) => update(event)
    mediaQuery.addEventListener('change', listener)

    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return reduced
}

type GridSceneProps = {
  cellSize: number
  lineThickness: number
  highlightStrength: number
  animationStrength: number
  pointerFollowSpeed: number
  pointerTarget: React.MutableRefObject<THREE.Vector2>
  pointerState: React.MutableRefObject<THREE.Vector2>
  resolution: React.MutableRefObject<THREE.Vector2>
  scheme: ColorScheme
}

const GridScene = ({
  cellSize,
  lineThickness,
  highlightStrength,
  animationStrength,
  pointerFollowSpeed,
  pointerTarget,
  pointerState,
  resolution,
  scheme,
}: GridSceneProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport, size } = useThree()

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, 1, 1), [])
  const backgroundColor = useMemo(
    () => new THREE.Color(scheme.background),
    [scheme.background]
  )
  const lineColor = useMemo(() => new THREE.Color(scheme.lines), [scheme.lines])
  const accentColor = useMemo(
    () => new THREE.Color(scheme.accent),
    [scheme.accent]
  )

  useEffect(() => {
    resolution.current.set(size.width, size.height)
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.copy(resolution.current)
    }
  }, [size.height, size.width, resolution])

  useFrame((_, delta) => {
    const mat = materialRef.current
    if (!mat) return

    const pointer = pointerState.current
    pointer.lerp(
      pointerTarget.current,
      1 - Math.exp(-pointerFollowSpeed * delta)
    )
    mat.uniforms.uPointer.value.copy(pointer)

    mat.uniforms.time.value +=
      delta * (0.9 + pointerFollowSpeed * 0.05) * animationStrength
  })

  return (
    <mesh geometry={geometry} scale={[viewport.width, viewport.height, 1]}>
      <interactiveGridMaterialImpl
        ref={materialRef}
        uCellSize={cellSize}
        uLineThickness={lineThickness}
        uHighlightStrength={highlightStrength}
        uAnimationStrength={animationStrength}
        uBackgroundColor={backgroundColor}
        uLineColor={lineColor}
        uAccentColor={accentColor}
        uResolution={resolution.current}
      />
    </mesh>
  )
}

export default function InteractiveGrid({
  cellSize = 60,
  lineThickness = 1,
  highlightStrength = 0.9,
  pointerFollowSpeed = 8,
  lightScheme,
  darkScheme,
  className = 'h-full w-full pointer-events-none',
}: InteractiveGridProps) {
  const prefersDark = usePrefersDarkMode()
  const reducedMotion = usePrefersReducedMotion()

  const resolvedLight = { ...defaultLightScheme, ...lightScheme }
  const resolvedDark = { ...defaultDarkScheme, ...darkScheme }
  const activeScheme = prefersDark ? resolvedDark : resolvedLight

  const containerRef = useRef<HTMLDivElement>(null)
  const boundsRef = useRef<DOMRect | null>(null)
  const pointerTarget = useRef<THREE.Vector2>(OFFSCREEN_COORD.clone())
  const pointerState = useRef<THREE.Vector2>(OFFSCREEN_COORD.clone())
  const resolution = useRef(new THREE.Vector2(1, 1))

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        boundsRef.current = containerRef.current.getBoundingClientRect()
      }
    }

    updateBounds()

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateBounds)
        : null

    if (resizeObserver && containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener('resize', updateBounds)
    window.addEventListener('scroll', updateBounds, true)

    return () => {
      window.removeEventListener('resize', updateBounds)
      window.removeEventListener('scroll', updateBounds, true)
      resizeObserver?.disconnect()
    }
  }, [])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const bounds = boundsRef.current
      if (!bounds) return

      const { clientX, clientY } = event
      const inside =
        clientX >= bounds.left &&
        clientX <= bounds.right &&
        clientY >= bounds.top &&
        clientY <= bounds.bottom

      if (!inside) {
        pointerTarget.current.copy(OFFSCREEN_COORD)
        return
      }

      const x = clientX - bounds.left
      const y = clientY - bounds.top
      pointerTarget.current.set(x, bounds.height - y)
    }

    const resetPointer = () => {
      pointerTarget.current.copy(OFFSCREEN_COORD)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerMove)
    window.addEventListener('pointerleave', resetPointer)
    window.addEventListener('pointercancel', resetPointer)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerMove)
      window.removeEventListener('pointerleave', resetPointer)
      window.removeEventListener('pointercancel', resetPointer)
    }
  }, [])

  const animationStrength = reducedMotion ? 0.2 : 1

  return (
    <div ref={containerRef} className={className}>
      <Canvas
        dpr={1}
        frameloop="always"
        gl={{ alpha: true, antialias: true }}
        className="h-full w-full"
      >
        <OrthographicCamera makeDefault position={[0, 0, 10]} />
        <GridScene
          cellSize={cellSize}
          lineThickness={lineThickness}
          highlightStrength={highlightStrength}
          animationStrength={animationStrength}
          pointerFollowSpeed={pointerFollowSpeed}
          pointerTarget={pointerTarget}
          pointerState={pointerState}
          resolution={resolution}
          scheme={activeScheme}
        />
      </Canvas>
    </div>
  )
}
