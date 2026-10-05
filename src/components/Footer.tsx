import { Github, Linkedin } from 'lucide-react'
import { profile } from '../data/portfolio'
export function Footer() {
  return <footer className="footer page-width"><div><a href="#home" className="footer-name">Mujtaba Khalid<span>.</span></a><p>Software Engineer & Full-Stack Developer</p></div><p className="copyright">© {new Date().getFullYear()} Mujtaba Khalid</p><div className="footer-links"><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="#home" className="back-top">Back to top</a></div></footer>
}
