import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { LINKS, type Copy } from '../content'
import { useLang } from '../lib/i18n'
import { external, href } from '../lib/route'
import { media, partnerLogos } from '../media'
import { reducedMotion, useInView } from '../lib/motion'
import { ChatDemo, PlayDemo } from './Demos'
import { Arrow, ArrowUR, Chat, Cloud, Instagram, Joy, Mail } from './Icons'
import { Logo, Mark } from './Logo'
import { VoxelMorph } from './VoxelMorph'

const d = (ms: number) => ({ ['--d' as string]: `${ms}ms` }) as CSSProperties

export function Hero() {
  const { hero } = useLang().c
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <h1 className="h1 rv">
            <span>{hero.titleA}</span>
            <span>{hero.titleB}</span>
          </h1>
          <p className="lead rv" style={d(80)}>
            {hero.sub}
          </p>
          <div className="btns rv" style={d(160)}>
            <a className="btn btn-primary" href="#produk">
              {hero.primary} <Arrow />
            </a>
            <a className="btn btn-outline" href={LINKS.contact}>
              {hero.secondary}
            </a>
          </div>
        </div>
        <VoxelMorph />
      </div>
      <Partners />
    </section>
  )
}

function Partners() {
  const { partners } = useLang().c
  const group = (
    <div className="marquee-group">
      {[...partnerLogos, ...partnerLogos].map((l, i) => (
        <img key={i} src={l.src} alt={l.name} height={30} loading="lazy" />
      ))}
    </div>
  )
  return (
    <div className="wrap partners rv" id="partner">
      <p className="small">{partners.label}</p>
      <div className="marquee">
        <div className="marquee-track">
          {group}
          <div aria-hidden>{group}</div>
        </div>
      </div>
    </div>
  )
}

export function Pillars() {
  const { pillars } = useLang().c
  const icon = { chat: <Chat size={40} />, joy: <Joy size={40} />, cloud: <Cloud /> }
  return (
    <section className="sec" id="bidang">
      <div className="wrap">
        <div className="eco-head">
          <div>
            <p className="eyebrow rv">{pillars.eyebrow}</p>
            <h2 className="h2 rv" style={d(80)}>
              {pillars.title}
            </h2>
          </div>
          <p className="body rv" style={d(160)}>
            {pillars.sub}
          </p>
        </div>
        <div className="features">
          {pillars.items.map((f, i) => (
            <div key={f.name} className="fcard rv" style={d(i * 80)}>
              <div className="fc-top">
                <div className="tile">{icon[f.icon]}</div>
                <span className="fc-num">0{i + 1}</span>
              </div>
              <div className="bottom">
                <span className="small">{f.product}</span>
                <h3 className="h3">{f.name}</h3>
                <p className="body">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Ecosystem() {
  const { ecosystem, ctaBand } = useLang().c
  return (
    <section className="sec" id="produk">
      <div className="wrap">
        <div className="eco-head">
          <div>
            <p className="eyebrow rv">{ecosystem.eyebrow}</p>
            <h2 className="h2 rv" style={d(80)}>
              {ecosystem.title}
            </h2>
          </div>
          <p className="body rv" style={d(160)}>
            {ecosystem.sub}
          </p>
        </div>
        <div className="eco">
          {ecosystem.cards.map((c, i) => (
            <a key={c.key} className="eco-card rv media-rv" style={d(i * 120)} href={c.href} target="_blank" rel="noopener" aria-label={`${c.cta}: ${c.domain}`}>
              <div className={`eco-media ${c.key === 'wanychat' ? 'mesh-blue' : 'mesh-green'}`}>
                <span className="mesh-blob" style={{ background: c.key === 'wanychat' ? '#a9bdfb' : '#a8cf8e', left: '-10%', top: '-10%' }} />
                {c.key === 'wanychat' ? <ChatDemo compact /> : <PlayDemo showLog={false} />}
              </div>
              <div className="eco-body">
                <div className="eco-top">
                  <span className="chip">
                    <i className={c.soon ? 'live soon' : 'live'} /> {c.domain}
                    {c.soon && <em className="soon-tag">{ecosystem.soon}</em>}
                  </span>
                  <span className="small">{c.name}</span>
                </div>
                <h3 className="h3">{c.title}</h3>
                <p className="body">{c.body}</p>
                <div className="eco-foot">
                  <span className="link">
                    {c.cta} <span className="arr">→</span>
                  </span>
                  <span className="eco-go">
                    <ArrowUR />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="band rv">
          <span className="band-rings" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <h2>{ctaBand.title}</h2>
          <a className="btn btn-inverse btn-sm" href={LINKS.contact}>
            <Mail /> {ctaBand.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

export function Products() {
  const { centerHeading, wanychat, play } = useLang().c
  return (
    <>
      <section className="sec">
        <div className="wrap center-head">
          <h2 className="h2 rv">{centerHeading.title}</h2>
          <p className="body rv" style={d(80)}>
            {centerHeading.sub}
          </p>
        </div>
      </section>

      <section className="sec" aria-label="Wanychat">
        <div className="wrap split">
          <div className="mcard mesh-blue rv media-rv">
            <span className="mesh-blob" style={{ background: '#b4c6ff', left: '-5%', top: '-5%' }} />
            <ChatDemo />
            <div className="stamp">
              <Mark size={22} animated={false} /> {wanychat.stamp}
            </div>
          </div>
          <div className="text">
            <div className="pillrow rv">
              <span className="mpill">{wanychat.pill}</span>
              <span className="ver">{wanychat.version}</span>
            </div>
            <h2 className="h2 rv" style={d(80)}>
              {wanychat.title}
            </h2>
            <p className="body rv" style={d(120)}>
              {wanychat.body}
            </p>
            <div className="btns rv" style={d(160)}>
              <a className="btn btn-primary" href={LINKS.wanychat} target="_blank" rel="noopener">
                {wanychat.primary} <span className="arr">→</span>
              </a>
              <a className="btn btn-outline" href={LINKS.contact}>
                {wanychat.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" aria-label="Remotin Play">
        <div className="wrap split">
          <div className="text">
            <div className="pillrow rv">
              <span className="mpill">{play.pill}</span>
              <span className="ver">{play.version}</span>
            </div>
            <h2 className="h2 rv" style={d(80)}>
              {play.title}
            </h2>
            <p className="body rv" style={d(120)}>
              {play.body}
            </p>
            <div className="btns rv" style={d(160)}>
              <a className="btn btn-primary" href={LINKS.play} target="_blank" rel="noopener">
                {play.primary} <span className="arr">→</span>
              </a>
              <a className="btn btn-outline" href={LINKS.contact}>
                {play.secondary}
              </a>
            </div>
          </div>
          <div className="mcard mesh-green rv media-rv">
            <span className="mesh-blob" style={{ background: '#a3cc88', right: '-10%', bottom: '-10%' }} />
            <PlayDemo />
          </div>
        </div>
      </section>
    </>
  )
}

const TAB_MS = 8000

export function HowTabs() {
  const { tabs } = useLang().c
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(!reducedMotion())
  const [ref, inView] = useInView<HTMLElement>()
  const trackRef = useRef<HTMLDivElement>(null)
  const [ind, setInd] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const measure = () => {
      const btn = trackRef.current?.querySelectorAll<HTMLButtonElement>('.tab')[active]
      if (btn) setInd({ left: btn.offsetLeft, width: btn.offsetWidth })
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  useEffect(() => {
    if (!auto || !inView) return
    const id = setTimeout(() => setActive((a) => (a + 1) % tabs.items.length), TAB_MS)
    return () => clearTimeout(id)
  }, [active, auto, inView])

  const pick = (i: number) => {
    setAuto(false)
    setActive(i)
  }
  const onKey = (e: KeyboardEvent) => {
    const n = tabs.items.length
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const next = (active + (e.key === 'ArrowRight' ? 1 : n - 1)) % n
      pick(next)
      trackRef.current?.querySelectorAll<HTMLButtonElement>('.tab')[next]?.focus()
    }
  }
  const item = tabs.items[active]

  return (
    <section className="sec" id="cara-kerja" ref={ref}>
      <div className="wrap">
        <div className="tabs-wrap">
          <h2 className="h2 rv" style={{ marginBottom: 32 }}>
            {tabs.title}
          </h2>
          <div className="tabs rv" role="tablist" aria-label={tabs.aria} ref={trackRef} onKeyDown={onKey}>
            <span className="tab-ind" style={{ left: ind.left, width: ind.width }}>
              <b>
                <i key={`${active}-${auto}-${inView}`} className={auto && inView ? 'run' : ''} />
              </b>
            </span>
            {tabs.items.map((t, i) => (
              <button
                key={t.id}
                className="tab"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => pick(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`tcard rv media-rv ${item.product === 'wanychat' ? 'mesh-blue' : 'mesh-green'}`} style={{ transition: 'background .4s, opacity .7s var(--ease), transform .7s var(--ease)' }}>
          {tabs.items.map((t, i) => (
            <div key={t.id} className={`tpanel${i === active ? ' on' : ''}`} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`}>
              <div>
                <span className="chip">
                  <i className={t.product === 'play' ? 'live soon' : 'live'} /> {t.product === 'wanychat' ? 'wanychat.remot.in' : 'play.remot.in'}
                  {t.product === 'play' && <em className="soon-tag">{tabs.soon}</em>}
                </span>
                <p className="h2s">{t.heading}</p>
                <ol className="steps">
                  {t.steps.map((s, k) => (
                    <li key={s} style={{ transitionDelay: `${150 + k * 110}ms` }}>
                      <b>{k + 1}</b>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="tvisual">{i === active && (t.product === 'wanychat' ? <ChatDemo compact /> : <PlayDemo showLog={false} />)}</div>
            </div>
          ))}
          <div className="notch">
            <a className="btn btn-primary btn-sm" href={item.href} {...external(item.href)}>
              {item.cta} <span className="arr">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Thumb({ kind }: { kind: Copy['notes']['items'][number]['thumb'] }) {
  const { notes } = useLang().c
  if (kind === 'brand')
    return (
      <div className="thumb th-brand">
        <span className="logo" style={{ pointerEvents: 'none' }}>
          <Mark size={52} />
          <span className="word" style={{ fontSize: 30 }}>
            remot<i>.in</i>
          </span>
        </span>
      </div>
    )
  if (kind === 'wanychat')
    return (
      <div className="thumb th-wany">
        <img src={media.wanychatLogo} alt="" loading="lazy" />
      </div>
    )
  if (kind === 'grid')
    return (
      <div className="thumb th-grid">
        <span>AI reply</span>
      </div>
    )
  if (kind === 'car')
    return (
      <div className="thumb th-car">
        <img src={media.keitruck} alt="" loading="lazy" />
      </div>
    )
  return (
    <div className="thumb th-tags">
      {notes.tags.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  )
}

export function Notes() {
  const { notes } = useLang().c
  const railRef = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const update = () => {
    const r = railRef.current
    if (!r) return
    setEdge({ start: r.scrollLeft < 8, end: r.scrollLeft + r.clientWidth > r.scrollWidth - 8 })
  }
  const go = (dir: number) => railRef.current?.scrollBy({ left: dir * 334, behavior: 'smooth' })
  return (
    <section className="sec" id="kabar">
      <div className="wrap">
        <div className="notes-head">
          <div>
            <h2 className="h2 rv">{notes.title}</h2>
            <p className="body rv" style={d(80)}>
              {notes.sub}
            </p>
          </div>
          <div className="notes-ctrl rv" style={d(120)}>
            <button className="circ" aria-label={notes.prev} disabled={edge.start} onClick={() => go(-1)}>
              <span style={{ transform: 'scaleX(-1)', display: 'grid' }}>
                <Arrow />
              </span>
            </button>
            <button className="circ" aria-label={notes.next} disabled={edge.end} onClick={() => go(1)}>
              <Arrow />
            </button>
            <a className="btn btn-primary btn-sm" href={LINKS.contact}>
              {notes.all}
            </a>
          </div>
        </div>
        <div className="rail" ref={railRef} onScroll={update}>
          {notes.items.map((n, i) => {
            return (
              <a key={n.href + i} className="note rv" style={d(i * 80)} href={href(n.href)} {...external(n.href)}>
                <Thumb kind={n.thumb} />
                <span className="small">{n.tag}</span>
                <h3>{n.title}</h3>
                <p className="body">{n.body}</p>
                <span className="link">
                  {notes.more} <span className="arr">→</span>
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const { footer } = useLang().c
  const bigRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      const el = bigRef.current
      if (el) {
        // 0 when the wordmark enters the viewport, 1 once the page is scrolled to its very bottom
        const r = el.getBoundingClientRect()
        const ih = window.innerHeight
        const maxScroll = document.documentElement.scrollHeight - ih
        const enter = r.top + window.scrollY - ih
        const span = Math.max(1, maxScroll - enter)
        const v = Math.min(1, Math.max(0, ((window.scrollY - enter) / span) * 1.08))
        el.style.setProperty('--fill', `${(v * 100).toFixed(1)}%`)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="f-top">
          <div>
            <Logo light />
            <p className="body">{footer.tagline}</p>
          </div>
          {footer.columns.map((c) => (
            <div className="f-col" key={c.title}>
              <h4>{c.title}</h4>
              {c.links.map((l) => (
                <a key={l.href} href={href(l.href)} {...external(l.href)}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
          <div className="f-col">
            <h4>{footer.contactTitle}</h4>
            <a href={LINKS.contact}>{footer.contactForm}</a>
            <a className="mail" href={LINKS.contact}>
              {LINKS.email}
            </a>
            <a className="f-ig" href={LINKS.instagram} target="_blank" rel="noopener" aria-label={`Instagram ${LINKS.instagramHandle}`}>
              <span className="f-ig-ic">
                <Instagram size={20} />
              </span>
              {LINKS.instagramHandle}
            </a>
          </div>
        </div>
        <div className="f-big" ref={bigRef} aria-hidden>
          remot.in
        </div>
        <div className="f-bot">
          <span>
            © 2026 {footer.legal}
          </span>
          <span>wanychat.remot.in · play.remot.in</span>
        </div>
      </div>
    </footer>
  )
}
