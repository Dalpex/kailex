import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Globe, LayoutTemplate, PenTool, RefreshCw, Search, ShoppingBag } from 'lucide-react'
import SEO from '../components/SEO'
import { reveal, WaButton, TiltCard } from '../components/Showcase'

const SERVICES = [
  { icon: LayoutTemplate, title: 'Landing para tu negocio', text: 'Una página completa con todo lo que tu cliente necesita saber y un botón directo a tu WhatsApp. USD 35, lista en 24 horas.' },
  { icon: PenTool, title: 'Diseño a medida', text: 'Cada web se diseña para su rubro: colores, fotos y textos que se sienten como tu negocio, no como una plantilla.' },
  { icon: ShoppingBag, title: 'Tiendas y sistemas', text: 'Catálogos con carrito, pagos online, turnos o paneles para tu equipo. Lo cotizamos según lo que necesites.' },
  { icon: Search, title: 'Aparecer en Google', text: 'Cada web sale preparada para buscadores: títulos, descripciones, velocidad y datos de tu negocio.' },
  { icon: Globe, title: 'Dominio y publicación', text: 'Te ayudamos a registrar tunegocio.com a tu nombre y dejamos la web online.' },
  { icon: RefreshCw, title: 'Rediseño', text: '¿Ya tenés web pero quedó vieja? La renovamos para que se vea bien en el celular y te traiga consultas.' },
]

export default function Servicios() {
  return (
    <div className="relative">
      <SEO
        title="Servicios"
        description="Landing en 24 horas por USD 35, diseño a medida, tiendas online, sistemas, dominio y rediseño de webs para negocios."
        path="/servicios"
      />

      <section className="pt-40 pb-16 relative overflow-x-clip">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container-custom relative">
          <motion.div {...reveal()} className="max-w-3xl">
            <p className="eyebrow">Servicios</p>
            <h1 className="display-sm mt-5">
              Todo lo que tu negocio
              <br />
              <span className="text-grad">necesita online.</span>
            </h1>
            <p className="lead mt-6 max-w-xl">Desde una landing en un día hasta una tienda completa. Siempre con un precio claro antes de arrancar.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.article key={s.title} {...reveal((i % 3) * 0.08)} className="h-full">
              <TiltCard className="h-full">
                <div className="plan">
                  <span className="channel-icon" style={{ transform: 'translateZ(30px)' }}><s.icon className="w-5 h-5" /></span>
                  <h2 className="text-2xl font-bold tracking-tight mt-8">{s.title}</h2>
                  <p className="text-mist mt-3 leading-relaxed">{s.text}</p>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="pb-32">
        <div className="container-custom">
          <div className="cta-panel text-center">
            <div className="cta-orb" aria-hidden="true" />
            <div className="relative">
              <h2 className="h2">¿Arrancamos con la tuya?</h2>
              <p className="lead mt-5 mx-auto max-w-md">Escribinos y mañana tenés tu web.</p>
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                <WaButton text="Hola Kailex! Quiero mi web">Pedir mi web</WaButton>
                <Link to="/productos" className="link-arrow">Ver planes <ArrowUpRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
