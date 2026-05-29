import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import ShaderBackground from '../components/ShaderBackground'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: '¿Qué es Kailex?',
        a: 'Kailex es un estudio de desarrollo web especializado en crear experiencias digitales premium para negocios, emprendedores y marcas personales. Nos enfocamos en diseño excepcional, código limpio y resultados medibles.'
      },
      {
        q: '¿Dónde están ubicados?',
        a: 'Nuestra base está en Buenos Aires, Argentina, pero trabajamos con clientes de todo el mundo de forma remota. Esto nos permite ofrecer servicios de calidad global con horarios flexibles.'
      },
      {
        q: '¿Trabajan con clientes internacionales?',
        a: 'Sí, absolutamente. Tenemos clientes en Argentina, Uruguay, Chile, España y Estados Unidos. Todas nuestras comunicaciones y reuniones pueden ser en español o inglés, y aceptamos pagos en múltiples monedas.'
      },
    ]
  },
  {
    category: 'Servicios',
    questions: [
      {
        q: '¿Qué tipos de proyectos desarrollan?',
        a: 'Desarrollamos landing pages, sitios web corporativos, e-commerce, aplicaciones web a medida, y ofrecemos servicios de diseño UI/UX, SEO y mantenimiento. Si tenés una idea diferente, ¡hablemos! Nos encantan los desafíos.'
      },
      {
        q: '¿Trabajan con rediseños de sitios existentes?',
        a: 'Sí. Podemos desde renovar completamente un sitio existente hasta hacer mejoras puntuales. Primero evaluamos tu sitio actual y te proponemos las mejores opciones según tus objetivos y presupuesto.'
      },
      {
        q: '¿Ofrecen servicios de mantenimiento?',
        a: 'Sí. Ofrecemos planes de mantenimiento que incluyen actualizaciones de seguridad, backups automáticos, monitoreo 24/7 y soporte prioritario. Queremos que te despreocupes después del lanzamiento.'
      },
    ]
  },
  {
    category: 'Precios',
    questions: [
      {
        q: '¿Cuáles son sus precios?',
        a: 'Tenemos opciones para cada necesidad: Landing simple (1 página, info, WhatsApp, Instagram): $100k - $300k ARS | Página profesional chica (inicio, servicios, contacto, galería, animaciones): $300k - $900k ARS | Tienda online / ecommerce: $800k - $3M+ ARS | Sistemas personalizados (turnos, panel admin, login, etc): desde $1M para arriba. Cada proyecto es único, así que la mejor forma de obtener un presupuesto preciso es contactarnos.'
      },
      {
        q: '¿Qué formas de pago aceptan?',
        a: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito, PayPal, y efectivo. Para proyectos en Argentina, también trabajamos en pesos mediante transferencia bancaria.'
      },
      {
        q: '¿Piden un adelanto?',
        a: 'Sí. Solicitamos el 10% al inicio del proyecto y el 90% restante antes del lanzamiento final. Para proyectos más grandes, podemos estructurar pagos en hitos.'
      },
    ]
  },
  {
    category: 'Proceso',
    questions: [
      {
        q: '¿Cómo es el proceso de trabajo?',
        a: 'Nuestro proceso tiene 4 etapas: 1) Descubrimiento - entendemos tu negocio y objetivos, 2) Diseño - creamos y validamos prototipos, 3) Desarrollo - construimos tu sitio, 4) Lanzamiento - desplegamos y optimizamos. Te mantenemos informado en cada paso.'
      },
      {
        q: '¿Cuánto tiempo lleva un proyecto?',
        a: 'Somos rápidos. Una landing page está lista en 2-3 días hábiles. Un sitio web completo toma 5-7 días hábiles. E-commerce y aplicaciones web pueden tomar 7-12 días hábiles. Siempre damos timelines realistas desde el inicio.'
      },
      {
        q: '¿Qué necesito proporcionar?',
        a: 'Idealmente: información sobre tu negocio, contenido (textos, imágenes), referencias de diseño que te gusten, y acceso a dominios/hosting si ya los tenés. Si no tenés contenido, podemos ayudarte a crearlo.'
      },
      {
        q: '¿Puedo hacer cambios durante el desarrollo?',
        a: 'Sí. Incluimos rondas de revisiones en cada etapa. Cambios menores durante el desarrollo están incluidos. Cambios mayores que alteren el alcance pueden requerir ajuste de presupuesto y timeline, pero siempre lo conversamos antes.'
      },
    ]
  },
  {
    category: 'Post-Lanzamiento',
    questions: [
      {
        q: '¿El sitio será autoadministrable?',
        a: 'Sí. Entregamos sitios que podés gestionar fácilmente. Te damos acceso al CMS, capacitación para que puedas editar contenido, y documentación completa. También ofrecemos soporte si preferís que hagamos los cambios.'
      },
      {
        q: '¿Incluyen hosting y dominio?',
        a: 'Podemos ocuparnos de todo por vos o guiarte para que lo contrates directamente. Ofrecemos hosting optimizado como servicio adicional. El dominio puede registrarse a tu nombre para que seas el dueño absoluto.'
      },
      {
        q: '¿Qué pasa si necesito cambios después del lanzamiento?',
        a: 'Ofrecemos 30 días de soporte post-lanzamiento incluidos para ajustes menores. Después, tenés nuestros planes de mantenimiento o podés solicitarnos cambios puntuales con presupuesto a medida.'
      },
      {
        q: '¿Garantizan el funcionamiento del sitio?',
        a: 'Sí. Todos nuestros sitios vienen con garantía de funcionamiento. Si algo falla por nuestra causa, lo solucionamos sin costo. Además, hacemos backups diarios y monitoreo constante.'
      },
    ]
  },
]

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-medium text-slate-900 dark:text-white pr-8">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="relative">
      <ShaderBackground variant="gradient" />
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 -z-10" />

        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-50 dark:bg-purple-950/30 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Preguntas frecuentes
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              ¿Tenés dudas?
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Respondemos las preguntas más comunes sobre nuestros servicios,
              precios y proceso de trabajo.
            </p>
          </motion.div>

          {/* FAQ Grid */}
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const index = `${categoryIndex}-${faqIndex}`
                    return (
                      <FAQItem
                        key={faq.q}
                        question={faq.q}
                        answer={faq.a}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                      />
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                ¿No encontraste tu respuesta?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Estamos acá para ayudarte. Contactanos y te responderemos lo antes posible.
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-xl"
              >
                <span>Contactar ahora</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
