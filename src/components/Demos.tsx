import { useEffect, useState } from 'react'
import { play, wanychat } from '../content'
import { media } from '../media'
import { reducedMotion, useInView } from '../lib/motion'

type Line = (typeof wanychat.chat)[number]

/** Looping Instagram comment → auto DM conversation. */
export function ChatDemo({ script = wanychat.chat, compact = false }: { script?: readonly Line[]; compact?: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const [step, setStep] = useState(reducedMotion() ? script.length * 2 : 0)

  useEffect(() => {
    if (!inView || reducedMotion()) return
    // even steps = typing indicator, odd steps = message shown
    const last = script.length * 2
    const delay = step === 0 ? 700 : step >= last ? 3200 : step % 2 === 1 ? 1100 : 900
    const id = setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), delay)
    return () => clearTimeout(id)
  }, [step, inView, script.length])

  const shown = Math.floor(step / 2)
  const typing = step % 2 === 1 && shown < script.length && script[shown].from === 'bot'
  const visible = script.slice(0, step % 2 === 1 && script[shown]?.from === 'user' ? shown + 1 : shown)

  return (
    <div className="phone" ref={ref} style={compact ? { width: 'min(86%, 360px)' } : undefined}>
      <div className="phone-head">
        <img src={media.wanychatLogo} alt="" />
        <div>
          <b>Wanychat</b>
          <span>● aktif membalas</span>
        </div>
      </div>
      <div className="chat">
        {visible.map((m, i) => (
          <div key={`${step > 0 ? 'a' : 'b'}${i}`} className={`msg ${m.from}`}>
            {'label' in m && m.label ? <small>{m.label}</small> : null}
            {m.text}
            {'button' in m && m.button ? <span className="qb">{m.button}</span> : null}
          </div>
        ))}
        {typing && (
          <div className="typing">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
    </div>
  )
}

const KEYS = ['↑', '←', '↓', '→']
const CMD_KEY: Record<string, number> = { '↑': 0, '←': 1, '→': 3, '■': 2 }

/** Live camera frame with HUD, D-pad and a typewriter command log. */
export function PlayDemo({ showLog = true }: { showLog?: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const [ping, setPing] = useState(42)
  const [secs, setSecs] = useState(600)
  const [cmd, setCmd] = useState(0)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (!inView || reducedMotion()) return
    const id = setInterval(() => {
      setPing(34 + Math.round(Math.random() * 22))
      setSecs((s) => (s <= 1 ? 600 : s - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [inView])

  // typewriter: type 60ms/char, hold, delete 30ms/char, next command
  useEffect(() => {
    if (!inView) return
    const full = play.commands[cmd]
    if (reducedMotion()) {
      setTyped(full)
      return
    }
    let i = 0
    let deleting = false
    let id: number
    const tick = () => {
      if (!deleting) {
        i++
        setTyped(full.slice(0, i))
        if (i >= full.length) {
          deleting = true
          id = window.setTimeout(tick, 1400)
          return
        }
        id = window.setTimeout(tick, 60)
      } else {
        i--
        setTyped(full.slice(0, Math.max(0, i)))
        if (i <= 0) {
          setCmd((c) => (c + 1) % play.commands.length)
          return
        }
        id = window.setTimeout(tick, 30)
      }
    }
    id = window.setTimeout(tick, 300)
    return () => clearTimeout(id)
  }, [cmd, inView])

  const arrow = play.commands[cmd].split(' ').pop() || ''
  const pressed = typed.length === play.commands[cmd].length ? CMD_KEY[arrow] : -1
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0 }}>
      <div className="screen">
        <img src={media.keitruck} alt="Suzuki Kei Truck RC skala 1:10" loading="lazy" />
        <div className="hud">
          <div className="hud-row">
            <span className="tag">
              <i className="rec" /> LIVE
            </span>
            <span className="tag">{ping} ms</span>
          </div>
          <div className="hud-row">
            <span className="tag">{play.hud.car}</span>
            <span className="tag">
              {mm}:{ss}
            </span>
          </div>
        </div>
      </div>
      {showLog && (
        <div className="cmdlog">
          <span className="small">⌁ perintah</span>
          <div className="cmd">
            {typed}
            <span className="caret" />
          </div>
        </div>
      )}
      <div className="ctrl" aria-hidden>
        {KEYS.map((k, i) => (
          <span key={k} className={pressed === i ? 'on' : ''}>
            {k}
          </span>
        ))}
      </div>
    </div>
  )
}
