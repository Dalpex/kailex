import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { reveal, WORK, WorkCard } from '../Showcase'

// Desktop: the section pins and the client sites slide sideways as you scroll down.
// Phones, tablets and reduced motion: the regular stacked cards.
function useWide() {
  const q = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setWide(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return wide
}

function Heading() {
  return (
    <>
      <p className="eyebrow">Trabajos</p>
      <h2 className="h2 mt-5">Negocios reales,<br />webs reales.</h2>
    </>
  )
}

function ReelCard({ w, i }) {
  return (
    <a href={w.url} target="_blank" rel="noopener noreferrer" className="reel-card group" data-cursor="Ver web">
      <div className={`reel-stage bg-gradient-to-br ${w.tone} to-transparent`}>
        <div className="reel-browser">
          <div className="work-bar"><span /><span /><span /></div>
          <img src={w.desktop} alt={`Web de ${w.name} en computadora`} loading="lazy" decoding="async" />
        </div>
        <div className="reel-phone">
          <img src={w.mobile} alt={`Web de ${w.name} en celular`} loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="mt-7 flex items-start justify-between gap-6">
        <div>
          <p className="mono text-mist">{String(i + 1).padStart(2, '0')} / {String(WORK.length).padStart(2, '0')} · {w.kind}</p>
          <h3 className="text-4xl font-bold tracking-tight mt-3">{w.name}</h3>
          <p className="text-mist mt-3 max-w-lg leading-relaxed">{w.text}</p>
        </div>
        <span className="round-link reel-arrow" aria-hidden="true"><ArrowUpRight className="w-5 h-5" /></span>
      </div>
    </a>
  )
}

function Reel() {
  const section = useRef(null)
  const track = useRef(null)
  const distance = useMotionValue(0)
  const [height, setHeight] = useState('300vh')
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useMotionValue(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => x.set(-p * distance.get()))
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  useLayoutEffect(() => {
    const measure = () => {
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth)
      distance.set(d)
      x.set(-scrollYProgress.get() * d)
      setHeight(`${d + window.innerHeight}px`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [distance, x, scrollYProgress])

  return (
    <section id="trabajos" ref={section} className="relative" style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <motion.div ref={track} style={{ x }} className="reel-track">
          <div className="reel-intro">
            <Heading />
            <p className="lead mt-6 max-w-sm">Cada web se diseña para su rubro. Ninguna plantilla, ninguna igual a otra.</p>
            <p className="mono text-mist mt-10 flex items-center gap-3">Scrolleá <span className="reel-hint" /></p>
          </div>
          {WORK.map((w, i) => (
            <ReelCard key={w.name} w={w} i={i} />
          ))}
        </motion.div>
        <div className="container-custom w-full mt-10">
          <div className="reel-bar"><motion.span style={{ scaleX: bar }} /></div>
        </div>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section id="trabajos" className="section scroll-mt-24">
      <div className="container-custom">
        <motion.div {...reveal()} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div><Heading /></div>
          <p className="lead max-w-sm">Cada web se diseña para su rubro. Ninguna plantilla, ninguna igual a otra.</p>
        </motion.div>
        <div className="mt-16 grid lg:grid-cols-2 gap-16 lg:gap-10">
          {WORK.map((w, i) => (
            <WorkCard key={w.name} w={w} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function WorkReel() {
  return useWide() ? <Reel /> : <Stack />
}
