import { useEffect, useRef, useState, type RefObject } from 'react'
import Lenis from 'lenis'

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null

export function startSmoothScroll() {
  if (reducedMotion() || lenis) return () => {}
  lenis = new Lenis({ lerp: 0.1 })
  let raf = 0
  const loop = (t: number) => {
    lenis?.raf(t)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
  // in-page anchors go through Lenis so they glide too
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
    if (!a || !lenis) return
    const el = document.querySelector(a.getAttribute('href')!)
    if (!el) return
    e.preventDefault()
    const top = getComputedStyle(document.documentElement).getPropertyValue('--top')
    lenis.scrollTo(el as HTMLElement, { offset: -parseInt(top || '120') })
  }
  document.addEventListener('click', onClick)
  return () => {
    cancelAnimationFrame(raf)
    document.removeEventListener('click', onClick)
    lenis?.destroy()
    lenis = null
  }
}

/** Adds `.in` to every `.rv` element once it scrolls into view. */
export function useRevealAll() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -12% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** 0..1 progress of an element scrolling through the viewport (start: top hits viewport top). */
export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      const el = ref.current
      if (el) {
        const r = el.getBoundingClientRect()
        const total = r.height - window.innerHeight
        const v = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
        setP((old) => (Math.abs(old - v) > 0.001 ? v : old))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ref])
  return p
}

/** true while the element is on screen; used to pause loops off-screen. */
export function useInView<T extends HTMLElement>(margin = '0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return [ref, inView] as const
}
