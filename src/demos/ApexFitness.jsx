import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Zap, Flame, Trophy, Check, Star, ChevronRight, Dumbbell, Target, Users } from 'lucide-react'

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

const programs = [
  {
    icon: Dumbbell,
    title: 'Strength Training',
    description: 'Progressive overload programs designed by elite coaches to maximize muscle growth and raw power.',
    tag: 'Most Popular',
    accent: 'from-orange-500 to-red-600',
    features: ['Personalized split routines', 'Real-time form tracking', '1:1 coach check-ins'],
  },
  {
    icon: Flame,
    title: 'HIIT & Cardio',
    description: 'High-intensity interval protocols that torch fat fast and boost your cardiovascular endurance.',
    tag: 'Trending',
    accent: 'from-yellow-500 to-orange-500',
    features: ['Heart-rate zone training', '20-45 min sessions', 'Equipment-free options'],
  },
  {
    icon: Target,
    title: 'Nutrition Plans',
    description: 'Precision nutrition tailored to your body type, goals, and lifestyle — no guesswork.',
    tag: 'Complete System',
    accent: 'from-emerald-500 to-teal-500',
    features: ['Macro-based meal plans', 'Weekly adjustments', 'Supplement guidance'],
  },
]

const testimonials = [
  {
    name: 'Marcus T.',
    result: 'Lost 22kg in 5 months',
    quote: 'APEX completely changed how I approach fitness. The coaches are world class and the community keeps you accountable.',
    stars: 5,
    avatar: 'MT',
    color: 'from-orange-500 to-red-600',
  },
  {
    name: 'Sofia R.',
    result: 'Gained 8kg muscle mass',
    quote: 'I tried everything before APEX. Their strength program is the only thing that actually delivered results I can see.',
    stars: 5,
    avatar: 'SR',
    color: 'from-purple-500 to-pink-600',
  },
  {
    name: 'James K.',
    result: 'Cut body fat to 8%',
    quote: 'The nutrition planning alone is worth it. Paired with HIIT classes, I hit competition shape faster than ever before.',
    stars: 5,
    avatar: 'JK',
    color: 'from-blue-500 to-cyan-500',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '29',
    desc: 'Perfect to get started',
    features: ['Access to gym floor', '2 group classes/week', 'Basic nutrition guide', 'App access'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '59',
    desc: 'Most popular choice',
    features: ['Unlimited classes', 'Monthly 1:1 coaching', 'Full nutrition plan', 'Progress tracking', 'Priority booking'],
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '99',
    desc: 'For serious athletes',
    features: ['Everything in Pro', 'Weekly private sessions', 'Custom meal prep', 'Biometric analysis', 'Competition prep', '24/7 coach access'],
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
          <a href="#programs" className="hover:text-white transition-colors">Programs</a>
          <a href="#results" className="hover:text-white transition-colors">Results</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <a
          href="#pricing"
          className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors"
        >
          Join Now
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
            <Zap className="w-3 h-3" />
            Buenos Aires · 5 Locations
          </div>

          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-6">
            <span className="block">WHERE</span>
            <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
              CHAMPIONS
            </span>
            <span className="block">ARE MADE</span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Elite training programs, world-class coaches, and a community
            that refuses to settle for less. Your transformation starts today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pricing"
              className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-500/30"
            >
              Start Free Week
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#programs"
              className="flex items-center gap-2 border border-white/10 hover:border-white/30 text-white/70 hover:text-white px-8 py-4 rounded-full transition-all"
            >
              Explore Programs
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
        >
          {[
            { value: 10000, suffix: '+', label: 'Members' },
            { value: 50, suffix: '+', label: 'Expert Coaches' },
            { value: 98, suffix: '%', label: 'Success Rate' },
            { value: 5, suffix: '', label: 'Locations BA' },
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

      {/* ── PROGRAMS ── */}
      <section id="programs" className="py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-4">Our Programs</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Train with <span className="text-white/30">purpose.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((prog, i) => (
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

      {/* ── RESULTS BANNER ── */}
      <section id="results" className="py-24 px-6 md:px-12 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <Trophy className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            Real people.<br />Real results.
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Over 10,000 members have transformed their bodies and lives with APEX.
            Your story starts now.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-black px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-xl"
          >
            See Transformation Stories <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-4">Member Stories</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              They did it.<br /><span className="text-white/30">So can you.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
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

      {/* ── PRICING ── */}
      <section id="pricing" className="py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-4">Membership</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              Invest in yourself.
            </h2>
            <p className="text-white/40 max-w-md mx-auto">No contracts. Cancel anytime. First week free on all plans.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
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
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-lg font-black mb-1">{plan.name}</h3>
                  <p className="text-white/40 text-sm mb-6">{plan.desc}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black">${plan.price}</span>
                    <span className="text-white/40 mb-2">/mo</span>
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
                  Get Started Free
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
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
                Your transformation<br />
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  starts today.
                </span>
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
                Join 10,000+ members who chose to stop waiting and start winning.
              </p>
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-2xl shadow-orange-500/30"
              >
                Claim Free Week
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
            © 2025 Apex Fitness. Example built with{' '}
            <span className="text-white/50">Kailex</span>.
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
