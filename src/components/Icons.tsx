type P = { size?: number }
const s = (size = 20) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true,
})

export const Chevron = ({ size = 14 }: P) => <svg {...s(size)}><path d="m6 9 6 6 6-6" /></svg>
export const Arrow = ({ size = 18 }: P) => <svg {...s(size)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
export const ArrowUR = ({ size = 20 }: P) => <svg {...s(size)} strokeWidth={2}><path d="M7 17 17 7M8 7h9v9" /></svg>
export const Menu = ({ size = 22 }: P) => <svg {...s(size)}><path d="M4 8h16M4 16h16" /></svg>
export const Close = ({ size = 22 }: P) => <svg {...s(size)}><path d="M6 6l12 12M18 6 6 18" /></svg>
export const Chat = ({ size = 20 }: P) => <svg {...s(size)}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth={2.4} /></svg>
export const Car = ({ size = 20 }: P) => <svg {...s(size)}><path d="M3 15V9.5L5 6h7l2 4h5.5a1.5 1.5 0 0 1 1.5 1.5V15" /><path d="M3 15h18" /><circle cx="7" cy="16.5" r="2" /><circle cx="17" cy="16.5" r="2" /></svg>
export const Bolt = ({ size = 40 }: P) => <svg {...s(size)}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
export const Cloud = ({ size = 40 }: P) => <svg {...s(size)}><path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9.5a4.3 4.3 0 0 1-.5 8.5H7Z" /><path d="M10 14h.01M13 12h.01" strokeWidth={2.2} /></svg>
export const Wallet = ({ size = 40 }: P) => <svg {...s(size)}><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 10h18M16 14.5h2" /><path d="M6 6l9-3 1.5 3" /></svg>
export const Sparkle = ({ size = 16 }: P) => <svg {...s(size)} fill="currentColor" stroke="none"><path d="M12 2c.6 4.8 2.6 7.4 8 8-5.4.6-7.4 3.2-8 8-.6-4.8-2.6-7.4-8-8 5.4-.6 7.4-3.2 8-8Z" /></svg>
export const Mail = ({ size = 18 }: P) => <svg {...s(size)}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
