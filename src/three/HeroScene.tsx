import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, PerformanceMonitor, useTexture } from '@react-three/drei'
import { AdditiveBlending, Group, MathUtils, NoToneMapping, ShaderMaterial, SRGBColorSpace, Vector2 } from 'three'
import { asset } from '../utils/assets'
import { portraitFragment, portraitVertex } from '../shaders/portrait'
import { atmosphereFragment, atmosphereVertex } from '../shaders/atmosphere'
import { motionState } from '../hooks/useMotion'

export interface PointerPosition { x: number; y: number }
interface SceneProps { pointer: MutableRefObject<PointerPosition>; active: boolean; onReady: () => void; onFailure: () => void }

function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const { gl } = useThree()
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onFailure() }
    gl.domElement.addEventListener('webglcontextlost', lost)
    return () => gl.domElement.removeEventListener('webglcontextlost', lost)
  }, [gl, onFailure])
  return null
}

function Character({ pointer, onReady }: Pick<SceneProps, 'pointer' | 'onReady'>) {
  const loaded = useTexture(asset('assets/character/mujtaba-anime.webp'))
  const { viewport } = useThree()
  const group = useRef<Group>(null)
  const portrait = useMemo(() => {
    const texture = loaded.clone()
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true
    const material = new ShaderMaterial({
      uniforms: { uMap: { value: texture }, uGaze: { value: new Vector2() } },
      vertexShader: portraitVertex, fragmentShader: portraitFragment,
      transparent: true, depthWrite: false, toneMapped: false,
    })
    return { texture, material }
  }, [loaded])
  useEffect(() => {
    onReady()
    return () => {
      portrait.texture.dispose()
      portrait.material.dispose()
      loaded.dispose()
      useTexture.clear(asset('assets/character/mujtaba-anime.webp'))
    }
  }, [portrait, loaded, onReady])
  useFrame((_, delta) => {
    if (!group.current) return
    const smooth = 1 - Math.exp(-delta * 5)
    const x = pointer.current.x
    const y = pointer.current.y
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, x * .055, smooth)
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, -y * .026, smooth)
    group.current.position.x = MathUtils.lerp(group.current.position.x, x * .06, smooth)
    group.current.position.y = MathUtils.lerp(group.current.position.y, -.02 + y * .025 - motionState.heroProgress * .18, smooth)
    const gaze: Vector2 = portrait.material.uniforms.uGaze.value
    gaze.x = MathUtils.lerp(gaze.x, x * .009, smooth)
    gaze.y = MathUtils.lerp(gaze.y, y * .0045, smooth)
  })
  const height = Math.min(viewport.height * .99, viewport.width * 1.42)
  return <group ref={group} position={[0, -.02, .35]}>
    <mesh material={portrait.material} renderOrder={5}>
      <planeGeometry args={[height * (2 / 3), height]} />
    </mesh>
  </group>
}

function Atmosphere({ pointer }: Pick<SceneProps, 'pointer'>) {
  const { viewport, camera } = useThree()
  const orbit = useRef<Group>(null)
  const shader = useMemo(() => new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPointer: { value: new Vector2() } },
    vertexShader: atmosphereVertex, fragmentShader: atmosphereFragment,
    transparent: true, depthWrite: false, blending: AdditiveBlending,
  }), [])
  const points = useMemo(() => {
    const positions = new Float32Array(78 * 3)
    // Deterministic field, stable between React renders.
    for (let i = 0; i < 78; i++) {
      positions[i * 3] = Math.sin(i * 73.71) * 3.3
      positions[i * 3 + 1] = Math.cos(i * 39.19) * 3
      positions[i * 3 + 2] = -1.5 + Math.sin(i * 21.31) * .7
    }
    return positions
  }, [])
  useEffect(() => () => shader.dispose(), [shader])
  useFrame((_, delta) => {
    shader.uniforms.uTime.value += Math.min(delta, .05)
    const point: Vector2 = shader.uniforms.uPointer.value
    point.x = MathUtils.lerp(point.x, pointer.current.x, .035)
    point.y = MathUtils.lerp(point.y, pointer.current.y, .035)
    if (orbit.current) orbit.current.rotation.z += Math.min(delta, .05) * .028
    const ease = 1 - Math.exp(-delta * 2.5)
    camera.position.x = MathUtils.lerp(camera.position.x, pointer.current.x * .035, ease)
    camera.position.y = MathUtils.lerp(camera.position.y, pointer.current.y * .025, ease)
    camera.position.z = MathUtils.lerp(camera.position.z, 7.6 + motionState.heroProgress * .22, ease)
  })
  return <>
    <mesh position={[0, .12, -2]} material={shader}><planeGeometry args={[viewport.width * 1.7, viewport.height * 1.7]} /></mesh>
    <group ref={orbit} position={[0, .5, -1.2]} rotation={[.25, .2, -.25]}>
      <mesh rotation={[.25, .55, 0]}><torusGeometry args={[1.63, .009, 6, 120]} /><meshBasicMaterial color="#4a81cb" transparent opacity={.25} /></mesh>
      <mesh rotation={[-.4, -.65, .5]}><torusGeometry args={[1.98, .004, 6, 128]} /><meshBasicMaterial color="#7d62d1" transparent opacity={.24} /></mesh>
    </group>
    <Float speed={.75} rotationIntensity={.15} floatIntensity={.12}><mesh position={[-1.65, 1.5, -.5]} rotation={[.4, .3, .3]}><octahedronGeometry args={[.17]} /><meshBasicMaterial color="#97c6ec" wireframe transparent opacity={.3} /></mesh></Float>
    <Float speed={.65} rotationIntensity={.25} floatIntensity={.15}><mesh position={[1.7, -.7, -.6]}><icosahedronGeometry args={[.19, 0]} /><meshBasicMaterial color="#9d8fe7" wireframe transparent opacity={.28} /></mesh></Float>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry><pointsMaterial size={.009} color="#9faedf" transparent opacity={.35} sizeAttenuation depthWrite={false} /></points>
  </>
}

export default function HeroScene({ pointer, active, onReady, onFailure }: SceneProps) {
  const [dpr, setDpr] = useState(Math.min(window.devicePixelRatio, 1.5))
  return <Canvas className="hero-canvas" camera={{ position: [0, 0, 7.6], fov: 34 }} dpr={dpr} frameloop={active ? 'always' : 'never'} gl={{ alpha: true, antialias: dpr < 1.25, powerPreference: 'low-power', toneMapping: NoToneMapping }} onCreated={({ gl }) => gl.setClearColor('#060912', 0)}>
    <ContextGuard onFailure={onFailure} />
    <PerformanceMonitor ms={300} iterations={6} onDecline={({ fps }) => { if (dpr > 1) setDpr(1); else if (fps < 24) onFailure() }} flipflops={2} onFallback={onFailure}>
      <Suspense fallback={null}><Atmosphere pointer={pointer} /><Character pointer={pointer} onReady={onReady} /></Suspense>
    </PerformanceMonitor>
  </Canvas>
}
