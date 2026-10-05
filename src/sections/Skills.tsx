import { useState } from 'react'
import { Atom, Braces, Box, Code2, Database, GitBranch, Layers, Terminal, ShoppingBag } from 'lucide-react'
import { SectionLabel } from '../components/SectionLabel'
import { skillGroups } from '../data/portfolio'
import { useTilt } from '../hooks/useTilt'
import { useMedia } from '../hooks/useMedia'

function Tool({ name }: { name: string }) {
  const tilt = useTilt(6)
  const Icon = /React|Three|Drei/.test(name) ? Atom : /MySQL|phpMyAdmin/.test(name) ? Database : /Git/.test(name) ? GitBranch : /Shop|Commerce|WordPress/.test(name) ? ShoppingBag : /PHP|Laravel|API/.test(name) ? Braces : /GSAP|Lenis|GLSL/.test(name) ? Box : Code2
  return <div className="tool-card" {...tilt}><Icon size={20} strokeWidth={1.4} /><span>{name}</span></div>
}
export function Skills() {
  const [selected, setSelected] = useState(0)
  const horizontal = useMedia('(max-width: 849px)')
  const group = skillGroups[selected]
  return <section className="skills section" id="skills">
    <div className="page-width">
      <SectionLabel number="02">THE TOOLKIT</SectionLabel>
      <div className="section-heading" data-reveal><h2>Different tools.<br /><span className="muted-heading">One connected system.</span></h2><p>From the first pixel to the final request.<br />The stack behind the experience.</p></div>
      <div className="skills-system" data-reveal>
        <div className="skill-selector" role="tablist" aria-label="Technology groups" aria-orientation={horizontal ? 'horizontal' : 'vertical'}>{skillGroups.map((item, index) => <button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={selected === index} aria-controls={`panel-${item.id}`} tabIndex={selected === index ? 0 : -1} className={selected === index ? 'selected' : ''} onClick={() => setSelected(index)} onKeyDown={(event) => {
          if (['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(event.key)) {
            event.preventDefault()
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? skillGroups.length - 1 : (selected + (['ArrowDown','ArrowRight'].includes(event.key) ? 1 : -1) + skillGroups.length) % skillGroups.length
            setSelected(next); document.getElementById(`tab-${skillGroups[next].id}`)?.focus()
          }
        }}><span className="skill-number">0{index + 1}</span><span>{item.label}</span><span className="selection-mark" /></button>)}</div>
        <div className="skill-panel" id={`panel-${group.id}`} role="tabpanel" aria-labelledby={`tab-${group.id}`} tabIndex={0} key={group.id}>
          <div className="terminal-bar"><div aria-hidden="true"><i /><i /><i /></div><span><Terminal size={13} />stack/{group.code}.ts</span><Layers size={15} /></div>
          <div className="skill-panel-content"><p className="code-label"><span>export</span> const {group.code} = {'{'}</p><h3>{group.subtitle}</h3><p>{group.detail}</p><div className="tools-grid">{group.tools.map((tool) => <Tool key={tool} name={tool} />)}</div><p className="code-close">{'}'}<span>;</span></p></div>
        </div>
      </div>
      <div className="creative-strip" data-reveal><span><Atom size={18} />BUILT INTO THIS PORTFOLIO</span><p>Three.js <i /> React Three Fiber <i /> GSAP <i /> Lenis <i /> GLSL</p></div>
    </div>
  </section>
}
