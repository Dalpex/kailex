import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { reveal, WaButton } from '../components/Showcase'

const BELIEFS = [
  { title: 'Rápido de verdad', text: 'Un negocio chico no puede esperar semanas. Una landing sale en 24 horas.' },
  { title: 'Precio claro', text: 'USD 35, pago único. Sin mensualidades ni sorpresas. Lo grande se cotiza antes de arrancar.' },
  { title: 'Tuyo de verdad', text: 'El dominio se registra a tu nombre. La web es tuya.' },
  { title: 'Hecho para vender', text: 'Todo está pensado para que el cliente te encuentre y te escriba al WhatsApp.' },
]

export default function SobreNosotros() {
  return (
    <div className="relative">
      <SEO
        title="Nosotros"
        description="Kailex es un estudio web de Buenos Aires que hace páginas para negocios de toda Latinoamérica, en 24 horas y a un precio justo."
        path="/sobre-nosotros"
      />

      <section className="pt-40 pb-20 relative overflow-x-clip">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container-custom relative grid lg:grid-cols-12 gap-12 items-end">
          <motion.div {...reveal()} className="lg:col-span-7">
            <p className="eyebrow">Nosotros</p>
            <h1 className="display-sm mt-5">
              Webs para negocios
              <br />
              <span className="text-grad">de verdad.</span>
            </h1>
          </motion.div>
          <motion.p {...reveal(0.1)} className="lead lg:col-span-5">
            Kailex es un estudio web de Buenos Aires. Creemos que tener una buena página no debería ser un lujo: la barbería, el restaurante o el estudio de uñas de la esquina merecen una web tan buena como la de una marca grande.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          <ol className="grid md:grid-cols-2 gap-px bg-line rounded-3xl overflow-hidden border border-line">
            {BELIEFS.map((b, i) => (
              <motion.li key={b.title} {...reveal((i % 2) * 0.1)} className="step">
                <h2 className="text-2xl font-bold tracking-tight">{b.title}</h2>
                <p className="text-mist mt-3 leading-relaxed max-w-md">{b.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-custom">
          <div className="cta-panel text-center">
            <div className="cta-orb" aria-hidden="true" />
            <div className="relative">
              <h2 className="h2">Contanos de tu negocio.</h2>
              <p className="lead mt-5 mx-auto max-w-md">Trabajamos con negocios de toda Latinoamérica, todo por WhatsApp.</p>
              <WaButton text="Hola Kailex! Quiero mi web" className="mt-9">Escribinos</WaButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
