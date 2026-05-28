import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, MessageCircle } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'

const WHATSAPP_NUMBER = '5491169605924'
const CONTACT_EMAIL = 'dalpex@kailex.site'

const contactInfo = [
  { icon: Mail, title: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Phone, title: 'WhatsApp', value: '+54 11 6960 5924', href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { icon: MapPin, title: 'Ubicación', value: 'Buenos Aires, Argentina', href: null },
  { icon: Clock, title: 'Horario', value: 'Lun - Vie, 9:00 - 18:00', href: null },
]

const formFields = [
  { name: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
  { name: 'telefono', label: 'Teléfono (opcional)', type: 'tel', placeholder: '+54 11 ...' },
  { name: 'servicio', label: 'Servicio de interés', type: 'select', options: ['Landing Page', 'Sitio Web', 'E-commerce', 'Aplicación Web', 'Diseño UI/UX', 'Otro'] },
  { name: 'presupuesto', label: 'Presupuesto estimado', type: 'select', options: ['$300 - $600', '$600 - $1000', '$1000 - $2000', '$2000+', 'No estoy seguro'] },
  { name: 'mensaje', label: 'Mensaje', type: 'textarea', placeholder: 'Contanos sobre tu proyecto...', rows: 5 },
]

export default function Contacto() {
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Construir mensaje para WhatsApp
    const mensaje = `*Nuevo mensaje desde Kailex*%0A%0A` +
      `*Nombre:* ${formData.nombre || ''}%0A` +
      `*Email:* ${formData.email || ''}%0A` +
      `*Teléfono:* ${formData.telefono || 'No especificado'}%0A` +
      `*Servicio:* ${formData.servicio || ''}%0A` +
      `*Presupuesto:* ${formData.presupuesto || ''}%0A%0A` +
      `*Mensaje:*%0A${formData.mensaje || ''}`

    // Abrir WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank')

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="relative">
      <AnimatedBackground variant="dark" />
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 -z-10" />

        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              Hablemos de tu{' '}
              <span className="gradient-text">proyecto</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              ¿Tenés una idea en mente? Completá el formulario y te responderemos
              en menos de 24 horas con un presupuesto personalizado.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{item.title}</div>
                    {item.href ? (
                      <a href={item.href} className="text-slate-900 dark:text-white font-medium hover:text-indigo-500 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-slate-900 dark:text-white font-medium">{item.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Disponibilidad</span>
                </div>
                <p className="text-white/80 text-sm">
                  Actualmente estamos aceptando nuevos proyectos. Tiempos de entrega: 2-7 días hábiles.
                </p>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8"
              >
                {isSubmitted ? (
                  <div className="text-center py-16">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      ¡Redirigiendo a WhatsApp!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      Tu mensaje se está enviando directamente por WhatsApp.
                    </p>
                    <div className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl">
                      <MessageCircle className="w-5 h-5 text-indigo-500" />
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                        Si no se abrió WhatsApp, <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="underline hover:text-indigo-700">hacé click acá</a>
                      </span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {formFields.slice(0, 3).map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {formFields.slice(3, 5).map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {field.label}
                          </label>
                          <select
                            name={field.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                          >
                            <option value="">Seleccionar opción</option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {formFields[5].label}
                      </label>
                      <textarea
                        name="mensaje"
                        placeholder={formFields[5].placeholder}
                        rows={formFields[5].rows}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-gradient flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <span>Enviando...</span>
                      ) : (
                        <>
                          <span>Enviar mensaje</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800">
          {/* Placeholder para mapa */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
