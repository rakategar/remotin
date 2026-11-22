import { useState, type FormEvent } from 'react'
import { LINKS } from '../content'
import { useLang } from '../lib/i18n'
import { Arrow, Check, Instagram, Mail } from './Icons'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'invalid'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function ContactPage() {
  const { contact: t } = useLang().c
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', topic: 0, message: '', website: '' })
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: k === 'topic' ? Number(e.target.value) : e.target.value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.name.trim().length < 2 || !EMAIL_RE.test(form.email.trim()) || form.message.trim().length < 10) {
      setStatus('invalid')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // topic is sent in English so the inbox stays consistent whatever language the visitor picked
        body: JSON.stringify({ ...form, topic: ['Wanychat', 'Remotin Play', 'Partnership', 'Cloud infrastructure', 'Other'][form.topic] }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || res.statusText)
      setStatus('sent')
      setForm({ name: '', email: '', company: '', topic: 0, message: '', website: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="sec contact" id="top">
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <p className="eyebrow rv">{t.eyebrow}</p>
          <h1 className="h2 rv">{t.title}</h1>
          <p className="body rv">{t.sub}</p>
          <div className="contact-ways rv">
            <a href={`mailto:${LINKS.email}`} className="way">
              <span className="way-ic">
                <Mail />
              </span>
              <span>
                <small>{t.emailLabel}</small>
                {LINKS.email}
              </span>
            </a>
            <a href={LINKS.instagram} target="_blank" rel="noopener" className="way">
              <span className="way-ic">
                <Instagram />
              </span>
              <span>
                <small>{t.igLabel}</small>
                {LINKS.instagramHandle}
              </span>
            </a>
          </div>
        </div>

        <div className="contact-card rv media-rv">
          {status === 'sent' ? (
            <div className="sent" role="status">
              <span className="sent-ic">
                <Check />
              </span>
              <h2 className="h3">{t.sentTitle}</h2>
              <p className="body">{t.sentBody}</p>
              <div className="btns">
                <button className="btn btn-outline btn-sm" onClick={() => setStatus('idle')}>
                  {t.again}
                </button>
                <a className="btn btn-primary btn-sm" href="/">
                  {t.back} <Arrow />
                </a>
              </div>
            </div>
          ) : (
            <form className="cform" onSubmit={submit} noValidate>
              <div className="row2">
                <label>
                  <span>{t.name}</span>
                  <input required autoComplete="name" value={form.name} onChange={set('name')} placeholder={t.namePh} maxLength={120} />
                </label>
                <label>
                  <span>{t.email}</span>
                  <input required type="email" autoComplete="email" value={form.email} onChange={set('email')} placeholder={t.emailPh} maxLength={160} />
                </label>
              </div>
              <div className="row2">
                <label>
                  <span>{t.company}</span>
                  <input autoComplete="organization" value={form.company} onChange={set('company')} placeholder={t.companyPh} maxLength={120} />
                </label>
                <label>
                  <span>{t.topic}</span>
                  <select value={form.topic} onChange={set('topic')}>
                    {t.topics.map((o, i) => (
                      <option key={o} value={i}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span>{t.message}</span>
                <textarea required rows={6} value={form.message} onChange={set('message')} placeholder={t.messagePh} maxLength={5000} />
              </label>
              {/* honeypot: hidden from people, bots fill it in */}
              <input className="hp" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} aria-hidden name="website" />
              {(status === 'error' || status === 'invalid') && (
                <p className="form-err" role="alert">
                  {status === 'error' ? t.error : t.invalid}
                </p>
              )}
              <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t.sending : t.submit} {status !== 'sending' && <Arrow />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
