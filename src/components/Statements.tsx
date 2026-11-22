import { useRef } from 'react'
import { statements } from '../content'
import { reducedMotion, useScrollProgress } from '../lib/motion'
import { MARK_PATHS, MARK_PIXELS } from './Logo'

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const A = 190 // iso half-width
const B = 110 // iso half-height
const T = 14 // plate thickness
const CX = 300
const CY = 230

// map unit square (u,v) onto the iso top face of a plate centred at cy
const iso = (u: number, v: number, cy: number) => [CX + (u - v) * A, cy - B + (u + v) * B] as const
const poly = (pts: (readonly [number, number])[]) => pts.map((p) => p.join(',')).join(' ')

function Plate({ cy, detail, opacity }: { cy: number; detail: number; opacity: number }) {
  const top = [iso(0, 0, cy), iso(1, 0, cy), iso(1, 1, cy), iso(0, 1, cy)]
  const left = [iso(0, 1, cy), iso(1, 1, cy), [CX, cy + B + T] as const, [CX - A, cy + T] as const]
  const right = [iso(1, 1, cy), iso(1, 0, cy), [CX + A, cy + T] as const, [CX, cy + B + T] as const]
  const rect = (u0: number, v0: number, u1: number, v1: number) => poly([iso(u0, v0, cy), iso(u1, v0, cy), iso(u1, v1, cy), iso(u0, v1, cy)])
  const dash = 1 - detail
  return (
    <g opacity={opacity}>
      <polygon points={poly(left)} fill="#d5e0ff" stroke="var(--blue)" strokeWidth={1.2} />
      <polygon points={poly(right)} fill="#c3d2ff" stroke="var(--blue)" strokeWidth={1.2} />
      <polygon points={poly(top)} fill="#f3f6ff" stroke="var(--blue)" strokeWidth={1.4} />
      <g fill="none" stroke="var(--blue)" strokeWidth={1.1} pathLength={1} strokeDasharray="1" strokeDashoffset={dash} style={{ transition: 'stroke-dashoffset .2s' }}>
        <polygon points={rect(0.3, 0.3, 0.7, 0.7)} pathLength={1} />
        <polygon points={rect(0.35, 0.35, 0.65, 0.65)} pathLength={1} />
        {[0.08, 0.16].map((u) => (
          <polygon key={u} points={rect(u, 0.12, u + 0.05, 0.42)} pathLength={1} />
        ))}
        {[0.78, 0.86].map((u) => (
          <polygon key={u} points={rect(u, 0.55, u + 0.06, 0.85)} pathLength={1} />
        ))}
        <polygon points={rect(0.12, 0.62, 0.24, 0.74)} pathLength={1} />
        <polygon points={rect(0.62, 0.1, 0.84, 0.2)} pathLength={1} />
        {Array.from({ length: 8 }, (_, i) => {
          const u = 0.32 + i * 0.05
          return <polygon key={i} points={rect(u, 0.24, u + 0.025, 0.28)} pathLength={1} />
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const v = 0.32 + i * 0.05
          return <polygon key={'r' + i} points={rect(0.72, v, 0.76, v + 0.025)} pathLength={1} />
        })}
      </g>
    </g>
  )
}

function IsoStack({ p }: { p: number }) {
  const detail = clamp(p / 0.3)
  const grow = clamp((p - 0.45) / 0.3)
  const glyph = clamp((p - 0.72) / 0.15)
  const n = 5
  const spread = 34 * grow
  const baseY = CY + (spread * (n - 1)) / 2
  const topY = baseY - spread * (n - 1)
  const s = 0.62 / 82 // mark viewBox width → ~60% of the plate
  return (
    <svg className="iso" viewBox="0 0 600 470" aria-hidden>
      {Array.from({ length: n }, (_, k) => {
        const cy = baseY - k * spread
        const op = k === 0 ? 1 : grow
        return <Plate key={k} cy={cy} detail={k === n - 1 ? detail * (1 - glyph) : k === 0 ? detail : 0.4} opacity={op} />
      })}
      {/* solid brand glyph lying on the top plate */}
      <g
        opacity={glyph}
        transform={`matrix(${A * s} ${B * s} ${-A * s} ${B * s} ${CX} ${topY - B - 22 * (1 - glyph)}) translate(${0.19 / s} ${0.275 / s})`}
      >
        <g fill="none" stroke="var(--blue)" strokeWidth={9}>
          {MARK_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g fill="var(--blue)">
          {MARK_PIXELS.map(([x, y, w], i) => (
            <rect key={i} x={x} y={y} width={w + 1} height={w + 1} />
          ))}
        </g>
      </g>
    </svg>
  )
}

function Words({ text, lp }: { text: string; lp: number }) {
  const words = text.split(' ')
  const n = words.length
  const head = lp * (n + 3)
  return (
    <p className="h2s">
      {words.map((w, i) => {
        const color = head > i + 2 ? 'var(--ink)' : head > i ? 'var(--grey-500)' : 'var(--grey-300)'
        return (
          <span key={i} className="w" style={{ color }}>
            {w}{' '}
          </span>
        )
      })}
    </p>
  )
}

export function Statements() {
  const ref = useRef<HTMLElement>(null)
  const raw = useScrollProgress(ref)
  const p = reducedMotion() ? 1 : raw
  const second = p >= 0.47
  const lpA = reducedMotion() ? 1 : clamp(p / 0.38)
  const lpB = reducedMotion() ? 1 : clamp((p - 0.5) / 0.38)
  return (
    <section className="stmt" ref={ref} aria-label="Visi Remotin">
      <div className="stmt-sticky">
        <div className="wrap stmt-grid">
          <IsoStack p={p} />
          <div>
            <div className="stmt-texts">
              <div className={`stmt-text${second ? ' off' : ''}`}>
                <Words text={statements[0]} lp={lpA} />
              </div>
              <div className={`stmt-text${second ? '' : ' off'}`}>
                <Words text={statements[1]} lp={lpB} />
              </div>
            </div>
            <div className="stmt-progress" aria-hidden>
              <i>
                <b style={{ transform: `scaleX(${lpA})` }} />
              </i>
              <i>
                <b style={{ transform: `scaleX(${lpB})` }} />
              </i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
