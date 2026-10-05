import { useEffect, useRef } from 'react'
import { ExternalLink, Github, X } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { profile } from '../data/portfolio'
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (project && !element.open) {
      element.showModal()
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { element.close(); document.body.style.overflow = previous }
    }
  }, [project])
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" data-lenis-prevent onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    {project && <div className="dialog-content"><button className="dialog-close" onClick={onClose} aria-label="Close project details" autoFocus><X size={21} /></button>
      {project.image && <img className="dialog-image" src={project.image} alt={`${project.name} live website screenshot`} width="1280" height="800" />}
      <div className="dialog-body"><p className="small-caps">{project.category}{project.previewStatus && ` / ${project.previewStatus}`}</p><h2 id="project-dialog-title">{project.name}</h2><p>{project.description}</p><div className="project-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="dialog-actions">{project.liveAvailable && <a className="button button-primary" href={project.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} />Visit {project.previewStatus ? 'preview' : 'live site'}</a>}{project.github && <a className="button button-secondary" href={project.github} target="_blank" rel="noopener noreferrer"><Github size={17} />{project.github === profile.github ? 'GitHub profile' : 'Source code'}</a>}</div></div>
    </div>}
  </dialog>
}
