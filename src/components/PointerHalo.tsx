import { useEffect, useRef } from 'react'
import gsap from 'gsap'
export function PointerHalo({ enabled }: { enabled: boolean }) {
  const halo = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!enabled || !halo.current) return
    const el = halo.current
    const xTo = gsap.quickTo(el, 'x', { duration: .22, ease: 'power2.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: .22, ease: 'power2.out' })
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      xTo(event.clientX); yTo(event.clientY)
      el.style.opacity = '1'
      const target = event.target as HTMLElement
      const view = target.closest<HTMLElement>('[data-cursor]')
      el.dataset.label = view?.dataset.cursor ?? ''
      el.classList.toggle('is-link', Boolean(target.closest('a, button')))
      el.classList.toggle('is-view', Boolean(view))
    }
    const leave = () => { el.style.opacity = '0' }
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); gsap.killTweensOf(el) }
  }, [enabled])
  return enabled ? <div className="pointer-halo" ref={halo} aria-hidden="true" /> : null
}
