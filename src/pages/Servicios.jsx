import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Palette, Code2, Search, Wrench, BarChart3, MessageSquare } from 'lucide-react'
import ShaderBackground from '../components/ShaderBackground'

const services = [
  {
    icon: Palette,
    title: 'Diseño UI/UX',
    description: 'Interfaces que combinan belleza y funcionalidad. Investigamos, prototipamos y diseñamos experiencias que tus usuarios amarán.',
    details: [
      'Investigación de usuarios',
      'Wireframes y prototipos',
      'Design systems',
      'Testing de usabilidad',
    ],
  },
  {
    icon: Code2,
    title: 'Desarrollo Web',
    description: 'Código limpio, moderno y escalable. Implementamos con las mejores tecnologías del mercado.',
    details: [
      'React / Next.js',
      'Tailwind CSS',
      'Node.js backend',
      'Integraciones API',
    ],
  },
  {
    icon: Search,
    title: 'SEO & Performance',
    description: 'Optimizamos tu sitio para que aparezca primero en búsquedas y cargue instantáneamente.',
    details: [
      'SEO técnico',
      'Optimización Core Web Vitals',
      'Schema markup',
      'Auditorías continuas',
    ],
  },
  {
    icon: Wrench,
    title: 'Mantenimiento',
    description: 'Soporte continuo para mantener tu sitio seguro, actualizado y funcionando perfectamente.',
    details: [
      'Actualizaciones de seguridad',
      'Backups automáticos',
      'Monitoreo 24/7',
      'Soporte prioritario',
    ],
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Implementación y configuración de herramientas de análisis para medir lo que importa.',
    details: [
      'Google Analytics 4',
      'Tag Manager',
      'Dashboards personalizados',
      'Reportes automáticos',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Consultoría',
    description: 'Asesoramiento estratégico para tomar las mejores decisiones tecnológicas para tu negocio.',
    details: [
      'Audit técnico',
      'Roadmap digital',
      'Arquitectura de información',
      'Capacitación de equipos',
    ],
  },
]

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="group relative p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <service.icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          {service.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {service.description}
        </p>

        <ul className="space-y-3">
          {service.details.map((detail) => (
            <li key={detail} className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-slate-700 dark:text-slate-300">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Servicios() {
  return (
    <div className="relative">
      <ShaderBackground variant="dark" />
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 -z-10" />

        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              Servicios{' '}
              <span className="gradient-text">integrales</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Todo lo que necesitás para triunfar online. Desde el diseño hasta el mantenimiento,
              te acompañamos en cada paso.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding relative bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Cómo trabajamos
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Un proceso probado que garantiza resultados excepcionales.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Descubrir', description: 'Entendemos tu negocio en 24h.' },
              { step: '02', title: 'Diseñar', description: 'Prototipos en 1-2 días.' },
              { step: '03', title: 'Desarrollar', description: 'Construimos en tiempo récord.' },
              { step: '04', title: 'Lanzar', description: 'Deploy en horas, no días.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-indigo-200 dark:text-indigo-900/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                ¿Listo para empezar?
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Cuéntanos sobre tu proyecto y te ayudaremos a elegir los servicios ideales.
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center space-x-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                <span>Contactar</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
