import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SEO from '../components/SEO'
import { reveal, WaButton, TiltCard, WORK, WorkCard } from '../components/Showcase'

const PLANS = [
  {
    name: 'Landing',
    price: 'USD 35',
    note: 'Pago único · lista en 24 hs',
    text: 'Una página completa para presentar tu negocio y que te escriban directo al WhatsApp.',
    features: ['Diseño a medida de tu rubro', 'Adaptada a celular', 'Botón directo a WhatsApp', 'Servicios, precios, horarios y ubicación', 'Links a tus redes', 'Optimizada para Google'],
    featured: true,
    msg: 'Hola Kailex! Quiero la Landing de USD 35',
  },
  {
    name: 'Web profesional',
    price: 'USD 45',
    note: 'Pago único · varias secciones',
    text: 'Para negocios que necesitan más espacio: servicios en detalle, galería de trabajos y formulario.',
    features: ['Varias páginas o secciones', 'Galería de trabajos', 'Formulario de contacto', 'Animaciones a medida', 'Integración con redes'],
    msg: 'Hola Kailex! Quiero la Web profesional de USD 45',
  },
  {
    name: 'Tienda online',
    price: 'USD 40',
    extra: '+ USD 30 al año',
    note: 'Vendé por internet',
    text: 'Catálogo de productos con carrito y pagos online, para vender sin depender de las redes.',
    features: ['Catálogo de productos', 'Carrito de compras', 'Pagos online', 'Gestión de stock', 'Panel para cargar productos'],
    msg: 'Hola Kailex! Quiero la Tienda online de USD 40',
  },
  {
    name: 'Sistema a medida',
    price: 'A cotizar',
    note: 'Turnos, usuarios, gestión',
    text: 'Una plataforma pensada para cómo trabaja tu negocio: reservas, clientes o procesos internos.',
    features: ['Turnos y reservas', 'Login de usuarios', 'Panel de administración', 'Reportes', 'Funciones a medida'],
    msg: 'Hola Kailex! Quiero cotizar un sistema a medida',
  },
]

function PlanCard({ p, i }) {
  return (
    <motion.article {...reveal(i * 0.08)} className="h-full">
      <TiltCard className="h-full">
        <div className={`plan ${p.featured ? 'plan-featured' : ''}`}>
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">{p.name}</h2>
            {p.featured ? <span className="plan-tag mono">Más pedido</span> : null}
          </div>
          <p className={`mt-6 font-display font-extrabold tracking-tight ${p.featured ? 'text-5xl text-grad' : 'text-3xl'}`}>{p.price}</p>
          {p.extra ? <p className="text-lg font-bold text-bone mt-1">{p.extra}</p> : null}
          <p className="mono text-mist mt-2">{p.note}</p>
          <p className="text-mist mt-6 leading-relaxed">{p.text}</p>
          <ul className="mt-6 space-y-3 flex-1">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-bone/90">
                <span className="check"><Check className="w-3.5 h-3.5" strokeWidth={3} /></span>
                {f}
              </li>
            ))}
          </ul>
          <p className="plan-domain mono">+ Dominio (.com) aparte · anual · aprox. USD 17</p>
          <WaButton text={p.msg} className={`mt-8 ${p.featured ? '' : 'btn-wa-quiet'}`}>
            {p.featured ? 'La quiero' : 'Consultar'}
          </WaButton>
        </div>
      </TiltCard>
    </motion.article>
  )
}

export default function Productos() {
  return (
    <div className="relative">
      <SEO
        title="Planes y precios"
        description="Landing para tu negocio a USD 35, pago único y lista en 24 horas. También webs profesionales, tiendas online y sistemas a medida."
        path="/productos"
      />

      <section className="pt-40 pb-16 relative overflow-x-clip">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container-custom relative">
          <motion.div {...reveal()} className="max-w-3xl">
            <p className="eyebrow">Planes</p>
            <h1 className="display-sm mt-5">
              Empezá con <span className="text-grad">USD 35.</span>
              <br />
              Crecé cuando quieras.
            </h1>
            <p className="lead mt-6 max-w-xl">
              La landing sale en 24 horas y es tuya para siempre. Si después necesitás tienda, turnos o algo más grande, lo armamos sobre lo que ya tenés.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PLANS.map((p, i) => (
            <PlanCard key={p.name} p={p} i={i} />
          ))}
        </div>
        <p className="container-custom mono text-mist mt-8">En todos los planes el dominio (tunegocio.com) se paga aparte: es anual, sale aprox. USD 17 y queda a tu nombre.</p>
      </section>

      <section className="section border-t border-line">
        <div className="container-custom">
          <motion.div {...reveal()} className="max-w-2xl">
            <p className="eyebrow">Ejemplos</p>
            <h2 className="h2 mt-5">Así quedan.</h2>
          </motion.div>
          <div className="mt-16 grid lg:grid-cols-2 gap-16 lg:gap-10">
            {WORK.map((w, i) => (
              <WorkCard key={w.name} w={w} i={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
