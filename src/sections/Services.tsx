import { Code2, Gauge, Layers, ShoppingBag } from 'lucide-react'
import { SectionLabel } from '../components/SectionLabel'
import { services } from '../data/portfolio'
const icons = { layers: Layers, code: Code2, store: ShoppingBag, gauge: Gauge }
export function Services() {
  return <section id="services" className="services section">
    <div className="page-width"><SectionLabel number="04">HOW I CAN HELP</SectionLabel><div className="services-layout">
      <div className="services-intro" data-reveal><h2>Good ideas deserve<br /><span className="muted-heading">good execution.</span></h2><p>A complete build or the missing piece.<br />Let's find the right approach for your project.</p><a className="button button-secondary" href="#contact">Start a conversation</a></div>
      <div className="service-list">{services.map((service) => { const Icon = icons[service.icon]; return <article className="service-row" key={service.number} data-reveal><span className="service-number">{service.number}</span><div><Icon size={23} strokeWidth={1.35} /><h3>{service.title}</h3><p>{service.description}</p></div></article> })}</div>
    </div></div>
  </section>
}
