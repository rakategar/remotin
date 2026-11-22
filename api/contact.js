// Vercel serverless function: POST /api/contact → email ke contact@remot.in.
// Pengiriman:
//   1. Resend (disarankan) bila env RESEND_API_KEY ada. Domain remot.in harus diverifikasi di Resend,
//      pengirim diatur lewat CONTACT_FROM (default "remot.in <noreply@remot.in>").
//   2. Tanpa RESEND_API_KEY: diteruskan lewat FormSubmit (formsubmit.co). Kiriman pertama memicu
//      email aktivasi ke contact@remot.in yang harus diklik sekali.

const TO = process.env.CONTACT_TO || 'contact@remot.in'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const clip = (v, n) => String(v ?? '').trim().slice(0, n)

export function validate(body) {
  const data = {
    name: clip(body.name, 120),
    email: clip(body.email, 160),
    company: clip(body.company, 120),
    topic: clip(body.topic, 60) || 'Other',
    message: clip(body.message, 5000),
  }
  if (data.name.length < 2 || !EMAIL_RE.test(data.email) || data.message.length < 10) return null
  return data
}

async function viaResend(d, subject, text) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'remot.in <noreply@remot.in>',
      to: [TO],
      reply_to: d.email,
      subject,
      text,
    }),
  })
  if (!r.ok) throw new Error(`resend ${r.status}: ${await r.text()}`)
}

async function viaFormSubmit(d, subject) {
  const r = await fetch(`https://formsubmit.co/ajax/${TO}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: 'https://remot.in',
      Referer: 'https://remot.in/contact',
    },
    body: JSON.stringify({
      _subject: subject,
      _replyto: d.email,
      _template: 'table',
      _captcha: 'false',
      name: d.name,
      email: d.email,
      company: d.company || '-',
      topic: d.topic,
      message: d.message,
    }),
  })
  const j = await r.json().catch(() => ({}))
  if (!r.ok || String(j.success) !== 'true') throw new Error(`formsubmit ${r.status}: ${JSON.stringify(j)}`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }
  let body = req.body || {}
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}')
    } catch {
      return res.status(400).json({ ok: false, error: 'bad_json' })
    }
  }
  // honeypot filled → pretend success, send nothing
  if (body.website) return res.status(200).json({ ok: true })

  const d = validate(body)
  if (!d) return res.status(400).json({ ok: false, error: 'invalid' })

  const subject = `[remot.in] ${d.topic} · ${d.name}`
  const text = [
    `Nama: ${d.name}`,
    `Email: ${d.email}`,
    `Perusahaan: ${d.company || '-'}`,
    `Topik: ${d.topic}`,
    '',
    d.message,
    '',
    '— dikirim dari form remot.in/contact',
  ].join('\n')

  if (process.env.CONTACT_DRY_RUN === '1') {
    console.log('[contact:dry-run]', subject)
    return res.status(200).json({ ok: true, dryRun: true })
  }

  try {
    if (process.env.RESEND_API_KEY) await viaResend(d, subject, text)
    else await viaFormSubmit(d, subject)
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('[contact]', e)
    return res.status(502).json({ ok: false, error: 'send_failed' })
  }
}
