import { useEffect, useRef, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { profile } from '../data/portfolio'

const links = [['home', 'Home'], ['about', 'About'], ['skills', 'Stack'], ['projects', 'Work'], ['services', 'Services'], ['contact', 'Contact']] as const
export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const toggle = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 50)
    scroll()
    window.addEventListener('scroll', scroll, { passive: true })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-15% 0px -65% 0px' })
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => { window.removeEventListener('scroll', scroll); observer.disconnect() }
  }, [])
  useEffect(() => {
    if (!open) return
    const first = panel.current?.querySelector<HTMLAnchorElement>('a')
    first?.focus()
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
      if (event.key === 'Tab') {
        const items = [toggle.current, ...Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[]
        const index = items.indexOf(document.activeElement as HTMLElement)
        if (!event.shiftKey && index === items.length - 1) { event.preventDefault(); items[0].focus() }
        else if (event.shiftKey && index === 0) { event.preventDefault(); items[items.length - 1].focus() }
      }
    }
    document.addEventListener('keydown', key)
    return () => document.removeEventListener('keydown', key)
  }, [open])
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`navigation ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-is-open' : ''}`}>
      <div className="nav-inner">
        <a className="brand" href="#home" aria-label="Mujtaba Khalid, home"><span className="monogram">m<span>k</span><i>.</i></span><span className="brand-caption">MUJTABA<br />KHALID</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map(([id, name]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined}>{name}</a>)}</nav>
        <a className="nav-cv" href={profile.cv} download><Download size={15} /> CV</a>
        <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </header>
    <div className={`mobile-menu ${open ? 'is-open' : ''}`} id="mobile-navigation" ref={panel} inert={!open} data-lenis-prevent>
      <nav aria-label="Mobile navigation">{links.map(([id, name], index) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span>0{index + 1}</span>{name}</a>)}</nav>
      <p>INTERFACE. SYSTEM. EXPERIENCE.</p>
    </div>
    {open && <button className="menu-backdrop" aria-label="Close navigation" onClick={() => setOpen(false)} tabIndex={-1} />}
  </>
}
