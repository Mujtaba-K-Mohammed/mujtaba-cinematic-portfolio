import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, Copy, Github, Linkedin, Mail, MessageCircle, Send } from 'lucide-react'
import { SectionLabel } from '../components/SectionLabel'
import { profile } from '../data/portfolio'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const [status, setStatus] = useState('')
  const [draft, setDraft] = useState('')
  const [draftUri, setDraftUri] = useState('')
  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setCopyStatus('Copied to clipboard.'); window.setTimeout(() => setCopied(false), 2500) }
    catch { setCopyStatus('Copy is unavailable here. Select and copy the email address shown above.') }
  }
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (name.length < 2 || message.length < 10) { setStatus('Please enter your name and at least 10 characters about your project.'); return }
    const body = `Hi Mujtaba,\n\n${message}\n\nFrom: ${name}\nReply to: ${email}`
    setDraft(body)
    setDraftUri(`mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${encodeURIComponent(body)}`)
    setStatus('Draft ready. Open your email app to send, or copy the message below.')
  }
  return <section className="contact section page-width" id="contact">
    <SectionLabel number="05">THE NEXT CHAPTER</SectionLabel>
    <div className="contact-layout">
      <div className="contact-intro" data-reveal><p className="contact-kicker">HAVE SOMETHING IN MIND?</p><h2>Let's make<br /><span>it real.</span></h2><p>Open to full-stack roles, freelance builds<br className="desktop-break" /> and good conversations about the web.</p><div className="email-line"><a href={`mailto:${profile.email}`}>{profile.email}</a><button onClick={() => copy(profile.email)} aria-label="Copy email address">{copied ? <Check size={17} /> : <Copy size={17} />}</button></div><p className="copy-status" role="status">{copyStatus}</p><div className="contact-socials"><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={18} />GitHub</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} />LinkedIn</a><a href={profile.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />WhatsApp</a></div></div>
      <form className="contact-form" onSubmit={submit} data-reveal><div className="form-heading"><Mail size={20} /><span>A project, a role, an idea.</span></div><div className="field-row"><div className="field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="What should I call you?" minLength={2} maxLength={100} required /></div><div className="field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></div></div><div className="field"><label htmlFor="contact-message">Tell me a little about it</label><textarea id="contact-message" name="message" rows={4} placeholder="What are we building?" minLength={10} maxLength={3000} required /></div><button type="submit" className="button button-primary"><Send size={16} />Prepare email</button><p className="form-note">Creates a message draft. You send it from your email app.</p><p className="form-status" role="status">{status}</p>{draft && <div className="draft-preview"><p>{draft}</p><div className="draft-actions"><a className="inline-link" href={draftUri}><Mail size={15} />Open email app</a><button type="button" className="inline-link" onClick={() => copy(draft)}><Copy size={15} />Copy message draft</button></div></div>}</form>
    </div>
  </section>
}
