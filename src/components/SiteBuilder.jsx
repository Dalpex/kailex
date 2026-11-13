import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { MapPin, Menu } from 'lucide-react'
import WaIcon from './WaIcon'
import { EASE, reveal } from './Showcase'
import { waLink } from '../config'

// "Probala con tu negocio": the visitor types their business name, picks a rubro,
// and a phone mock re-skins itself live. Until they touch it, it demos itself.

const SERIF = 'Georgia, "Times New Roman", serif'
const TIGHT = '"Inter Tight", Inter, system-ui, sans-serif'

export const PRESETS = [
  {
    id: 'barberia',
    label: 'Barbería',
    sample: 'Barbería Don Ramón',
    tagline: 'Corte y barba, sin esperar.',
    cta: 'Reservar turno',
    items: [['Corte clásico', '$9.000'], ['Corte + barba', '$12.000'], ['Perfilado', '$5.000']],
    hours: 'Mar a Sáb · 10 a 20 hs',
    bg: '#111014', fg: '#F3EEE6', soft: 'rgba(243,238,230,.55)', accent: '#D4A24C',
    font: TIGHT, weight: 900, upper: true, italic: false,
  },
  {
    id: 'restaurante',
    label: 'Restaurante',
    sample: 'La Parrilla de Tito',
    tagline: 'Brasas, vino y sobremesa larga.',
    cta: 'Reservar mesa',
    items: [['Bife de chorizo', '$18.500'], ['Provoleta', '$7.200'], ['Flan casero', '$4.800']],
    hours: 'Todos los días · 12 a 00 hs',
    bg: '#1B0F0A', fg: '#FBEFE3', soft: 'rgba(251,239,227,.55)', accent: '#E4572E',
    font: SERIF, weight: 700, upper: false, italic: true,
  },
  {
    id: 'estetica',
    label: 'Estética y uñas',
    sample: 'Studio Lumi',
    tagline: 'Uñas, cejas y pestañas con calma.',
    cta: 'Pedir turno',
    items: [['Semipermanente', '$14.000'], ['Kapping', '$16.000'], ['Lifting de pestañas', '$15.000']],
    hours: 'Lun a Sáb · 9 a 19 hs',
    bg: '#FBF1EE', fg: '#3A2328', soft: 'rgba(58,35,40,.55)', accent: '#D4728C',
    font: SERIF, weight: 400, upper: false, italic: true,
  },
  {
    id: 'gimnasio',
    label: 'Gimnasio',
    sample: 'Fuerza Gym',
    tagline: 'Entrená sin excusas.',
    cta: 'Clase de prueba',
    items: [['Pase libre', '$32.000'], ['Funcional', '$24.000'], ['Personalizado', '$45.000']],
    hours: 'Lun a Vie · 7 a 23 hs',
    bg: '#0A0A0A', fg: '#F4F4F0', soft: 'rgba(244,244,240,.5)', accent: '#C6F432',
    font: TIGHT, weight: 900, upper: true, italic: true,
  },
  {
    id: 'cafeteria',
    label: 'Cafetería',
    sample: 'Café Almendra',
    tagline: 'Café de especialidad y algo rico.',
    cta: 'Ver la carta',
    items: [['Flat white', '$4.200'], ['Medialunas x3', '$3.600'], ['Tostado', '$6.900']],
    hours: 'Lun a Dom · 8 a 20 hs',
    bg: '#F3EADF', fg: '#2B1D14', soft: 'rgba(43,29,20,.55)', accent: '#9A6237',
    font: SERIF, weight: 700, upper: false, italic: false,
  },
  {
    id: 'tienda',
    label: 'Tienda',
    sample: 'Mía Indumentaria',
    tagline: 'Nueva colección, envíos a todo el país.',
    cta: 'Comprar por WhatsApp',
    items: [['Remeras', 'desde $15.000'], ['Jeans', 'desde $38.000'], ['Abrigos', 'desde $62.000']],
    hours: 'Envíos en 24/48 hs',
    bg: '#FFFFFF', fg: '#111111', soft: 'rgba(17,17,17,.5)', accent: '#111111',
    font: TIGHT, weight: 800, upper: false, italic: false,
  },
]

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 22)

function deliveryDay() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  const s = d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric' })
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function MockSite({ p, name, typing }) {
  const initial = (name.trim()[0] || 'K').toUpperCase()
  const lightBtn = p.accent === '#111111' ? '#fff' : p.bg
  return (
    <div className="mock" style={{ background: p.bg, color: p.fg }}>
      <div className="mock-status" style={{ color: p.soft }}>
        <span>9:41</span>
        <span className="mock-status-pill" style={{ background: p.soft }} />
      </div>

      <div className="mock-nav">
        <span className="mock-logo" style={{ background: p.accent, color: lightBtn }}>{initial}</span>
        <span className="mock-nav-name">{name}</span>
        <Menu className="w-4 h-4 shrink-0" style={{ color: p.soft }} />
      </div>

      <div className="mock-hero">
        <div className="mock-hero-orb" style={{ background: `radial-gradient(closest-side, ${p.accent}, transparent)` }} />
        <p className="mock-eyebrow" style={{ color: p.accent }}>{p.label}</p>
        <p
          className="mock-title"
          style={{
            fontFamily: p.font,
            fontWeight: p.weight,
            fontStyle: p.italic ? 'italic' : 'normal',
            textTransform: p.upper ? 'uppercase' : 'none',
          }}
        >
          {name}
          {typing ? <span className="mock-caret" style={{ background: p.accent }} /> : null}
        </p>
        <p className="mock-tagline" style={{ color: p.soft }}>{p.tagline}</p>
        <span className="mock-btn" style={{ background: p.accent, color: lightBtn }}>{p.cta}</span>
      </div>

      <div className="mock-list">
        {p.items.map(([item, price]) => (
          <div key={item} className="mock-row" style={{ borderColor: p.soft.replace(/[\d.]+\)$/, '.18)') }}>
            <span>{item}</span>
            <span style={{ color: p.soft }}>{price}</span>
          </div>
        ))}
      </div>

      <div className="mock-gallery" aria-hidden="true">
        {[0, 1, 2].map((k) => (
          <span key={k} style={{ background: `linear-gradient(${135 + k * 40}deg, ${p.accent}, ${p.bg})`, opacity: 0.55 + k * 0.15 }} />
        ))}
      </div>

      <div className="mock-info" style={{ color: p.soft }}>
        <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: p.accent }} />
        {p.hours}
      </div>

      <span className="mock-wa"><WaIcon className="w-5 h-5" /></span>
    </div>
  )
}

export default function SiteBuilder() {
  const wrap = useRef(null)
  const inView = useInView(wrap, { margin: '-15% 0px' })
  const [presetId, setPresetId] = useState(PRESETS[0].id)
  const [name, setName] = useState('')
  const [touched, setTouched] = useState(false)
  const [demoName, setDemoName] = useState('')
  const [demoIdx, setDemoIdx] = useState(0)
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  // Self-demo: type a sample name, hold, move to the next rubro. Stops forever once touched.
  useEffect(() => {
    if (touched || !inView) return undefined
    const p = PRESETS[demoIdx % PRESETS.length]
    setPresetId(p.id)
    if (reduced) {
      setDemoName(p.sample)
      const t = setTimeout(() => setDemoIdx((i) => i + 1), 3200)
      return () => clearTimeout(t)
    }
    let i = 0
    setDemoName('')
    let hold
    const type = setInterval(() => {
      i += 1
      setDemoName(p.sample.slice(0, i))
      if (i >= p.sample.length) {
        clearInterval(type)
        hold = setTimeout(() => setDemoIdx((n) => n + 1), 2400)
      }
    }, 55)
    return () => {
      clearInterval(type)
      clearTimeout(hold)
    }
  }, [demoIdx, touched, inView, reduced])

  const p = PRESETS.find((x) => x.id === presetId) || PRESETS[0]
  const shown = touched ? name.trim() || p.sample : demoName || ' '
  const typing = !touched && !reduced && demoName.length < p.sample.length
  const domain = `${slugify(touched && name.trim() ? name : p.sample) || 'tunegocio'}.com`

  const takeOver = () => {
    if (!touched) setTouched(true)
  }

  const pick = (id) => {
    takeOver()
    setPresetId(id)
  }

  const waText = `Hola Kailex! Quiero mi web para ${touched && name.trim() ? name.trim() : 'mi negocio'} (${p.label.toLowerCase()}). La probé en kailex.site y la quiero así.`

  return (
    <section id="probala" ref={wrap} className="section scroll-mt-24 overflow-hidden">
      <div className="container-custom grid lg:grid-cols-12 gap-x-10 gap-y-10 lg:gap-y-8 items-center">
        <motion.div {...reveal()} className="lg:col-span-6 lg:pr-6 lg:self-end">
          <p className="eyebrow">Probala</p>
          <h2 className="h2 mt-5">
            Escribí el nombre de tu negocio.
            <br />
            <span className="text-mist">Mirá cómo quedaría.</span>
          </h2>

          <label className="builder-field mt-10" htmlFor="builder-name">
            <span className="mono text-mist">Nombre del negocio</span>
            <input
              id="builder-name"
              type="text"
              autoComplete="organization"
              maxLength={32}
              value={touched ? name : ''}
              placeholder={touched ? p.sample : 'Ej: ' + p.sample}
              onFocus={takeOver}
              onChange={(e) => {
                takeOver()
                setName(e.target.value)
              }}
            />
          </label>

          <div className="mt-6" role="radiogroup" aria-label="Rubro">
            <p className="mono text-mist">Rubro</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRESETS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="radio"
                  aria-checked={x.id === presetId}
                  onClick={() => pick(x.id)}
                  className={`builder-chip ${x.id === presetId ? 'is-on' : ''}`}
                  style={{ '--chip': x.accent === '#111111' ? '#EEEBFF' : x.accent }}
                >
                  <span className="builder-chip-dot" />
                  {x.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 relative grid place-items-center py-6">
          <div
            className="builder-glow"
            aria-hidden="true"
            style={{ background: `radial-gradient(closest-side, ${p.accent === '#111111' ? '#a855f7' : p.accent}55, transparent 70%)` }}
          />
          <motion.div {...reveal(0.1)} className="builder-phone">
            <div className="builder-phone-screen">
              <AnimatePresence initial={false}>
                <motion.div
                  key={p.id}
                  className="absolute inset-0"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <MockSite p={p} name={shown} typing={typing} />
        </motion.div>
              </AnimatePresence>
            </div>
            <span className="builder-island" aria-hidden="true" />
          </motion.div>
          <p className="mono text-mist mt-6 text-center">Vista previa · tu web la diseñamos a medida</p>
        </div>

        <motion.div {...reveal(0.05)} className="lg:col-span-6 lg:pr-6 lg:self-start">
          <dl className="builder-receipt">
            <div><dt>Dominio</dt><dd className="truncate">{domain}</dd></div>
            <div><dt>La ves</dt><dd>{deliveryDay()}</dd></div>
            <div><dt>Precio</dt><dd>USD 35 · pago único</dd></div>
          </dl>

          <a href={waLink(waText)} target="_blank" rel="noopener noreferrer" className="btn-wa mt-8">
            <WaIcon className="w-5 h-5" />
            La quiero así
          </a>
        </motion.div>
      </div>
    </section>
  )
}
