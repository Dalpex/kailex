import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { reveal, WaButton, Accordion } from '../components/Showcase'

const GROUPS = [
  {
    title: 'Precio',
    items: [
      { q: '¿Cuánto cuesta una web?', a: 'La landing para tu negocio sale USD 35, pago único. Webs con varias secciones, tiendas online y sistemas a medida se cotizan según lo que necesites.' },
      { q: '¿Hay que pagar todos los meses?', a: 'No. Pagás una vez y la web es tuya. Lo único que se renueva es el dominio (tunegocio.com), aprox. USD 20 al año, registrado a tu nombre.' },
      { q: '¿Cómo pago?', a: 'Te pasamos las opciones de pago por WhatsApp según tu país.' },
    ],
  },
  {
    title: 'Tiempos y proceso',
    items: [
      { q: '¿De verdad está en 24 horas?', a: 'Sí. Una landing está lista en un día desde que tenemos tu información: logo, fotos y textos. Si no tenés textos, te ayudamos a armarlos.' },
      { q: '¿Cómo es el proceso?', a: 'Nos escribís por WhatsApp y nos contás de tu negocio. En 24 horas te mandamos el link para que la veas en tu celu. Ajustamos lo que quieras y la publicamos con tu dominio.' },
      { q: '¿Qué tengo que mandar?', a: 'Lo que tengas: logo, fotos de tu negocio o tus trabajos, servicios, precios, horarios, dirección y redes. Con eso arrancamos.' },
      { q: '¿Puedo pedir cambios?', a: 'Sí. Antes de publicarla la revisás y ajustamos lo que haga falta.' },
    ],
  },
  {
    title: 'Tu web',
    items: [
      { q: '¿Se ve bien en el celular?', a: 'Sí. Cada web se diseña primero para celular, que es desde donde te va a encontrar la mayoría de tus clientes.' },
      { q: '¿El dominio queda a mi nombre?', a: 'Sí. El dominio se registra a tu nombre, así que es tuyo.' },
      { q: '¿Y si después necesito cambiar algo?', a: 'Escribinos. Los cambios puntuales después de publicada se cotizan según lo que sean.' },
      { q: '¿Trabajan con negocios de otros países?', a: 'Sí. Todo se hace online por WhatsApp, así que no importa dónde estés.' },
    ],
  },
]

export default function FAQ() {
  return (
    <div className="relative">
      <SEO
        title="Preguntas frecuentes"
        description="Todo sobre tu web con Kailex: USD 35 pago único, lista en 24 horas, dominio a tu nombre y botón directo a WhatsApp."
        path="/faq"
      />

      <section className="pt-40 pb-12 relative overflow-x-clip">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container-custom relative">
          <motion.div {...reveal()} className="max-w-3xl">
            <p className="eyebrow">Preguntas</p>
            <h1 className="display-sm mt-5">Todo lo que querés saber.</h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom space-y-20">
          {GROUPS.map((g, i) => (
            <motion.div key={g.title} {...reveal(i * 0.05)} className="grid lg:grid-cols-12 gap-8">
              <h2 className="lg:col-span-4 mono text-mist pt-6">{g.title}</h2>
              <Accordion items={g.items} className="lg:col-span-8" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-32">
        <div className="container-custom">
          <div className="cta-panel text-center">
            <div className="cta-orb" aria-hidden="true" />
            <div className="relative">
              <h2 className="h2">¿Te quedó alguna duda?</h2>
              <p className="lead mt-5 mx-auto max-w-md">Escribinos y te respondemos por WhatsApp.</p>
              <WaButton text="Hola Kailex! Tengo una consulta" className="mt-9">Preguntar por WhatsApp</WaButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
