import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, Shield, Layers, Code, Palette, Globe } from 'lucide-react'
import ShaderBackground from '../components/ShaderBackground'

// Hero 3D Element
function HeroVisual() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10])
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -10])

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY }}
      className="relative hidden lg:block perspective-1000"
    >
      <div className="relative w-full max-w-md aspect-square ml-auto">
        {/* Main Card */}
        <div className="absolute inset-0 bg-slate-900 dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
          <div className="p-4 border-b border-slate-700 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-purple-400">const</span>
              <span className="text-blue-400">Kailex</span>
              <span className="text-slate-400">=</span>
              <span className="text-yellow-400">()</span>
              <span className="text-purple-400">=&gt;</span>
              <span className="text-yellow-400">{`{`}</span>
            </div>
            <div className="pl-4 text-green-400">
              <span className="text-slate-400">return</span>
              <span className="text-yellow-400">&lt;</span>
              <span className="text-red-400">Awesome</span>
              <span className="text-yellow-400">&gt;</span>
            </div>
            <div className="pl-8 text-slate-300">
              Web experiences that
            </div>
            <div className="pl-8 text-slate-300">
              convert & inspire
            </div>
            <div className="pl-4 text-yellow-400">
              <span className="text-yellow-400">&lt;/</span>
              <span className="text-red-400">Awesome</span>
              <span className="text-yellow-400">&gt;</span>
            </div>
            <div className="text-yellow-400">{'}'}</div>
          </div>
        </div>

        {/* Floating Cards - smaller and contained */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-8 -right-8 w-32 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-2xl shadow-indigo-500/30 flex items-center justify-center"
        >
          <Code className="w-8 h-8 text-white/80" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -bottom-4 -right-4 w-28 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl shadow-purple-500/30 flex items-center justify-center"
        >
          <Palette className="w-7 h-7 text-white/80" />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">
          {title}
        </h3>
        <p className="text-white/70 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const features = [
    { icon: Zap, title: 'Rápido', description: 'Optimización extrema para tiempos de carga bajo 1 segundo.' },
    { icon: Shield, title: 'Seguro', description: 'Implementación con las mejores prácticas de seguridad.' },
    { icon: Layers, title: 'Escalable', description: 'Arquitectura preparada para crecer con tu negocio.' },
    { icon: Globe, title: 'Global', description: 'CDN integrado para acceso desde cualquier lugar del mundo.' },
  ]

  return (
    <div ref={containerRef} className="relative">
      <ShaderBackground variant="default" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Diseño del futuro
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8">
                Creamos
                <span className="block gradient-text">
                  experiencias
                </span>
                digitales
              </h1>

              <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Transformamos ideas en productos digitales excepcionales.
                Diseño premium, código limpio, resultados extraordinarios.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/contacto"
                  className="group btn-gradient"
                >
                  <span className="flex items-center space-x-2">
                    <span>Comenzar proyecto</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/productos"
                  className="btn-secondary"
                >
                  Ver productos
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
                {[
                  { value: '2-3', label: 'Días de entrega' },
                  { value: '48h', label: 'Respuesta' },
                  { value: '24/7', label: 'Soporte' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Por qué elegirnos
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Combinamos diseño excepcional con tecnología de punta para crear
              productos que marcan la diferencia.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-slate-900 dark:bg-slate-800 rounded-3xl p-12 md:p-24 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ¿Listo para comenzar?
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad.
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center space-x-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                <span>Contactar ahora</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
