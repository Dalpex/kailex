import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Zap, Flame, Trophy, Check, Star, ChevronRight, Dumbbell, Target } from 'lucide-react'

function Counter({ to, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * to))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const programas = [
  {
    icon: Dumbbell,
    title: 'Fuerza y Potencia',
    description: 'Programas de sobrecarga progresiva diseñados por coaches de élite para maximizar el crecimiento muscular y la fuerza bruta.',
    tag: 'Más Popular',
    accent: 'from-orange-500 to-red-600',
    features: ['Rutinas split personalizadas', 'Seguimiento de técnica en tiempo real', 'Check-ins 1:1 con tu coach'],
  },
  {
    icon: Flame,
    title: 'HIIT y Cardio',
    description: 'Protocolos de alta intensidad que queman grasa rápido y potencian tu resistencia cardiovascular al máximo nivel.',
    tag: 'Tendencia',
    accent: 'from-yellow-500 to-orange-500',
    features: ['Entrenamiento por zonas cardíacas', 'Sesiones de 20 a 45 minutos', 'Opciones sin equipamiento'],
  },
  {
    icon: Target,
    title: 'Plan Nutricional',
    description: 'Nutrición de precisión adaptada a tu tipo de cuerpo, tus objetivos y tu estilo de vida — sin suposiciones.',
    tag: 'Sistema Completo',
    accent: 'from-emerald-500 to-teal-500',
    features: ['Planes basados en macros', 'Ajustes semanales', 'Guía de suplementación'],
  },
]

const testimonios = [
  {
    name: 'Marcos T.',
    result: 'Bajó 22kg en 5 meses',
    quote: 'APEX cambió completamente mi relación con el fitness. Los coaches son de primer nivel y la comunidad te mantiene enfocado.',
    stars: 5,
    avatar: 'MT',
    color: 'from-orange-500 to-red-600',
  },
  {
    name: 'Sofía R.',
    result: 'Ganó 8kg de masa muscular',
    quote: 'Probé de todo antes de APEX. Su programa de fuerza es lo único que me dio resultados visibles de verdad.',
    stars: 5,
    avatar: 'SR',
    color: 'from-purple-500 to-pink-600',
  },
  {
    name: 'Julián K.',
    result: 'Redujo grasa corporal al 8%',
    quote: 'La planificación nutricional sola ya vale todo. Combinada con las clases de HIIT, llegué a forma de competencia más rápido que nunca.',
    stars: 5,
    avatar: 'JK',
    color: 'from-blue-500 to-cyan-500',
  },
]

const planes = [
  {
    name: 'Starter',
    price: '29',
    desc: 'Ideal para comenzar',
    features: ['Acceso al gimnasio', '2 clases grupales por semana', 'Guía nutricional básica', 'Acceso a la app'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '59',
    desc: 'La más elegida',
    features: ['Clases ilimitadas', 'Coaching 1:1 mensual', 'Plan nutricional completo', 'Seguimiento de progreso', 'Reserva prioritaria'],
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '99',
    desc: 'Para atletas serios',
    features: ['Todo lo del plan Pro', 'Sesiones privadas semanales', 'Plan de alimentación personalizado', 'Análisis biométrico', 'Preparación para competencia', 'Acceso 24/7 al coach'],
    highlighted: false,
  },
]

export default function ApexFitness() {
  return (
    <div className="bg-[#0a0a0a] text-white font-sans overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0a0a0a]/80 backdrop-blur border-b border-white/5">
        <span className="text-2xl font-black tracking-tighter">
          AP<span className="text-orange-500">EX</span>
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#programas" className="hover:text-white transition-colors">Programas</a>
          <a href="#resultados" className="hover:text-white transition-colors">Resultados</a>
          <a href="#precios" className="hover:text-white transition-colors">Precios</a>
        </div>
        <a
          href="#precios"
          className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors"
        >
          Unirme
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
            <Zap className="w-3 h-3" />
            Buenos Aires · 5 Sedes
          </div>

          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-6">
            <span className="block">DONDE SE</span>
            <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
              FORJAN LOS
            </span>
            <span className="block">CAMPEONES</span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Programas de entrenamiento de élite, coaches de primer nivel y una comunidad
            que no acepta rendirse. Tu transformación empieza hoy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#precios"
              className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-500/30"
            >
              Empezar Semana Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#programas"
              className="flex items-center gap-2 border border-white/10 hover:border-white/30 text-white/70 hover:text-white px-8 py-4 rounded-full transition-all"
            >
              Ver Programas
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
        >
          {[
            { value: 10000, suffix: '+', label: 'Miembros' },
            { value: 50, suffix: '+', label: 'Coaches Expertos' },
            { value: 98, suffix: '%', label: 'Tasa de Éxito' },
            { value: 5, suffix: '', label: 'Sedes en BA' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.02] px-8 py-6 text-center">
              <div className="text-3xl font-black text-white">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/40 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── PROGRAMAS ── */}
      <section id="programas" className="py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-4">Nuestros Programas</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Entrenás con <span className="text-white/30">propósito.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {programas.map((prog, i) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/[0.03] border border-white/5 rounded-3xl p-8 overflow-hidden hover:border-white/10 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${prog.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${prog.accent} text-white mb-6`}>
                  {prog.tag}
                </span>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${prog.accent} flex items-center justify-center mb-6`}>
                  <prog.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black mb-3">{prog.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{prog.description}</p>
                <ul className="space-y-2">
                  {prog.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${prog.accent} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTADOS BANNER ── */}
      <section id="resultados" className="py-24 px-6 md:px-12 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <Trophy className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            Personas reales.<br />Resultados reales.
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Más de 10.000 personas transformaron su cuerpo y su vida con APEX.
            Tu historia empieza ahora.
          </p>
          <a
            href="#precios"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-black px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-xl"
          >
            Ver Historias de Transformación <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-4">Historias de Miembros</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Ellos lo lograron.<br /><span className="text-white/30">Vos también podés.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonios.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/5 rounded-3xl p-8"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-8 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-black text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-orange-400 text-xs font-semibold">{t.result}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section id="precios" className="py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-4">Membresía</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              Invertí en vos mismo.
            </h2>
            <p className="text-white/40 max-w-md mx-auto">Sin contratos. Cancelá cuando quieras. Primera semana gratis en todos los planes.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {planes.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-orange-500/20 to-red-500/10 border-2 border-orange-500/50'
                    : 'bg-white/[0.03] border border-white/5'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-black px-5 py-1.5 rounded-full whitespace-nowrap">
                    MÁS POPULAR
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-lg font-black mb-1">{plan.name}</h3>
                  <p className="text-white/40 text-sm mb-6">{plan.desc}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black">${plan.price}</span>
                    <span className="text-white/40 mb-2">/mes</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-orange-400" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  Empezar Gratis
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-32 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative bg-white/[0.03] border border-white/5 rounded-3xl p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-orange-500/10 blur-[80px]" />
            <div className="relative">
              <Flame className="w-12 h-12 text-orange-500 mx-auto mb-6" />
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                Tu transformación<br />
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  empieza hoy.
                </span>
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
                Sumáte a más de 10.000 personas que eligieron dejar de esperar y empezar a ganar.
              </p>
              <a
                href="#precios"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-2xl shadow-orange-500/30"
              >
                Reclamar Semana Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-2xl font-black tracking-tighter">
            AP<span className="text-orange-500">EX</span>
          </span>
          <p className="text-white/30 text-sm">
            © 2025 Apex Fitness. Ejemplo creado con{' '}
            <span className="text-white/50">Kailex</span>.
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white/60 transition-colors">Términos</a>
            <a href="#" className="hover:text-white/60 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
