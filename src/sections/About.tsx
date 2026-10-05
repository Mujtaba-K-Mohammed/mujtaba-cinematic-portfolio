import { Download, Braces, Database, LayoutTemplate } from 'lucide-react'
import { SectionLabel } from '../components/SectionLabel'
import { profile } from '../data/portfolio'
export function About() {
  return <section className="about section page-width" id="about">
    <SectionLabel number="01">THE DEVELOPER</SectionLabel>
    <div className="about-layout">
      <div><h2 className="story-headline" data-reveal><span className="story-word">Beyond</span> <span className="story-word">the</span><br /><span className="story-word">interface</span><span className="accent-dot">.</span></h2><p className="story-footnote" data-reveal>THOUGHTFUL ON THE SURFACE.<br />PURPOSEFUL UNDERNEATH.</p></div>
      <div className="about-copy" data-reveal><p className="about-lead">One idea. Every layer.</p><p>{profile.about}</p><p>{profile.also}</p><a className="inline-link" href={profile.cv} download><Download size={16} />Download my CV</a></div>
    </div>
    <div className="stack-path" data-reveal>
      <div className="stack-stop"><LayoutTemplate size={23} /><div><span>01 / INTERFACE</span><strong>Make it feel right.</strong><p>React · TypeScript · Responsive UI</p></div></div>
      <div className="path-connector" aria-hidden="true"><span /></div>
      <div className="stack-stop"><Braces size={23} /><div><span>02 / APPLICATION</span><strong>Make it work.</strong><p>PHP · Laravel · API Integration</p></div></div>
      <div className="path-connector" aria-hidden="true"><span /></div>
      <div className="stack-stop"><Database size={23} /><div><span>03 / DATA</span><strong>Give it structure.</strong><p>MySQL · Relational Data</p></div></div>
    </div>
  </section>
}
