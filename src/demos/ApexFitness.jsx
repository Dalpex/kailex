import { motion, AnimatePresence, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import {
  ArrowRight, ArrowUpRight, Check, Star, Plus, Play, Shield, Sparkles,
  Dumbbell, Flame, Activity, HeartPulse, Zap, Users, Trophy, Clock,
  TrendingUp, Award, MapPin, Phone, Mail, MessageCircle, Share2, Globe,
} from 'lucide-react'

/* ─── Imágenes (Unsplash) ────────────────────────────── */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
  prog1: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80',
  prog2: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80',
  prog3: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
  prog4: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=900&q=80',
  coach1: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=80',
  coach2: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80',
  coach3: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80',
  g1: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  g2: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
  g3: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80',
  g4: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  g5: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
  g6: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
}

/* ─── Fondo animado ──────────────────────────────────── */
function AnimatedBackdrop() {
  const particles = useMemo(() =>
    [...Array(20)].map((_, i) => ({
      id: i,
      left: ((i * 5.13 + 3) % 96) + 2,
      w: 1.5 + (i % 3) * 0.6,
      duration: 10 + (i % 6) * 2,
      delay: (i * 1.21) % 13,
      rise: 300 + (i % 7) * 70,
    })), [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div
        className="absolute w-[720px] h-[520px] rounded-full bg-red-600/12 blur-[150px]"
        animate={{ x: ['-8%', '12%', '0%', '-8%'], y: ['-5%', '8%', '-12%', '-5%'], scale: [1, 1.18, 0.9, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '8%', left: '22%' }}
      />
      <motion.div
        className="absolute w-[460px] h-[360px] rounded-full bg-red-800/10 blur-[130px]"
        animate={{ x: ['0%', '18%', '5%', '0%'], y: ['0%', '-12%', '8%', '0%'], scale: [0.9, 1, 1.14, 0.9] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        style={{ bottom: '12%', left: '4%' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-rose-500/8 blur-[120px]"
        animate={{ x: ['0%', '-12%', '6%', '0%'], y: ['8%', '-6%', '12%', '8%'], scale: [1.1, 0.86, 1, 1.1] }}
        transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
        style={{ top: '22%', right: '2%' }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-[65vh]"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 55deg, rgba(239,68,68,0.07) 115deg, rgba(225,29,72,0.05) 175deg, transparent 235deg)',
          filter: 'blur(55px)',
        }}
        animate={{ rotate: [0, 6, -4, 0], scaleX: [1, 1.08, 0.94, 1] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
      />
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-red-400"
          style={{ left: `${p.left}%`, bottom: '0px', width: p.w, height: p.w }}
          animate={{ y: [0, -p.rise], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

/* ─── Utilidades ─────────────────────────────────────── */
function useCounter(to, duration = 2) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const timer = setInterval(() => {
      const p = Math.min((Date.now() - start) / 1000 / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * to))
      if (p >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to, duration])
  return [count, ref]
}

function StatCounter({ to, suffix = '', prefix = '' }) {
  const [count, ref] = useCounter(to)
  return <span ref={ref}>{prefix}{count.toLocaleString('es-AR')}{suffix}</span>
}

function InfiniteMarquee({ items, speed = 40, reverse = false }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex-shrink-0 flex items-center gap-3 text-white/25 text-sm font-semibold uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function Reveal({ children, delay = 0, className = '', y = 24 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">
      <span className="w-6 h-px bg-red-500/60" />
      {children}
    </span>
  )
}

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="border border-white/[0.07] rounded-2xl overflow-hidden bg-white/[0.02]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="font-semibold text-white/90 text-[15px] leading-snug">{question}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center"
        >
          <Plus className="w-3.5 h-3.5 text-white/60" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-7 pb-6 text-white/50 text-sm leading-relaxed border-t border-white/[0.06] pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Datos ──────────────────────────────────────────── */
const marqueeItems = [
  'Más de 10.000 miembros activos', 'Coaches certificados internacionalmente',
  'Resultados visibles en 30 días', '5 sedes en Buenos Aires',
  'Primera semana gratis', 'Sin contratos ni permanencia',
  'Seguimiento personalizado', 'App disponible 24/7', 'Comunidad de alto rendimiento',
]

const beneficios = [
  { icon: Dumbbell, title: 'Equipamiento de élite', desc: 'Máquinas de última generación y zona de peso libre premium, mantenidas a diario para tu máximo rendimiento.' },
  { icon: Users, title: 'Coaches certificados', desc: 'Profesionales con certificación internacional que diseñan y ajustan tu plan semana a semana.' },
  { icon: HeartPulse, title: 'Plan a medida', desc: 'Entrenamiento y nutrición personalizados según tu cuerpo, tus objetivos y tu ritmo de vida.' },
  { icon: Clock, title: 'Acceso flexible', desc: 'Sedes abiertas con horarios amplios y app para reservar clases y entrenar cuando quieras.' },
  { icon: Activity, title: 'Seguimiento real', desc: 'Medimos tu progreso con datos concretos. Sin estimaciones: resultados que podés ver y comparar.' },
  { icon: Shield, title: 'Garantía de 60 días', desc: 'Si seguís el plan y no ves cambios, te devolvemos el dinero. Así de seguros estamos.' },
]

const programas = [
  { img: IMG.prog1, icon: Dumbbell, tag: 'Más popular', title: 'Fuerza y Potencia', desc: 'Sobrecarga progresiva para maximizar músculo y fuerza bruta.', accent: 'from-red-500 to-rose-600' },
  { img: IMG.prog2, icon: Flame, tag: 'Quema grasa', title: 'Pérdida de Peso', desc: 'Protocolos de alta intensidad que aceleran tu metabolismo.', accent: 'from-orange-500 to-red-500' },
  { img: IMG.prog3, icon: Activity, tag: 'Movilidad', title: 'Entrenamiento Funcional', desc: 'Movimientos que mejoran tu fuerza, equilibrio y vida diaria.', accent: 'from-rose-500 to-red-600' },
  { img: IMG.prog4, icon: Trophy, tag: '1 a 1', title: 'Entrenamiento Personal', desc: 'Un coach dedicado, enfocado 100% en tus objetivos.', accent: 'from-red-600 to-red-800' },
]

const logros = [
  { value: 10000, suffix: '+', label: 'Miembros transformados' },
  { value: 98, suffix: '%', label: 'Tasa de éxito a 90 días' },
  { value: 50, suffix: '+', label: 'Coaches expertos' },
  { value: 5, suffix: '', label: 'Sedes en Buenos Aires' },
]

const transformaciones = [
  { name: 'Marcos T.', logro: '−22 kg', tiempo: '5 meses', tipo: 'Pérdida de grasa', color: 'from-red-500/20 to-rose-600/10', border: 'border-red-500/20' },
  { name: 'Sofía R.', logro: '+8 kg', tiempo: '4 meses', tipo: 'Masa muscular', color: 'from-emerald-500/20 to-teal-600/10', border: 'border-emerald-500/20' },
  { name: 'Julián K.', logro: '8%', tiempo: '3 meses', tipo: 'Grasa corporal', color: 'from-blue-500/20 to-indigo-600/10', border: 'border-blue-500/20' },
  { name: 'Laura M.', logro: '−15 kg', tiempo: '6 meses', tipo: 'Pérdida de grasa', color: 'from-pink-500/20 to-rose-600/10', border: 'border-pink-500/20' },
]

const coaches = [
  { img: IMG.coach1, name: 'Camila Fuentes', rol: 'Head Coach · Fuerza', exp: '12 años', specs: ['Powerlifting', 'Hipertrofia', 'Competición'] },
  { img: IMG.coach2, name: 'Nicolás Bravo', rol: 'Coach · Alto rendimiento', exp: '9 años', specs: ['HIIT', 'Acondicionamiento', 'Atletas'] },
  { img: IMG.coach3, name: 'Valentina Ruiz', rol: 'Coach · Funcional', exp: '7 años', specs: ['Movilidad', 'Funcional', 'Rehabilitación'] },
]

const planes = [
  { name: 'Starter', monthly: 29, annual: 23, desc: 'Ideal para comenzar', features: ['Acceso al gimnasio', '2 clases grupales / semana', 'Guía nutricional básica', 'Acceso a la app'], highlighted: false },
  { name: 'Pro', monthly: 59, annual: 47, desc: 'La más elegida', features: ['Clases ilimitadas', 'Coaching 1:1 mensual', 'Plan nutricional completo', 'Seguimiento de progreso', 'Reserva prioritaria', 'Todos los programas'], highlighted: true },
  { name: 'Elite', monthly: 99, annual: 79, desc: 'Para atletas serios', features: ['Todo lo del plan Pro', 'Sesiones privadas semanales', 'Plan de alimentación a medida', 'Análisis biométrico mensual', 'Preparación de competición', 'Acceso 24/7 a tu coach'], highlighted: false },
]

const testimonios = [
  { name: 'Marcos T.', cargo: 'Miembro desde 2023', quote: 'APEX no es un gimnasio más, es un sistema. Tenía 20 años entrenando sin resultados. En 5 meses logré lo que no conseguí en dos décadas.', stars: 5, avatar: 'MT', gradient: 'from-red-500 to-rose-600', logro: '−22 kg en 5 meses' },
  { name: 'Sofía R.', cargo: 'Atleta recreacional', quote: 'El nivel de personalización es impresionante. Cada semana mi plan se ajusta según cómo respondí. Nunca me sentí un número más.', stars: 5, avatar: 'SR', gradient: 'from-violet-500 to-purple-600', logro: '+8 kg masa muscular' },
  { name: 'Julián K.', cargo: 'Preparación de competición', quote: 'Llegué buscando bajar grasa para una competencia y superé mis expectativas. HIIT más nutrición de precisión es imbatible.', stars: 5, avatar: 'JK', gradient: 'from-blue-500 to-cyan-600', logro: 'Grasa corporal al 8%' },
]

const galeria = [
  { img: IMG.g1, span: 'md:col-span-2 md:row-span-2', label: 'Zona de peso libre' },
  { img: IMG.g2, span: '', label: 'Equipamiento' },
  { img: IMG.g3, span: '', label: 'Sala principal' },
  { img: IMG.g4, span: 'md:row-span-2', label: 'Entrenamiento' },
  { img: IMG.g5, span: '', label: 'Funcional' },
  { img: IMG.g6, span: '', label: 'Box / Cardio' },
]

const faqs = [
  { q: '¿Necesito experiencia previa para unirme a APEX?', a: 'Para nada. Tenemos miembros de todos los niveles, desde principiantes absolutos hasta atletas de competición. Cada plan se adapta a tu punto de partida y objetivos.' },
  { q: '¿Cómo funciona la semana de prueba gratuita?', a: 'Accedés a todas las instalaciones y clases grupales durante 7 días sin costo ni tarjeta de crédito. Al finalizar, si querés continuar, elegís el plan que mejor se adapte.' },
  { q: '¿Qué pasa si no veo resultados en el primer mes?', a: 'Revisamos tu plan junto a tu coach sin costo adicional. Si tras 60 días siguiendo el programa no notás cambios concretos, te devolvemos el dinero.' },
  { q: '¿Los planes incluyen seguimiento con un coach real?', a: 'Sí. Desde el plan Pro tenés sesiones de coaching 1:1 con un profesional certificado. En Elite, el acceso es directo y sin límite de horario.' },
  { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí, sin preguntas y sin penalizaciones. Trabajamos con membresías mensuales porque creemos que si seguís con nosotros es por los resultados.' },
]

const navLinks = [['#beneficios', 'Beneficios'], ['#programas', 'Programas'], ['#coaches', 'Coaches'], ['#precios', 'Precios']]

/* ─── Componente principal ───────────────────────────── */
export default function ApexFitness() {
  const [anual, setAnual] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%'])
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15])

  useEffect(() => {
    const root = document.documentElement
    const prev = root.style.scrollBehavior
    root.style.scrollBehavior = 'smooth'
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { root.style.scrollBehavior = prev; window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <div className="bg-[#070707] text-white antialiased overflow-x-hidden selection:bg-red-500/30">
      {/* Scroll progress */}
      <motion.div className="fixed top-0 inset-x-0 h-0.5 bg-gradient-to-r from-red-500 to-rose-500 z-[60] origin-left" style={{ scaleX: progress }} />

      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-14 transition-all duration-300 ${
          scrolled ? 'h-16 bg-[#070707]/80 backdrop-blur-xl border-b border-white/[0.06]' : 'h-20 bg-transparent'
        }`}
      >
        <a href="#top" className="text-xl font-black tracking-tighter">AP<span className="text-red-500">EX</span></a>
        <div className="hidden md:flex items-center gap-8 text-[13px] text-white/50 font-medium">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} className="relative hover:text-white transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-red-500 hover:after:w-full after:transition-all">{label}</a>
          ))}
        </div>
        <a href="#precios" className="flex items-center gap-1.5 bg-red-500 hover:bg-red-400 active:scale-95 text-white text-[13px] font-bold px-4 py-2 rounded-full transition-all shadow-[0_0_30px_rgba(239,68,68,0.35)]">
          Empezar gratis <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} id="top" className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-6 pt-24 pb-16 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img src={IMG.hero} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/70 via-[#070707]/80 to-[#070707]" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />
        <AnimatedBackdrop />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-6xl w-full"
        >
          <div className="inline-flex items-center gap-2 mb-9">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-red-400 bg-red-500/[0.08] border border-red-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
              </span>
              Buenos Aires · 5 sedes · Primera semana gratis
            </div>
          </div>

          <h1 className="font-black tracking-tighter leading-[0.9] mb-8">
            <span className="block text-[clamp(2.8rem,10vw,10rem)] text-white">DONDE</span>
            <span className="block text-[clamp(2.8rem,10vw,10rem)] bg-gradient-to-r from-red-400 via-rose-400 to-red-500 bg-clip-text text-transparent">SE FORJAN</span>
            <span className="block text-[clamp(2.8rem,10vw,10rem)] text-white">LOS CAMPEONES</span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed font-light">
            Programas de élite, coaches certificados y una comunidad que no acepta excusas. Resultados reales, sin letra chica.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
            <a href="#precios" className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(239,68,68,0.35)] text-[15px]">
              Empezar semana gratis <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#programas" className="flex items-center gap-2 border border-white/[0.12] hover:border-white/25 hover:bg-white/[0.04] text-white/70 hover:text-white px-8 py-4 rounded-full transition-all text-[15px] font-medium backdrop-blur-sm">
              <Play className="w-4 h-4" /> Ver programas
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.08] border border-white/[0.08] rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-md w-full max-w-xl md:max-w-none mx-auto"
          >
            {logros.map(({ value, suffix, label }) => (
              <div key={label} className="px-6 py-5 text-center">
                <div className="text-2xl md:text-3xl font-black text-white"><StatCounter to={value} suffix={suffix} /></div>
                <div className="text-white/35 text-xs font-medium mt-0.5 tracking-wide">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-7 border-y border-white/[0.06] overflow-hidden relative z-10">
        <InfiniteMarquee items={marqueeItems} speed={42} />
      </div>

      {/* ── BENEFICIOS ── */}
      <section id="beneficios" className="py-28 md:py-32 px-6 md:px-14 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16 max-w-2xl mx-auto">
            <SectionLabel>Por qué APEX</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Todo lo que necesitás.<br /><span className="text-white/25">Nada que sobre.</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {beneficios.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="group h-full bg-white/[0.02] border border-white/[0.07] rounded-3xl p-7 hover:border-red-500/30 hover:bg-white/[0.04] transition-all duration-400 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-600/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <b.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2.5 tracking-tight">{b.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMAS ── */}
      <section id="programas" className="py-28 md:py-32 px-6 md:px-14 border-t border-white/[0.06] relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <SectionLabel>Nuestros programas</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Entrenás con<br /><span className="text-white/25">propósito.</span></h2>
            </div>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed">Cada programa está diseñado con evidencia científica y validado por cientos de transformaciones reales.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {programas.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="group relative h-[380px] rounded-3xl overflow-hidden border border-white/[0.07]">
                  <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/40 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${p.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="relative h-full flex flex-col justify-end p-6">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center shadow-lg mb-4`}>
                      <p.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-red-400 mb-2">{p.tag}</span>
                    <h3 className="text-xl font-black tracking-tight mb-2">{p.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-4">{p.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Ver más <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSFORMACIONES ── */}
      <section className="py-28 md:py-32 px-6 md:px-14 border-t border-white/[0.06] relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <SectionLabel>Resultados reales</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Personas reales.<br /><span className="text-white/25">Números reales.</span></h2>
            </div>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed">Más de 10.000 transformaciones documentadas. Sin filtros, sin edición.</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {transformaciones.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.07}>
                <div className={`bg-gradient-to-br ${t.color} border ${t.border} rounded-2xl p-6 md:p-8 h-full`}>
                  <div className="text-3xl md:text-5xl font-black tracking-tighter mb-2">{t.logro}</div>
                  <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">{t.tipo}</div>
                  <div className="text-white/35 text-xs">{t.name} · {t.tiempo}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-10 border-y border-white/[0.06]">
              {[[TrendingUp, '98%', 'Mejoran su composición corporal'], [Award, '4.9/5', 'Valoración promedio de miembros'], [Users, '10K+', 'Comunidad activa y creciendo']].map(([Icon, big, small], i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center"><Icon className="w-5 h-5 text-red-400" /></div>
                  <div>
                    <div className="text-2xl font-black tracking-tight">{big}</div>
                    <div className="text-white/40 text-xs">{small}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COACHES ── */}
      <section id="coaches" className="py-28 md:py-32 px-6 md:px-14 border-t border-white/[0.06] relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16 max-w-2xl mx-auto">
            <SectionLabel>Conocé al equipo</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Coaches que<br /><span className="text-white/25">hacen la diferencia.</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coaches.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1}>
                <div className="group relative h-[460px] rounded-3xl overflow-hidden border border-white/[0.07]">
                  <img src={c.img} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-7">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-400 mb-2"><Award className="w-3.5 h-3.5" /> {c.exp} de experiencia</span>
                    <h3 className="text-2xl font-black tracking-tight">{c.name}</h3>
                    <p className="text-white/55 text-sm mb-4">{c.rol}</p>
                    <div className="flex flex-wrap gap-2">
                      {c.specs.map(s => (
                        <span key={s} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60 backdrop-blur-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section id="precios" className="py-28 md:py-32 px-6 md:px-14 border-t border-white/[0.06] relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>Membresía</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Invertí en vos mismo.</h2>
            <p className="text-white/35 mb-8 text-sm">Sin contratos. Cancelá cuando quieras. Primera semana gratis.</p>
            <div className="inline-flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-full">
              {[['Mensual', false], ['Anual', true]].map(([label, val]) => (
                <button key={String(val)} onClick={() => setAnual(val)} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${anual === val ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-white/40 hover:text-white'}`}>
                  {label}{val && <span className="ml-1.5 text-[10px] text-red-200 font-black">−20%</span>}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {planes.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.1} className="h-full">
                <div className={`relative flex flex-col h-full rounded-3xl p-8 transition-all duration-300 ${plan.highlighted ? 'bg-gradient-to-b from-red-500/15 to-rose-500/5 border-2 border-red-500/40 shadow-[0_0_60px_rgba(239,68,68,0.12)] md:-translate-y-3' : 'bg-white/[0.03] border border-white/[0.07] hover:border-white/15'}`}>
                  {plan.highlighted && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-[11px] font-black px-5 py-1.5 rounded-full tracking-widest uppercase">Recomendado</span>
                    </div>
                  )}
                  <div className="mb-8 mt-2">
                    <h3 className="text-lg font-black tracking-tight mb-1">{plan.name}</h3>
                    <p className="text-white/35 text-xs mb-6">{plan.desc}</p>
                    <div className="flex items-end gap-1">
                      <motion.span key={anual ? 'a' : 'm'} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black">${anual ? plan.annual : plan.monthly}</motion.span>
                      <span className="text-white/35 mb-2 text-sm">/mes</span>
                    </div>
                    {anual && <p className="text-red-400 text-xs font-semibold mt-1">Ahorrás ${(plan.monthly - plan.annual) * 12}/año</p>}
                  </div>
                  <ul className="space-y-3 mb-10 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-3 text-[13px] text-white/60">
                        <div className="w-4 h-4 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-2.5 h-2.5 text-red-400" /></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3.5 rounded-2xl font-black text-[13px] transition-all hover:scale-[1.02] active:scale-95 ${plan.highlighted ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25' : 'bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1]'}`}>Empezar gratis</button>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex items-center justify-center gap-3 mt-10 text-white/30 text-sm">
              <Shield className="w-4 h-4 text-emerald-500" /> Garantía de 60 días. Si no ves resultados, te devolvemos el dinero.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="py-28 md:py-32 px-6 md:px-14 bg-white/[0.01] border-t border-white/[0.06] relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>Historias de miembros</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Ellos lo lograron.<br /><span className="text-white/25">Vos también podés.</span></h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonios.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="h-full">
                <div className="group h-full bg-white/[0.03] border border-white/[0.07] rounded-3xl p-8 flex flex-col justify-between hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300">
                  <div>
                    <div className="text-6xl font-black text-red-500/20 leading-none mb-4 font-serif">“</div>
                    <div className="flex gap-0.5 mb-5">{[...Array(t.stars)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-red-400 text-red-400" />)}</div>
                    <p className="text-white/65 text-[15px] leading-relaxed mb-8 italic">{t.quote}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-black text-xs`}>{t.avatar}</div>
                      <div>
                        <div className="font-bold text-sm text-white">{t.name}</div>
                        <div className="text-white/35 text-xs">{t.cargo}</div>
                      </div>
                    </div>
                    <div className="text-red-400 text-xs font-bold text-right">{t.logro}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section className="py-28 md:py-32 px-6 md:px-14 border-t border-white/[0.06] relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16 max-w-2xl mx-auto">
            <SectionLabel>Nuestras instalaciones</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Un espacio<br /><span className="text-white/25">a tu altura.</span></h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
            {galeria.map((g, i) => (
              <Reveal key={i} delay={(i % 3) * 0.06} className={g.span}>
                <div className="group relative h-full w-full rounded-2xl overflow-hidden border border-white/[0.07]">
                  <img src={g.img} alt={g.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-sm font-bold tracking-tight">{g.label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 md:py-32 px-6 md:px-14 border-t border-white/[0.06] relative z-10">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>Preguntas frecuentes</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Todo lo que necesitás saber.</h2>
          </Reveal>
          <div className="space-y-2">
            {faqs.map((faq, i) => <FAQItem key={i} index={i} question={faq.q} answer={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-28 md:py-32 px-6 md:px-14 relative z-10">
        <Reveal className="max-w-5xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden border border-red-500/20 p-12 md:p-24 text-center">
            <img src={IMG.prog2} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/80 via-[#070707]/90 to-[#070707]" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-48 bg-red-500/20 rounded-full blur-[80px]" />
            <div className="relative">
              <Sparkles className="w-10 h-10 text-red-500/60 mx-auto mb-8" />
              <h2 className="text-4xl md:text-[5.5rem] font-black tracking-tighter leading-none mb-6">Tu transformación<br /><span className="bg-gradient-to-r from-red-400 via-rose-400 to-red-500 bg-clip-text text-transparent">empieza hoy.</span></h2>
              <p className="text-white/45 text-lg mb-12 max-w-md mx-auto leading-relaxed">Sumate a más de 10.000 personas que eligieron dejar de esperar.</p>
              <a href="#precios" className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white font-black px-10 py-5 rounded-full text-[15px] transition-all hover:scale-105 shadow-[0_0_60px_rgba(239,68,68,0.4)]">
                Reclamar semana gratis <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-16 px-6 md:px-14 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-14">
            <div className="md:col-span-1">
              <span className="text-2xl font-black tracking-tighter block mb-3">AP<span className="text-red-500">EX</span></span>
              <p className="text-white/30 text-sm max-w-xs leading-relaxed mb-6">El sistema de entrenamiento más completo de Buenos Aires. Resultados o te devolvemos el dinero.</p>
              <div className="flex gap-3">
                {[MessageCircle, Share2, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-red-500/40 hover:bg-red-500/10 transition-all"><Icon className="w-4 h-4" /></a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Navegación</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                {navLinks.map(([href, label]) => <li key={href}><a href={href} className="hover:text-white transition-colors">{label}</a></li>)}
                <li><a href="#precios" className="hover:text-white transition-colors">Membresías</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contacto</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-red-500/70" /> Palermo, Buenos Aires</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-red-500/70" /> +54 11 5555-0123</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-red-500/70" /> hola@apexfitness.ar</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Empezá hoy</h4>
              <p className="text-white/40 text-sm mb-4 leading-relaxed">Primera semana gratis. Sin tarjeta, sin compromiso.</p>
              <a href="#precios" className="inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-400 text-white text-[13px] font-bold px-4 py-2.5 rounded-full transition-all">Reservar lugar <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-white/20 text-xs">
            <span>© 2025 Apex Fitness. Todos los derechos reservados.</span>
            <span>Ejemplo creado con <a href="https://kailex.site" className="text-white/40 hover:text-white transition-colors font-semibold">Kailex</a></span>
          </div>
        </div>
      </footer>
    </div>
  )
}
