import { useCallback, useEffect, useState } from 'react'
import { Navigation } from './components/Navigation'
import { Loader } from './components/Loader'
import { PointerHalo } from './components/PointerHalo'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Services } from './sections/Services'
import { Contact } from './sections/Contact'
import { useMedia } from './hooks/useMedia'
import { useMotion } from './hooks/useMotion'

export default function App() {
  const preferredReduced = useMedia('(prefers-reduced-motion: reduce)')
  const reduced = preferredReduced || (import.meta.env.DEV && new URLSearchParams(window.location.search).has('qa-reduced'))
  const finePointer = useMedia('(pointer: fine)')
  const [imageReady, setImageReady] = useState(false)
  const [fontsReady, setFontsReady] = useState(false)
  const onImageReady = useCallback(() => setImageReady(true), [])
  useMotion(reduced)
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reduced)
    return () => { delete document.documentElement.dataset.reducedMotion }
  }, [reduced])
  useEffect(() => { document.fonts.ready.then(() => setFontsReady(true)) }, [])
  return <><Navigation /><Loader progress={(imageReady ? 70 : 0) + (fontsReady ? 30 : 0)} /><main id="main"><Hero reduced={reduced} onImageReady={onImageReady} /><About /><Skills /><Projects /><Services /><Contact /></main><Footer /><PointerHalo enabled={finePointer && !reduced} /></>
}
