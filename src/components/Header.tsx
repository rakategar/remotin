import { useEffect, useRef, useState } from 'react'
import { LINKS, type Lang } from '../content'
import { useLang } from '../lib/i18n'
import { href } from '../lib/route'
import { Logo } from './Logo'
import { Arrow, Chat, Chevron, Close, Joy, Menu } from './Icons'

export function LangSwitch() {
  const { lang, setLang, c } = useLang()
  const langs: Lang[] = ['en', 'id']
  return (
    <div className="lang" role="group" aria-label={c.langName}>
      <span className="lang-ind" style={{ transform: `translateX(${lang === 'en' ? 0 : 100}%)` }} />
      {langs.map((l) => (
        <button key={l} aria-pressed={lang === l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { c } = useLang()
  const { announcement, nav } = c
  const [open, setOpen] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const ddRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    const onDown = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setSheet(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = sheet ? 'hidden' : ''
  }, [sheet])

  return (
    <>
      <div className="topstack">
        <a className="announce" href={announcement.href} target="_blank" rel="noopener">
          <span className="dot" />
          <span className="txt">{announcement.text}</span>
          <b className="cta-t">{announcement.cta} →</b>
        </a>
        <header className={`header${scrolled ? ' scrolled' : ''}`}>
          <div className="wrap">
            <Logo />
            <nav className="nav" aria-label={nav.aria}>
              <div className="dd" ref={ddRef}>
                <button className="navlink" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)}>
                  {nav.productsLabel} <Chevron />
                </button>
                <div className={`dd-panel${open ? ' open' : ''}`} role="menu">
                  {nav.products.map((p) => (
                    <a key={p.title} className="dd-item" href={p.href} target="_blank" rel="noopener" role="menuitem" tabIndex={open ? 0 : -1}>
                      <span className="ic">{p.icon === 'chat' ? <Chat /> : <Joy />}</span>
                      <span>
                        <b>{p.title}</b>
                        <span>{p.sub}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              {nav.links.map((l) => (
                <a key={l.href} className="navlink" href={href(l.href)}>
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="h-right">
              <LangSwitch />
              <a className="btn btn-primary btn-sm cta" href={LINKS.contact}>
                {nav.contact}
              </a>
              <button className="hamb" aria-label={nav.openMenu} onClick={() => setSheet(true)}>
                <Menu />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className={`sheet${sheet ? ' open' : ''}`} aria-hidden={!sheet}>
        <div className="sheet-top">
          <Logo />
          <button className="hamb" aria-label={nav.closeMenu} onClick={() => setSheet(false)}>
            <Close />
          </button>
        </div>
        <nav onClick={() => setSheet(false)}>
          {nav.products.map((p) => (
            <a key={p.title} href={p.href} target="_blank" rel="noopener" tabIndex={sheet ? 0 : -1}>
              {p.title}
              <span className="sub">{p.sub}</span>
            </a>
          ))}
          {nav.links.map((l) => (
            <a key={l.href} href={href(l.href)} tabIndex={sheet ? 0 : -1}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-primary" href={LINKS.contact} tabIndex={sheet ? 0 : -1}>
          {nav.contact} <Arrow />
        </a>
      </div>
    </>
  )
}
