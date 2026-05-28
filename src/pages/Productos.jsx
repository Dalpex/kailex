import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Monitor, Smartphone, ShoppingCart, Laptop } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'

const products = [
  {
    icon: Monitor,
    title: 'Landing Pages',
    description: 'Páginas de alto impacto diseñadas para convertir visitantes en clientes. Perfectas para lanzamientos, productos específicos o campañas.',
    features: ['Diseño conversivo', 'Copywriting optimizado', 'A/B testing ready', 'Analytics integrado'],
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Laptop,
    title: 'Sitios Web',
    description: 'Sitios completos multi-página con gestión de contenidos. Ideales para empresas, profesionales y marcas personales.',
    features: ['CMS autoadministrable', 'Multi-página', 'Blog integrado', 'SEO avanzado'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Tiendas online completas con pasarelas de pago, gestión de inventario y panel de administración intuitivo.',
    features: ['Pagos seguros', 'Gestión de stock', 'Envíos integrados', 'Panel administrativo'],
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Smartphone,
    title: 'Aplicaciones Web',
    description: 'Aplicaciones progresivas y plataformas web a medida con funcionalidades avanzadas y experiencia nativa.',
    features: ['PWA ready', 'Offline first', 'Sincronización', 'Notificaciones push'],
    gradient: 'from-cyan-500 to-blue-500',
  },
]

function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      {/* Icon */}
      <div className={`h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
        <product.icon className="w-20 h-20 text-white/80" />
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          {product.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${product.gradient}`} />
              <span className="text-slate-700 dark:text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/contacto"
          className="group inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all"
        >
          <span>Comenzar</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function Productos() {
  return (
    <div className="relative">
      <AnimatedBackground variant="gradient" />
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">

        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              Productos que{' '}
              <span className="gradient-text">impulsan</span> tu negocio
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Soluciones digitales diseñadas para cada etapa de tu crecimiento.
              Desde una landing page hasta plataformas complejas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.title} product={product} index={index} />
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
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                ¿No estás seguro qué necesitas?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Te asesoramos gratuitamente para encontrar la solución perfecta para tu proyecto.
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-xl"
              >
                <span>Solicitar asesoría</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
