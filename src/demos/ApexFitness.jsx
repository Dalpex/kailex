import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import {
  ArrowRight, Zap, Flame, Trophy, Check, Star,
  Dumbbell, Target, Plus, Users, Shield,
  Sparkles, ArrowUpRight, Play, BarChart3,
} from 'lucide-react'

/* ─── Fondo 3D ───────────────────────────────────────── */

function AnimatedOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div
        className="absolute w-[700px] h-[500px] rounded-full bg-orange-600/10 blur-[140px]"
        animate={{ x: ['-8%','12%','0%','-8%'], y: ['-5%','8%','-12%','-5%'], scale: [1,1.15,0.9,1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '25%' }}
      />
      <motion.div
        className="absolute w-[450px] h-[350px] rounded-full bg-red-700/8 blur-[120px]"
        animate={{ x: ['0%','18%','5%','0%'], y: ['0%','-12%','8%','0%'], scale: [0.9,1,1.12,0.9] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        style={{ bottom: '15%', left: '5%' }}
      />
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full bg-amber-500/7 blur-[110px]"
        animate={{ x: ['0%','-12%','6%','0%'], y: ['8%','-6%','12%','8%'], scale: [1.1,0.88,1,1.1] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
        style={{ top: '25%', right: '3%' }}
      />
      {/* Aurora top */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[65vh] pointer-events-none"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 55deg, rgba(249,115,22,0.06) 115deg, rgba(239,68,68,0.04) 175deg, transparent 235deg)',
          filter: 'blur(50px)',
        }}
        animate={{ rotate: [0, 6, -4, 0], scaleX: [1, 1.08, 0.94, 1] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function FloatingParticles() {
  const particles = useMemo(() =>
    [...Array(18)].map((_, i) => ({
      id: i,
      left: ((i * 5.83 + 2.7) % 96) + 2,
      w: 1.5 + (i % 3) * 0.5,
      duration: 9 + (i % 6) * 2,
      delay: (i * 1.37) % 12,
      rise: 280 + (i % 7) * 80,
    })), []
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-orange-400"
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

function InfiniteMarquee({ items, speed = 35, reverse = false }) {
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
            <span className="w-1 h-1 rounded-full bg-orange-500 flex-shrink-0" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="border border-white/[0.07] rounded-2xl overflow-hidden"
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

const marqueItems = [
  'Más de 10.000 miembros activos', 'Coaches certificados internacionalmente',
  'Resultados visibles en 30 días', '5 sedes en Buenos Aires',
  'Primera semana completamente gratis', 'Planes desde $29/mes',
  'Sin contratos ni permanencia', 'Seguimiento personalizado',
  'App disponible 24/7', 'Comunidad de alto rendimiento',
]

const bentoStats = [
  { value: 10000, suffix: '+', label: 'Miembros activos', icon: Users, span: 'md:col-span-1' },
  { value: 98, suffix: '%', label: 'Tasa de éxito en 90 días', icon: BarChart3, span: 'md:col-span-1' },
  { value: 50, suffix: '+', label: 'Coaches expertos', icon: Trophy, span: 'md:col-span-1' },
  { value: 5, suffix: '', label: 'Sedes en BA', icon: Zap, span: 'md:col-span-1' },
]

const programas = [
  {
    icon: Dumbbell,
    tag: 'Más Popular',
    title: 'Fuerza y Potencia',
    desc: 'Programas de sobrecarga progresiva diseñados por coaches de élite para maximizar el crecimiento muscular y la fuerza bruta. Resultados visibles en 6 semanas.',
    accent: 'from-orange-500 to-red-600',
    features: ['Rutinas split personalizadas', 'Análisis de técnica en tiempo real', 'Check-ins 1:1 semanales', 'Ajuste de cargas mensual'],
    bg: 'from-orange-950/40 to-red-950/20',
  },
  {
    icon: Flame,
    tag: 'Tendencia',
    title: 'HIIT y Cardio',
    desc: 'Protocolos de alta intensidad que queman grasa rápido y potencian tu resistencia cardiovascular. Sesiones dinámicas de máximo 45 minutos.',
    accent: 'from-amber-400 to-orange-500',
    features: ['Entrenamiento por zonas cardíacas', 'Sesiones de 20 a 45 minutos', 'Opciones sin equipamiento', 'Seguimiento de calorías quemadas'],
    bg: 'from-amber-950/30 to-orange-950/20',
  },
  {
    icon: Target,
    tag: 'Sistema Completo',
    title: 'Plan Nutricional',
    desc: 'Nutrición de precisión adaptada a tu tipo de cuerpo, objetivos y estilo de vida. Sin restricciones extremas — ciencia aplicada.',
    accent: 'from-emerald-400 to-teal-500',
    features: ['Planes basados en macronutrientes', 'Ajustes semanales por progreso', 'Recetario de alta proteína', 'Guía de suplementación'],
    bg: 'from-emerald-950/30 to-teal-950/20',
  },
]

const pasos = [
  {
    num: '01',
    title: 'Evaluación inicial',
    desc: 'Completás una evaluación física y de objetivos. Un coach analiza tu punto de partida y define tu plan de ataque.',
  },
  {
    num: '02',
    title: 'Plan a medida',
    desc: 'Recibís tu programa de entrenamiento y nutrición personalizado, acceso a la app y una bienvenida de tu coach asignado.',
  },
  {
    num: '03',
    title: 'Ejecutás y progresás',
    desc: 'Seguís el plan, registrás tus avances y recibís ajustes periódicos. Resultados visibles desde la primera semana.',
  },
]

const transformaciones = [
  { name: 'Marcos T.', logro: '−22 kg', tiempo: '5 meses', tipo: 'Pérdida de grasa', color: 'from-orange-500/20 to-red-600/10', border: 'border-orange-500/20' },
  { name: 'Sofía R.', logro: '+8 kg', tiempo: '4 meses', tipo: 'Masa muscular', color: 'from-emerald-500/20 to-teal-600/10', border: 'border-emerald-500/20' },
  { name: 'Julián K.', logro: '8%', tiempo: '3 meses', tipo: 'Grasa corporal', color: 'from-blue-500/20 to-indigo-600/10', border: 'border-blue-500/20' },
  { name: 'Laura M.', logro: '−15 kg', tiempo: '6 meses', tipo: 'Pérdida de grasa', color: 'from-pink-500/20 to-rose-600/10', border: 'border-pink-500/20' },
  { name: 'Diego P.', logro: '+12 kg', tiempo: '8 meses', tipo: 'Masa muscular', color: 'from-purple-500/20 to-violet-600/10', border: 'border-purple-500/20' },
  { name: 'Valentina C.', logro: '6%', tiempo: '5 meses', tipo: 'Grasa corporal', color: 'from-amber-500/20 to-yellow-600/10', border: 'border-amber-500/20' },
]

const testimonios = [
  {
    name: 'Marcos T.',
    cargo: 'Miembro desde 2023',
    quote: 'APEX no es un gimnasio más. Es un sistema. Tenía 20 años entrenando sin resultados concretos. En 5 meses hice lo que no logré en dos décadas.',
    stars: 5,
    avatar: 'MT',
    gradient: 'from-orange-500 to-red-600',
    logro: '−22 kg en 5 meses',
  },
  {
    name: 'Sofía R.',
    cargo: 'Atleta recreacional',
    quote: 'El nivel de personalización es impresionante. Cada semana mi plan se ajusta según cómo respondí. Nunca me sentí un número más en un gimnasio masivo.',
    stars: 5,
    avatar: 'SR',
    gradient: 'from-violet-500 to-purple-600',
    logro: '+8 kg masa muscular',
  },
  {
    name: 'Julián K.',
    cargo: 'Preparación de competencia',
    quote: 'Llegué a APEX buscando bajar grasa para una competencia. Superé mis expectativas. La combinación de HIIT con nutrición de precisión es imbatible.',
    stars: 5,
    avatar: 'JK',
    gradient: 'from-blue-500 to-cyan-600',
    logro: 'Grasa corporal al 8%',
  },
]

const planes = [
  {
    name: 'Starter',
    monthly: 29,
    annual: 23,
    desc: 'Ideal para comenzar',
    features: ['Acceso al gimnasio', '2 clases grupales por semana', 'Guía nutricional básica', 'Acceso a la app'],
    highlighted: false,
  },
  {
    name: 'Pro',
    monthly: 59,
    annual: 47,
    desc: 'La más elegida',
    features: ['Clases ilimitadas', 'Coaching 1:1 mensual', 'Plan nutricional completo', 'Seguimiento de progreso', 'Reserva prioritaria', 'Acceso a todos los programas'],
    highlighted: true,
  },
  {
    name: 'Elite',
    monthly: 99,
    annual: 79,
    desc: 'Para atletas serios',
    features: ['Todo lo del plan Pro', 'Sesiones privadas semanales', 'Plan de alimentación a medida', 'Análisis biométrico mensual', 'Preparación para competencia', 'Acceso 24/7 a tu coach'],
    highlighted: false,
  },
]

const faqs = [
  {
    q: '¿Necesito experiencia previa para unirme a APEX?',
    a: 'Para nada. Tenemos miembros de todos los niveles, desde principiantes absolutos hasta atletas de competencia. Cada plan se adapta exactamente a tu punto de partida y objetivos.',
  },
  {
    q: '¿Cómo funciona la semana de prueba gratuita?',
    a: 'Accedés a todas las instalaciones y clases grupales durante 7 días sin costo ni tarjeta de crédito. Al finalizar, si querés continuar, elegís el plan que mejor se adapte. Sin trucos ni letras chicas.',
  },
  {
    q: '¿Qué pasa si no veo resultados en el primer mes?',
    a: 'Revisamos tu plan junto a tu coach asignado sin costo adicional. Si tras 60 días siguiendo el programa no notás cambios concretos, te devolvemos el dinero. Así de seguros estamos de nuestro método.',
  },
  {
    q: '¿Los planes incluyen seguimiento con un coach real?',
    a: 'Sí. A partir del plan Pro, tenés sesiones de coaching 1:1 con un profesional certificado. En el plan Elite, el acceso es directo y sin límite de horario vía app y en persona.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí, sin preguntas y sin penalizaciones. Trabajamos con membresías mensuales porque creemos que si seguís con nosotros, es porque los resultados hablan por sí solos.',
  },
]

/* ─── Componente principal ───────────────────────────── */

export default function ApexFitness() {
  const [anual, setAnual] = useState(false)

  return (
    <div className="bg-[#080808] text-white antialiased overflow-x-hidden selection:bg-orange-500/30">

      {/* Noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* ── NAV ─────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-14 h-16 bg-[#080808]/70 backdrop-blur-xl border-b border-white/[0.06]">
        <span className="text-xl font-black tracking-tighter">
          AP<span className="text-orange-500">EX</span>
        </span>
        <div className="hidden md:flex items-center gap-8 text-[13px] text-white/50 font-medium">
          {[['#programas', 'Programas'], ['#proceso', 'Proceso'], ['#resultados', 'Resultados'], ['#precios', 'Precios']].map(([href, label]) => (
            <a key={href} href={href} className="hover:text-white transition-colors duration-200">{label}</a>
          ))}
        </div>
        <a
          href="#precios"
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 active:scale-95 text-white text-[13px] font-bold px-4 py-2 rounded-full transition-all"
        >
          Empezar gratis <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-6 pt-20 pb-16 overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />
        {/* Orbes y partículas 3D */}
        <AnimatedOrbs />
        <FloatingParticles />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-6xl w-full"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-10">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-orange-400 bg-orange-500/[0.08] border border-orange-500/20 px-4 py-2 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500" />
              </span>
              Buenos Aires · 5 Sedes · Primer semana gratis
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-black tracking-tighter leading-[0.9] mb-8">
            <span className="block text-[clamp(2.8rem,10vw,10rem)] text-white/90">DONDE</span>
            <span className="block text-[clamp(2.8rem,10vw,10rem)] bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent">
              SE FORJAN
            </span>
            <span className="block text-[clamp(2.8rem,10vw,10rem)] text-white/90">LOS CAMPEONES</span>
          </h1>

          {/* Subheading */}
          <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed font-light">
            Programas de élite, coaches certificados y una comunidad que
            no acepta excusas. Resultados reales. Sin letra chica.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
            <a
              href="#precios"
              className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(249,115,22,0.3)] text-[15px]"
            >
              Empezar Semana Gratis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#resultados"
              className="flex items-center gap-2 border border-white/[0.1] hover:border-white/20 hover:bg-white/[0.03] text-white/60 hover:text-white px-8 py-4 rounded-full transition-all text-[15px] font-medium"
            >
              <Play className="w-4 h-4" />
              Ver Transformaciones
            </a>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.08] border border-white/[0.08] rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-sm w-full max-w-xl md:max-w-none mx-auto"
          >
            {[
              { v: 10000, s: '+', l: 'Miembros' },
              { v: 50, s: '+', l: 'Coaches' },
              { v: 98, s: '%', l: 'Éxito' },
              { v: 5, s: '', l: 'Sedes' },
            ].map(({ v, s, l }) => (
              <div key={l} className="px-8 py-5 text-center">
                <div className="text-2xl font-black text-white">
                  <StatCounter to={v} suffix={s} />
                </div>
                <div className="text-white/35 text-xs font-medium mt-0.5 tracking-wide">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────── */}
      <div className="py-7 border-y border-white/[0.06] overflow-hidden">
        <InfiniteMarquee items={marqueItems} speed={40} />
      </div>

      {/* ── PROGRAMAS ───────────────────────────────── */}
      <section id="programas" className="py-32 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">Nuestros Programas</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                Entrenás con<br />
                <span className="text-white/25">propósito.</span>
              </h2>
            </div>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed">
              Cada programa está diseñado con evidencia científica y validado por cientos de transformaciones reales.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {programas.map((prog, i) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, rotateX: 2, rotateY: i === 1 ? 0 : (i === 0 ? 2 : -2), scale: 1.01 }}
                style={{ transformPerspective: 1000 }}
                className={`group relative bg-gradient-to-b ${prog.bg} border border-white/[0.07] rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-white/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]`}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${prog.accent} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-3xl`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${prog.accent} flex items-center justify-center shadow-lg`}>
                      <prog.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${prog.accent} text-white`}>
                      {prog.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-black mb-3 tracking-tight">{prog.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-8">{prog.desc}</p>

                  <ul className="space-y-2.5">
                    {prog.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-white/65">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${prog.accent} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ───────────────────────────── */}
      <section id="proceso" className="py-28 px-6 md:px-14 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">El Proceso</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              Tres pasos.<br /><span className="text-white/25">Una transformación.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] rounded-3xl overflow-hidden">
            {pasos.map((paso, i) => (
              <motion.div
                key={paso.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-[#080808] p-10 hover:bg-white/[0.02] transition-colors duration-300"
              >
                <div className="text-[4rem] font-black text-white/[0.06] leading-none mb-6 tracking-tighter">{paso.num}</div>
                <h3 className="text-lg font-black mb-3 tracking-tight">{paso.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{paso.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSFORMACIONES ────────────────────────── */}
      <section id="resultados" className="py-32 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">Resultados Reales</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                Personas reales.<br />
                <span className="text-white/25">Números reales.</span>
              </h2>
            </div>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed">
              Más de 10.000 transformaciones documentadas. Sin filtros, sin edición.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {transformaciones.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`bg-gradient-to-br ${t.color} border ${t.border} rounded-2xl p-6 md:p-8`}
              >
                <div className="text-3xl md:text-5xl font-black tracking-tighter mb-2">{t.logro}</div>
                <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">{t.tipo}</div>
                <div className="text-white/35 text-xs">{t.name} · {t.tiempo}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ─────────────────────────────── */}
      <section className="py-28 px-6 md:px-14 bg-white/[0.01] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">Historias de Miembros</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              Ellos lo lograron.<br />
              <span className="text-white/25">Vos también podés.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonios.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/[0.03] border border-white/[0.07] rounded-3xl p-8 flex flex-col justify-between hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div>
                  {/* Comillas decorativas */}
                  <div className="text-6xl font-black text-orange-500/20 leading-none mb-4 font-serif">"</div>
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-white/65 text-[15px] leading-relaxed mb-8 italic">{t.quote}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-black text-xs`}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{t.name}</div>
                      <div className="text-white/35 text-xs">{t.cargo}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-400 text-xs font-bold">{t.logro}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS ─────────────────────────────────── */}
      <section id="precios" className="py-32 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">Membresía</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              Invertí en vos mismo.
            </h2>
            <p className="text-white/35 mb-8 text-sm">Sin contratos. Cancelá cuando quieras. Primera semana gratis.</p>

            {/* Toggle anual/mensual */}
            <div className="inline-flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-full">
              {[['mensual', false], ['anual', true]].map(([label, val]) => (
                <button
                  key={label}
                  onClick={() => setAnual(val)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    anual === val
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                  {val && <span className="ml-1.5 text-[10px] text-orange-200 font-black">−20%</span>}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {planes.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-orange-500/15 to-red-500/5 border-2 border-orange-500/40 shadow-[0_0_60px_rgba(249,115,22,0.1)]'
                    : 'bg-white/[0.03] border border-white/[0.07] hover:border-white/15'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[11px] font-black px-5 py-1.5 rounded-full tracking-widest uppercase">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="mb-8 mt-2">
                  <h3 className="text-lg font-black tracking-tight mb-1">{plan.name}</h3>
                  <p className="text-white/35 text-xs mb-6">{plan.desc}</p>
                  <div className="flex items-end gap-1">
                    <motion.span
                      key={anual ? 'a' : 'm'}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl font-black"
                    >
                      ${anual ? plan.annual : plan.monthly}
                    </motion.span>
                    <span className="text-white/35 mb-2 text-sm">/mes</span>
                  </div>
                  {anual && (
                    <p className="text-orange-400 text-xs font-semibold mt-1">
                      Ahorrás ${(plan.monthly - plan.annual) * 12}/año
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[13px] text-white/60">
                      <div className="w-4 h-4 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-orange-400" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3.5 rounded-2xl font-black text-[13px] transition-all hover:scale-[1.02] active:scale-95 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1]'
                  }`}
                >
                  Empezar Gratis
                </button>
              </motion.div>
            ))}
          </div>

          {/* Garantía */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mt-10 text-white/30 text-sm"
          >
            <Shield className="w-4 h-4 text-emerald-500" />
            Garantía de 60 días. Si no ves resultados, te devolvemos el dinero.
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-14 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">Preguntas Frecuentes</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Todo lo que necesitás saber.
            </h2>
          </motion.div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FAQItem key={i} index={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────── */}
      <section className="py-32 px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-950/60 via-red-950/40 to-[#080808] border border-orange-500/20 p-16 md:p-24 text-center">
            {/* Glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-48 bg-orange-500/15 rounded-full blur-[80px]" />
            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative">
              <Sparkles className="w-10 h-10 text-orange-500/60 mx-auto mb-8" />
              <h2 className="text-4xl md:text-[5.5rem] font-black tracking-tighter leading-none mb-6">
                Tu transformación<br />
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent">
                  empieza hoy.
                </span>
              </h2>
              <p className="text-white/40 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                Sumáte a más de 10.000 personas que eligieron dejar de esperar.
              </p>
              <a
                href="#precios"
                className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-black px-10 py-5 rounded-full text-[15px] transition-all hover:scale-105 shadow-[0_0_60px_rgba(249,115,22,0.35)]"
              >
                Reclamar Semana Gratis
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-14 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            <div>
              <span className="text-2xl font-black tracking-tighter block mb-3">
                AP<span className="text-orange-500">EX</span>
              </span>
              <p className="text-white/30 text-sm max-w-xs leading-relaxed">
                El sistema de entrenamiento más completo de Buenos Aires. Resultados o te devolvemos el dinero.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-3 text-sm text-white/35">
              {[['#programas', 'Programas'], ['#proceso', 'Proceso'], ['#resultados', 'Resultados'], ['#precios', 'Precios'], ['#', 'Privacidad'], ['#', 'Términos']].map(([href, label]) => (
                <a key={label} href={href} className="hover:text-white/70 transition-colors">{label}</a>
              ))}
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-white/20 text-xs">
            <span>© 2025 Apex Fitness. Todos los derechos reservados.</span>
            <span>
              Ejemplo creado con{' '}
              <a href="https://kailex.site" className="text-white/40 hover:text-white transition-colors font-semibold">Kailex</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
