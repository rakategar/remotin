import { useEffect, useRef, useState } from 'react'
import { useLang } from '../lib/i18n'
import { reducedMotion } from '../lib/motion'
import { MARK_PATHS, MARK_PIXELS } from './Logo'

const G = 48 // grid resolution
const HOLD = 2800
const MOVE = 1500

type Cell = [number, number]

function rasterize(draw: (c: CanvasRenderingContext2D) => void): Cell[] {
  const cv = document.createElement('canvas')
  cv.width = cv.height = G
  const c = cv.getContext('2d')!
  c.fillStyle = c.strokeStyle = '#000'
  draw(c)
  const d = c.getImageData(0, 0, G, G).data
  const out: Cell[] = []
  for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) if (d[(y * G + x) * 4 + 3] > 110) out.push([x, y])
  return out
}

function shapes(): Cell[][] {
  const cloud = rasterize((c) => {
    c.translate(2.5, 8)
    c.scale(0.52, 0.52)
    c.lineWidth = 7
    MARK_PATHS.forEach((p) => c.stroke(new Path2D(p)))
    MARK_PIXELS.forEach(([x, y, w]) => c.fillRect(x - 0.6, y - 0.6, w + 1.6, w + 1.6))
  })
  const chat = rasterize((c) => {
    c.beginPath()
    c.roundRect(5, 8, 38, 27, 9)
    c.moveTo(11, 33)
    c.lineTo(8, 42)
    c.lineTo(20, 34)
    c.fill()
    c.globalCompositeOperation = 'destination-out'
    ;[15, 24, 33].forEach((x) => {
      c.beginPath()
      c.arc(x, 21.5, 2.8, 0, Math.PI * 2)
      c.fill()
    })
  })
  // Game Boy-style controller pad: pill body with cable, D-pad, A/B and small buttons punched out
  const pad = rasterize((c) => {
    c.lineWidth = 2.2
    c.beginPath()
    c.moveTo(30, 16)
    c.bezierCurveTo(29, 7, 38, 4, 40, 9)
    c.stroke()
    c.fillRect(37.5, 8, 6, 4.5)
    c.beginPath()
    c.roundRect(3, 15, 42, 21, 10)
    c.fill()
    c.globalCompositeOperation = 'destination-out'
    c.fillRect(11.2, 19.5, 3.2, 10)
    c.fillRect(7.8, 23, 10, 3.2)
    ;[
      [35.5, 28.5, 2.6],
      [40, 24, 2.6],
      [29, 29, 1.7],
      [33.5, 21, 1.7],
    ].forEach(([x, y, r]) => {
      c.beginPath()
      c.arc(x, y, r, 0, Math.PI * 2)
      c.fill()
    })
    c.fillRect(19, 30, 3.2, 1.4)
    c.fillRect(23.8, 30, 3.2, 1.4)
  })
  // sort top-to-bottom so the morph sweeps instead of scrambling
  return [cloud, chat, pad].map((s) => s.sort((a, b) => a[1] - b[1] || a[0] - b[0]))
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function VoxelMorph() {
  const { hero } = useLang().c
  const wrapRef = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(0)
  const jumpRef = useRef<number | null>(null)

  useEffect(() => {
    const cv = cvRef.current!
    const wrap = wrapRef.current!
    const ctx = cv.getContext('2d')!
    const S = shapes()
    const N = Math.max(...S.map((s) => s.length))
    // per shape, which cell each particle targets
    const targets = S.map((s) => Array.from({ length: N }, (_, i) => s[Math.floor((i * s.length) / N)]))
    const jitter = Array.from({ length: N }, () => Math.random())
    const off = Array.from({ length: N }, () => ({ x: 0, y: 0 }))
    // where each particle is drawn now; a morph always starts from here, so jumping mid-morph never snaps
    const cur = targets[0].map(([x, y]) => [x, y])
    let start = cur.map((p) => [...p])

    let w = 0, h = 0, dpr = 1
    const resize = () => {
      const r = wrap.getBoundingClientRect()
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = r.width
      h = r.height
      cv.width = w * dpr
      cv.height = h * dpr
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const pointer = { x: -1e4, y: -1e4 }
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }
    const onLeave = () => {
      pointer.x = pointer.y = -1e4
    }
    cv.addEventListener('pointermove', onMove)
    cv.addEventListener('pointerleave', onLeave)

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(wrap)

    const still = reducedMotion()
    let to = 0
    let phaseStart = performance.now()
    let moving = false
    let raf = 0

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return

      if (jumpRef.current !== null && jumpRef.current !== to) {
        to = jumpRef.current
        start = cur.map((p) => [...p])
        moving = true
        phaseStart = now
        setActive(to)
      }
      jumpRef.current = null
      let el = now - phaseStart
      if (!still) {
        if (!moving && el > HOLD) {
          to = (to + 1) % S.length
          start = cur.map((p) => [...p])
          moving = true
          phaseStart = now
          setActive(to)
        } else if (moving && el > MOVE + 700) {
          moving = false
          phaseStart = now
        }
      }
      // a phase may have just changed: re-read the clock, otherwise the first frame of a morph
      // uses the old hold time and every voxel flashes at its final position for one frame
      el = now - phaseStart

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const cell = Math.min(w, h) / (G + 4)
      const ox = (w - cell * G) / 2
      const oy = (h - cell * G) / 2 - cell * 2
      const size = cell * 0.82
      const depth = cell * 0.32
      const t = now / 1000

      const R = Math.max(70, w * 0.16)
      const pts: { x: number; y: number; i: number }[] = []
      for (let i = 0; i < N; i++) {
        const a = moving ? start[i] : targets[to][i]
        const b = targets[to][i]
        let k = 1
        if (moving) {
          const delay = (a[0] / G) * 420 + jitter[i] * 260
          k = ease(Math.min(1, Math.max(0, (el - delay) / MOVE)))
        }
        const gx = a[0] + (b[0] - a[0]) * k
        const gy = a[1] + (b[1] - a[1]) * k
        cur[i][0] = gx
        cur[i][1] = gy
        let x = ox + gx * cell
        let y = oy + gy * cell
        const lift = Math.sin(k * Math.PI) * cell * 3 * (0.4 + jitter[i])
        const wave = still ? 0 : Math.sin(t * 1.4 + gx * 0.22 + gy * 0.12) * cell * 0.25
        // pointer repel with spring
        const dx = x - pointer.x
        const dy = y - pointer.y
        const d = Math.hypot(dx, dy)
        let tx = 0, ty = 0
        if (d < R && d > 0.01) {
          const f = ((R - d) / R) ** 2 * cell * 3.2
          tx = (dx / d) * f
          ty = (dy / d) * f
        }
        off[i].x += (tx - off[i].x) * 0.14
        off[i].y += (ty - off[i].y) * 0.14
        x += off[i].x
        y += off[i].y - lift + wave
        pts.push({ x, y, i })
      }

      // every shape is sorted top-to-bottom, so index order is a stable depth order: no popping mid-morph
      for (let j = pts.length - 1; j >= 0; j--) {
        const p = pts[j]
        const hi = jitter[p.i] > 0.9
        // top face
        ctx.fillStyle = hi ? '#c3d1ff' : '#7f9bff'
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p.x + depth, p.y - depth)
        ctx.lineTo(p.x + size + depth, p.y - depth)
        ctx.lineTo(p.x + size, p.y)
        ctx.fill()
        // side face
        ctx.fillStyle = hi ? '#5d7cff' : '#1a3fd6'
        ctx.beginPath()
        ctx.moveTo(p.x + size, p.y)
        ctx.lineTo(p.x + size + depth, p.y - depth)
        ctx.lineTo(p.x + size + depth, p.y + size - depth)
        ctx.lineTo(p.x + size, p.y + size)
        ctx.fill()
        // front face
        ctx.fillStyle = hi ? '#8aa4ff' : '#295afd'
        ctx.fillRect(p.x, p.y, size, size)
      }
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      cv.removeEventListener('pointermove', onMove)
      cv.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="morph rv media-rv" ref={wrapRef} style={{ ['--d' as string]: '120ms' }}>
      <canvas ref={cvRef} aria-label={hero.morphAria} role="img" />
      <div className="morph-label">
        {hero.morphLabels.map((l, i) => (
          <button key={l} className={i === active ? 'on' : ''} onClick={() => (jumpRef.current = i)}>
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}
