import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import WaIcon from './WaIcon'
import { waLink } from '../config'

export const EASE = [0.16, 1, 0.3, 1]

export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, delay, ease: EASE },
})

export function WaButton({ children, text, className = '' }) {
  return (
    <a href={waLink(text)} target="_blank" rel="noopener noreferrer" className={`btn-wa ${className}`}>
      <WaIcon className="w-5 h-5" />
      {children}
    </a>
  )
}

export function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 150, damping: 18 })
  const glareX = useTransform(mx, (v) => `${v * 100}%`)
  const glareY = useTransform(my, (v) => `${v * 100}%`)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', '--gx': glareX, '--gy': glareY }}
        className="tilt"
      >
        {children}
        <motion.div className="tilt-glare" style={{ '--gx': glareX, '--gy': glareY }} aria-hidden="true" />
      </motion.div>
    </div>
  )
}

export const WORK = [
  {
    name: 'Brunna Ristorante',
    kind: 'Restaurante · Quilmes',
    text: 'Una web con la calidez del salón: reservas en un toque, la carta, la galería y cómo llegar.',
    desktop: '/work/brunna-desktop.jpg',
    mobile: '/work/brunna-screen.jpg',
    url: 'https://brunna.ar',
    tone: 'from-amber-500/25',
  },
  {
    name: 'TILO · nails & body',
    kind: 'Estudio de belleza · Quilmes',
    text: 'Serena y femenina, pensada para que reservar turno por WhatsApp sea lo más fácil del mundo.',
    desktop: '/work/tilo-desktop.jpg',
    mobile: '/work/tilo-screen.jpg',
    url: 'https://tilonailsandbody.com.ar',
    tone: 'from-lime-400/20',
  },
]

export function WorkCard({ w, i }) {
  const Wrapper = w.url ? 'a' : 'div'
  const linkProps = w.url ? { href: w.url, target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <motion.article {...reveal(i * 0.12)}>
      <TiltCard>
        <Wrapper {...linkProps} className={`work group block bg-gradient-to-br ${w.tone} to-transparent`}>
          <div className="work-browser" style={{ transform: 'translateZ(20px)' }}>
            <div className="work-bar">
              <span /><span /><span />
            </div>
            <img src={w.desktop} alt={`Web de ${w.name} en computadora`} loading="lazy" className="w-full aspect-[16/10] object-cover object-top" />
          </div>
          <div className="work-phone" style={{ transform: 'translateZ(70px)' }}>
            <img src={w.mobile} alt={`Web de ${w.name} en celular`} loading="lazy" className="w-full h-full object-cover object-top" />
          </div>
        </Wrapper>
      </TiltCard>
      <div className="mt-7 flex items-start justify-between gap-6">
        <div>
          <p className="mono text-mist">{w.kind}</p>
          <h3 className="text-3xl font-bold tracking-tight mt-2">{w.name}</h3>
          <p className="text-mist mt-3 max-w-md leading-relaxed">{w.text}</p>
        </div>
        {w.url ? (
          <a href={w.url} target="_blank" rel="noopener noreferrer" className="round-link" aria-label={`Abrir la web de ${w.name}`}>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        ) : null}
      </div>
    </motion.article>
  )
}

export function Accordion({ items, className = '' }) {
  const [open, setOpen] = useState(0)
  return (
    <div className={`border-t border-line ${className}`}>
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 text-left text-lg md:text-xl font-semibold tracking-tight hover:text-white transition-colors"
            >
              {f.q}
              <Plus className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45 text-violet-400' : 'text-mist'}`} />
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-mist leading-relaxed max-w-2xl">{f.a}</p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
