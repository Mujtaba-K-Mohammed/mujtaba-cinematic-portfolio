import type { PointerEvent, CSSProperties } from 'react'
/** CSS variables avoid React renders on pointer movement. Never active on touch. */
export function useTilt(amount = 3) {
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = event.currentTarget
    const box = el.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width
    const y = (event.clientY - box.top) / box.height
    el.style.setProperty('--rx', `${(.5 - y) * amount}deg`)
    el.style.setProperty('--ry', `${(x - .5) * amount}deg`)
    el.style.setProperty('--px', `${x * 100}%`)
    el.style.setProperty('--py', `${y * 100}%`)
  }
  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--rx', '0deg')
    event.currentTarget.style.setProperty('--ry', '0deg')
  }
  return { onPointerMove, onPointerLeave, style: { '--rx': '0deg', '--ry': '0deg', '--px': '50%', '--py': '50%' } as CSSProperties }
}
