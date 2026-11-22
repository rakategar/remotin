/** remot.in mark, redrawn as SVG from the brand logo (cloud + signal arcs + rising pixels). */
export const MARK_PATHS = [
  'M15.5 17.5A31 31 0 0 1 66.5 17.5',
  'M24.5 27A16.5 16.5 0 0 1 56.5 27',
  'M17.5 24A14 14 0 0 0 14 53.5H31v-5',
  'M64.5 24A14 14 0 0 1 68 53.5H37.5',
]
export const MARK_PIXELS: [number, number, number][] = [
  [24, 43, 3], [29, 39, 4], [34, 35, 4], [39, 32, 3], [36, 41, 3],
]

export function Mark({ size = 40, color = 'var(--blue)', animated = true }: { size?: number; color?: string; animated?: boolean }) {
  return (
    <svg width={size} height={(size * 60) / 82} viewBox="0 0 82 60" aria-hidden>
      <g fill="none" stroke={color} strokeWidth={6.5}>
        <path className={animated ? 'arc' : ''} d={MARK_PATHS[0]} />
        <path className={animated ? 'arc a2' : ''} d={MARK_PATHS[1]} />
        <path d={MARK_PATHS[2]} />
        <path d={MARK_PATHS[3]} />
      </g>
      <g fill={color}>
        {MARK_PIXELS.map(([x, y, w], i) => (
          <rect key={i} className={animated ? 'px' : ''} style={{ animationDelay: `${i * 0.12}s` }} x={x} y={y} width={w} height={w} />
        ))}
      </g>
    </svg>
  )
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`logo${light ? ' light' : ''}`} aria-label="remot.in, ke atas">
      <Mark size={44} />
      <span className="word">
        remot<i>.in</i>
      </span>
    </a>
  )
}
