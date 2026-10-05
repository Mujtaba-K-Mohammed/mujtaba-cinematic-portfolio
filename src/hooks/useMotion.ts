import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
gsap.registerPlugin(ScrollTrigger)

export const motionState = { heroProgress: 0 }

/** One clock: Lenis feeds ScrollTrigger and is advanced by GSAP's ticker. */
export function useMotion(reduced: boolean) {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (reduced) return
    const scrolling = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: true })
    lenis.current = scrolling
    scrolling.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => scrolling.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    const visibility = () => document.hidden ? scrolling.stop() : scrolling.start()
    document.addEventListener('visibilitychange', visibility)
    const desktop = gsap.matchMedia()
    const context = gsap.context(() => {
      gsap.from('.hero-copy > *', { y: 25, opacity: 0, duration: 1, stagger: .085, ease: 'power3.out', delay: .08 })
      gsap.to('.hero-copy', { y: -50, opacity: .78, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 12%', scrub: .7 } })
      ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top', onUpdate: (self) => { motionState.heroProgress = self.progress } })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, { y: 32, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 93%', once: true } })
      })
      desktop.add('(min-width: 1000px)', () => {
        gsap.to('.stack-path', { '--path-progress': '100%', ease: 'none', scrollTrigger: { trigger: '.about', start: 'top 55%', end: 'bottom 60%', scrub: .5 } })
        gsap.from('.story-word', { color: '#353d55', stagger: .14, scrollTrigger: { trigger: '.story-headline', start: 'top 78%', end: 'bottom 42%', scrub: .5 } })
      })
    })
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    const resize = new ResizeObserver(() => ScrollTrigger.refresh())
    const main = document.querySelector('main')
    if (main) resize.observe(main)
    return () => {
      resize.disconnect()
      desktop.revert()
      context.revert()
      gsap.ticker.remove(tick)
      document.removeEventListener('visibilitychange', visibility)
      scrolling.destroy()
      lenis.current = null
      motionState.heroProgress = 0
    }
  }, [reduced])
  return lenis
}
