import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'
import type { PointerPosition } from '../three/HeroScene'

/** Demand-driven texture-layer gaze when a GPU scene is unavailable. */
export function usePortraitFallback(pointer: MutableRefObject<PointerPosition>, enabled: boolean) {
  const element = useRef<HTMLDivElement>(null)
  const wake = useRef<() => void>(() => undefined)
  useEffect(() => {
    const portrait = element.current
    if (!enabled || !portrait) return
    let frame = 0
    let previous = 0
    let x = 0
    let y = 0
    const animate = (time: number) => {
      const delta = previous ? Math.min((time - previous) / 1000, .05) : 1 / 60
      previous = time
      const blend = 1 - Math.exp(-delta * 7)
      x += (pointer.current.x - x) * blend
      y += (pointer.current.y - y) * blend
      portrait.style.setProperty('--gaze-x', `${x * 3.5}px`)
      portrait.style.setProperty('--gaze-y', `${-y * 1.8}px`)
      portrait.style.setProperty('--face-x', `${x * 2.5}px`)
      portrait.style.setProperty('--face-y', `${-y * 1.4}px`)
      portrait.style.setProperty('--face-r', `${x * .45}deg`)
      if (Math.abs(pointer.current.x - x) + Math.abs(pointer.current.y - y) > .001) frame = requestAnimationFrame(animate)
      else frame = 0
    }
    wake.current = () => {
      if (!frame) { previous = 0; frame = requestAnimationFrame(animate) }
    }
    return () => {
      cancelAnimationFrame(frame)
      wake.current = () => undefined
      for (const name of ['--gaze-x', '--gaze-y', '--face-x', '--face-y', '--face-r']) portrait.style.removeProperty(name)
    }
  }, [enabled, pointer])
  return { element, wake }
}
