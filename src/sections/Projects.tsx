import { useState } from 'react'
import { ExternalLink, Github, Maximize2, Plus } from 'lucide-react'
import { SectionLabel } from '../components/SectionLabel'
import { ProjectModal } from '../components/ProjectModal'
import { filters, profile, projects } from '../data/portfolio'
import type { Category, Project } from '../data/portfolio'
import { useTilt } from '../hooks/useTilt'

function FeaturedProject({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  const tilt = useTilt(2)
  return <article className={`featured-project featured-${index}`} data-reveal {...tilt}>
    <button className="project-visual" onClick={() => onOpen(project)} aria-label={`View ${project.name} project details`} data-cursor="View">
      <div className="project-browser"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>{new URL(project.live).host}</span><span className="preview-kind">{project.previewStatus ?? 'LIVE WEBSITE'}</span></div>
      <img src={project.image} alt={`Screenshot of the actual ${project.name} website`} width="1280" height="800" loading="lazy" decoding="async" />
      <span className="project-open"><Maximize2 size={18} /></span>
      <span className="image-spotlight" aria-hidden="true" />
    </button>
    <div className="project-info"><div className="project-title"><span className="project-index">0{index + 1}</span><h3>{project.id.startsWith('royal-voltage') ? 'Royal Voltage' : project.name}</h3><a href={project.live} aria-label={`Visit ${project.name} ${project.previewStatus ? 'preview' : 'website'}`} target="_blank" rel="noopener noreferrer"><ExternalLink size={19} /></a></div><p>{project.id === 'royal-solar' ? 'Solar engineering, brought into a new dimension.' : project.id === 'fikra' ? 'A clear digital home for business ideas.' : 'A professional presence for real-world engineering.'}</p><div className="project-tags">{project.stack.filter(t => t !== 'Client Project').slice(0,3).map((tag) => <span key={tag}>{tag}</span>)}</div></div>
  </article>
}

export function Projects() {
  const [filter, setFilter] = useState<Category>('All projects')
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState<Project | null>(null)
  const filtered = projects.filter(p => filter === 'All projects' || p.category === filter)
  const visible = expanded || filter !== 'All projects' ? filtered : filtered.slice(0, 6)
  return <section id="projects" className="projects section page-width">
    <SectionLabel number="03">SELECTED WORK</SectionLabel>
    <div className="section-heading" data-reveal><h2>Ideas, made real<span className="accent-dot">.</span></h2><p>A few things I've built.<br />Explore the interface. Look under the hood.</p></div>
    <div className="featured-grid">{projects.filter(p => p.featured).map((p, i) => <FeaturedProject key={p.id} project={p} index={i} onOpen={setActive} />)}</div>
    <div className="archive" data-reveal>
      <div className="archive-heading"><h3>The project index<span>{projects.length.toString().padStart(2, '0')}</span></h3><p>Client websites. Experiments. Applications.</p></div>
      <div className="project-filters" role="group" aria-label="Filter projects">{filters.map(f => <button key={f} className={filter === f ? 'selected' : ''} aria-pressed={filter === f} onClick={() => { setFilter(f); setExpanded(false) }}>{f}</button>)}</div>
      <p className="sr-only" role="status">Showing {visible.length} of {filtered.length} projects.</p>
      <div className="archive-list">{visible.map((p) => <article className="archive-row" key={p.id}>
        <span className="archive-number">{(projects.indexOf(p) + 1).toString().padStart(2, '0')}</span>
        <button className="archive-thumb" onClick={() => setActive(p)} aria-label={`Open ${p.name} details`} data-cursor="View"><img src={p.image} alt={`${p.name} preview`} width="160" height="105" loading="lazy" decoding="async" /></button>
        <div className="archive-text"><button onClick={() => setActive(p)}>{p.name}</button><span>{p.category} <i /> {p.stack.slice(0, 3).join(' · ')}</span></div>
        <div className="archive-links">{p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.name}: ${p.github === profile.github ? 'GitHub profile' : 'source code'}`}><Github size={17} /></a>}<a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.name}: live demo`}><ExternalLink size={17} /></a></div>
      </article>)}</div>
      {filter === 'All projects' && <button className="archive-expand" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}><Plus size={17} className={expanded ? 'is-expanded' : ''} />{expanded ? 'Show selected projects' : `Explore all ${projects.length} projects`}</button>}
    </div>
    <ProjectModal project={active} onClose={() => setActive(null)} />
  </section>
}
