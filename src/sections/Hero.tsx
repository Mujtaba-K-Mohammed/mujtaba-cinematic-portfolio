import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Braces, ChevronDown, Grid2X2, Mail, MousePointer2 } from 'lucide-react'
import { profile } from '../data/portfolio'
import { asset } from '../utils/assets'
import { useMedia, useVisibility } from '../hooks/useMedia'
import { usePortraitFallback } from '../hooks/usePortraitFallback'
import { SceneBoundary } from '../components/SceneBoundary'
import type { PointerPosition } from '../three/HeroScene'

const HeroScene = lazy(() => import('../three/HeroScene'))
export function Hero({ reduced, onImageReady }: { reduced: boolean; onImageReady: () => void }) {
  const hero = useRef<HTMLElement>(null)
  const image = useRef<HTMLImageElement>(null)
  const pointer = useRef<PointerPosition>({ x: 0, y: 0 })
  const desktop = useMedia('(min-width: 850px) and (pointer: fine)')
  const documentVisible = useVisibility()
  const [inView, setInView] = useState(true)
  const [canRender, setCanRender] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const portraitFallback = usePortraitFallback(pointer, desktop && !reduced && !sceneReady && inView && documentVisible)
  const onSceneReady = useCallback(() => setSceneReady(true), [])
  const fallback = useCallback(() => { setSceneReady(false); setCanRender(false) }, [])
  useEffect(() => {
    if (image.current?.complete) onImageReady()
  }, [onImageReady])
  useEffect(() => {
    const qaParams = import.meta.env.DEV ? new URLSearchParams(window.location.search) : null
    const forceTest = Boolean(qaParams?.has('qa-force-webgl'))
    if ((!desktop && !forceTest) || reduced || qaParams?.has('qa-no-webgl')) { setCanRender(false); setSceneReady(false); return }
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2')
    const lowEnd = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency < 4
    const dataSaving = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData)
    setCanRender(Boolean(gl) && ((!lowEnd && !dataSaving) || forceTest))
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .01 })
    if (hero.current) observer.observe(hero.current)
    return () => observer.disconnect()
  }, [desktop, reduced])
  return <section id="home" className="hero" ref={hero} onPointerMove={(event) => {
    if (event.pointerType !== 'mouse' || reduced || !hero.current) return
    const rect = hero.current.getBoundingClientRect()
    pointer.current.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - .5) * 2))
    pointer.current.y = Math.max(-1, Math.min(1, -((event.clientY - rect.top) / rect.height - .5) * 2))
    portraitFallback.wake.current()
  }} onPointerLeave={() => { pointer.current.x = 0; pointer.current.y = 0; portraitFallback.wake.current() }}>
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-topline" aria-hidden="true"><span>PORTFOLIO / {new Date().getFullYear()}</span><span>INTERFACE. SYSTEM. EXPERIENCE.</span></div>
    <div className="hero-content page-width">
      <div className="hero-copy">
        <p className="hero-eyebrow"><span className="tiny-bracket">&lt;/&gt;</span> ENGINEERING MEETS IMAGINATION</p>
        <h1><span>Mujtaba</span><span className="name-accent">Khalid<span className="name-period">.</span></span></h1>
        <p className="hero-role">Software Engineer <span>&</span><br className="mobile-break" /> Full-Stack Developer</p>
        <p className="hero-description">{profile.intro}</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects"><Grid2X2 size={17} />View my work</a><a className="button button-text" href="#contact"><Mail size={17} />Let's talk</a></div>
        <div className="hero-techline"><span>REACT</span><i /><span>LARAVEL</span><i /><span>CREATIVE DEVELOPMENT</span></div>
      </div>
      <div className={`hero-art ${sceneReady ? 'scene-ready' : ''}`}>
        <div className="fallback-orbit orbit-one" aria-hidden="true" /><div className="fallback-orbit orbit-two" aria-hidden="true" />
        <div ref={portraitFallback.element} className="portrait-fallback"><div className="portrait-depth"><img ref={image} src={asset('assets/character/mujtaba-anime.webp')} width="1024" height="1536" alt="Semi-realistic anime portrait of Mujtaba Khalid in a dark engineer outfit" fetchPriority="high" onLoad={onImageReady} onError={onImageReady} /><div className="portrait-eyes" aria-hidden="true"><img src={asset('assets/character/mujtaba-anime.webp')} width="1024" height="1536" alt="" /></div></div></div>
        {canRender && <div className="canvas-layer" aria-hidden="true"><SceneBoundary onFallback={fallback}><Suspense fallback={null}><HeroScene pointer={pointer} active={inView && documentVisible} onReady={onSceneReady} onFailure={fallback} /></Suspense></SceneBoundary></div>}
        <div className="code-chip chip-one" aria-hidden="true"><Braces size={15} /><span>const idea <b>=</b> await build();</span></div>
        <div className="code-chip chip-two" aria-hidden="true"><span className="chip-react">⟨ ⟩</span><span>thoughtful by design.</span></div>
        <div className="portrait-caption"><span className="caption-line" /> CODE MEETS CHARACTER</div>
        <p className="pointer-invitation" aria-hidden="true"><MousePointer2 size={12} /> A little curiosity goes a long way.</p>
      </div>
    </div>
    <div className="hero-bottom page-width"><a className="scroll-indicator" href="#about"><span className="scroll-capsule"><ChevronDown size={13} /></span>SCROLL TO EXPLORE</a><span className="hero-availability">Open to roles & collaborations</span><span className="hero-edition" aria-hidden="true">01 — THE INTRODUCTION</span></div>
  </section>
}
