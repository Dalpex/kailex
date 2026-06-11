import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Monitor, Smartphone, ShoppingCart, Laptop, ExternalLink, Globe } from 'lucide-react'
import ShaderBackground from '../components/ShaderBackground'
import SEO from '../components/SEO'

const products = [
  {
    icon: Monitor,
    title: 'Landing Simple',
    description: 'Una página de alto impacto con toda tu información esencial. Perfecta para presentar tu negocio, producto o servicio de forma clara y directa.',
    features: ['1 página de contenido', 'Botón a WhatsApp', 'Enlace a Instagram', 'Diseño responsive', 'Optimización básica SEO', 'Carga ultrarrápida'],
    price: '$100k - $300k ARS',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Laptop,
    title: 'Página Profesional',
    description: 'Sitio web completo para empresas y profesionales que buscan establecer una presencia online sólida y profesional con múltiples secciones.',
    features: ['Inicio + Servicios + Contacto', 'Galería de imágenes/trabajos', 'Animaciones y transiciones', 'Formulario de contacto', 'Integración redes sociales', 'SEO optimizado', 'Panel autoadministrable'],
    price: '$300k - $900k ARS',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: ShoppingCart,
    title: 'Tienda Online',
    description: 'E-commerce completo para vender tus productos online con pasarela de pagos, gestión de inventario y panel de administración intuitivo.',
    features: ['Catálogo de productos', 'Carrito de compras', 'Pasarela de pagos (MercadoPago, tarjetas)', 'Gestión de stock', 'Cálculo de envíos', 'Panel administrativo', 'Seguridad SSL', 'Seguimiento de pedidos'],
    price: '$800k - $3M+ ARS',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Smartphone,
    title: 'Sistema Personalizado',
    description: 'Plataforma web a medida con funcionalidades específicas para tu negocio. Ideal para gestionar turnos, usuarios, o procesos internos.',
    features: ['Panel de administración', 'Sistema de turnos/reservas', 'Login de usuarios', 'Base de datos personalizada', 'Reportes y estadísticas', 'Funcionalidades a medida', 'Soporte prioritario'],
    price: 'Desde $1M ARS',
    gradient: 'from-cyan-500 to-blue-500',
  },
]

// ── Agegar más proyectos acá ──────────────────────────────────────
const examples = [
  {
    id: 'ldr-automoviles',
    title: 'LDR Automóviles',
    category: 'Landing Simple',
    description: 'Concesionaria de autos usados con catálogo online, formulario de consulta WhatsApp y posicionamiento SEO local en Buenos Aires.',
    url: 'https://ldr-automoviles.vercel.app',
    displayUrl: 'ldr-automoviles.vercel.app',
    tags: ['Landing Page', 'Automotriz', 'SEO Local'],
    previewBg: 'from-slate-800 via-blue-900 to-slate-900',
    previewAccent: 'from-blue-500 to-indigo-600',
    icon: '🚗',
    isInternal: false,
  },
  {
    id: 'apex-fitness',
    title: 'Apex Fitness',
    category: 'Landing Profesional',
    description: 'Ejemplo de landing premium para gimnasio / marca fitness. Diseño oscuro, animaciones fluidas y secciones de precios, programas y testimonios.',
    url: '/demo/apex',
    displayUrl: 'demo / apex-fitness',
    tags: ['Demo', 'Fitness', 'Dark Mode'],
    previewBg: 'from-neutral-950 via-zinc-900 to-neutral-900',
    previewAccent: 'from-orange-500 to-red-600',
    icon: '🏋️',
    isInternal: true,
  },
]
// ─────────────────────────────────────────────────────────────────

function ExampleCard({ example, index }) {
  const handleClick = () => {
    if (example.isInternal) {
      window.open(example.url, '_blank')
    } else {
      window.open(example.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      {/* Browser Mockup */}
      <div className="bg-slate-100 dark:bg-slate-800">
        {/* Tab bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex-1 mx-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md px-3 py-1 flex items-center gap-1.5 min-w-0">
            <Globe className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
              {example.displayUrl}
            </span>
          </div>
        </div>

        {/* Preview area */}
        <div className={`relative h-52 bg-gradient-to-br ${example.previewBg} overflow-hidden`}>
          {/* Decorative grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          {/* Glow */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br ${example.previewAccent} rounded-full blur-[60px] opacity-30`} />

          {/* Center content */}
          <div className="relative h-full flex flex-col items-center justify-center gap-3 px-6">
            <span className="text-5xl">{example.icon}</span>
            <div className={`text-xl font-black text-transparent bg-clip-text bg-gradient-to-r ${example.previewAccent}`}>
              {example.title}
            </div>
            {/* Fake UI elements */}
            <div className="flex gap-2 mt-1 opacity-30">
              <div className="h-1.5 w-16 rounded-full bg-white" />
              <div className="h-1.5 w-10 rounded-full bg-white" />
              <div className="h-1.5 w-14 rounded-full bg-white" />
            </div>
            <div className="flex gap-2 opacity-20">
              <div className="h-1.5 w-10 rounded-full bg-white" />
              <div className="h-1.5 w-20 rounded-full bg-white" />
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-white text-sm font-semibold flex items-center gap-2">
              Ver proyecto <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-7">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {example.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {example.title}
        </h3>
        <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed mb-6">
          {example.description}
        </p>

        <button
          onClick={handleClick}
          className="group/btn inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:gap-3 transition-all duration-200"
        >
          Ver proyecto
          <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>
    </motion.div>
  )
}

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
        <p className="text-slate-600 dark:text-white/70 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${product.gradient}`} />
              <span className="text-slate-700 dark:text-white/80">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
          <span className="text-sm text-slate-500 dark:text-white/60">Inversión estimada</span>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{product.price}</p>
        </div>

        <Link
          to="/contacto"
          className="group inline-flex items-center space-x-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
        >
          <span>Consultar</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function Productos() {
  return (
    <div className="relative">
      <SEO
        title="Productos y Precios"
        description="Conocé los planes de Kailex: Landing Simple, Página Profesional, Tienda Online y Sistemas Personalizados. Precios en pesos argentinos."
        path="/productos"
      />
      <ShaderBackground variant="gradient" />
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">

        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Productos que{' '}
              <span className="gradient-text">impulsan</span> tu negocio
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
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

      {/* ── EJEMPLOS ── */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Proyectos reales
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
              Resultados que{' '}
              <span className="gradient-text">hablan solos</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Cada proyecto es una prueba de lo que podemos hacer juntos.
              Desde negocios locales hasta demos de alta gama.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {examples.map((example, index) => (
              <ExampleCard key={example.id} example={example} index={index} />
            ))}
          </div>

          {/* CTA inline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-white/40 text-sm">
              ¿Querés que tu proyecto aparezca acá?{' '}
              <Link to="/contacto" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Hablemos →
              </Link>
            </p>
          </motion.div>
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
