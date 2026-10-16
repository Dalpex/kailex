import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import IgIcon from '../components/IgIcon'
import SEO from '../components/SEO'
import WaIcon from '../components/WaIcon'
import { EASE, reveal, WaButton, TiltCard, WORK, WorkCard, Accordion } from '../components/Showcase'
import { WHATSAPP_DISPLAY, INSTAGRAM, igLink, waLink } from '../config'

const PhoneScene = lazy(() => import('../components/three/PhoneScene'))

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container-custom relative grid lg:grid-cols-12 gap-6 lg:gap-0 items-center min-h-[calc(100svh-5rem)] pt-6 lg:pt-0">
        <div className="lg:col-span-7 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="eyebrow"
          >
            <span className="live-dot" /> Estudio web · Buenos Aires → toda Latinoamérica
          </motion.p>

          <h1 className="display mt-6">
            {['Tu página web,', 'lista en'].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: '0.5em', filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: EASE }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              className="block text-grad"
              initial={{ opacity: 0, y: '0.5em', filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            >
              24 horas.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="lead mt-7 max-w-xl"
          >
            Diseñamos la web de tu negocio para que te encuentren, te elijan y te escriban.{' '}
            <strong className="text-bone font-semibold">USD 35, pago único.</strong> Sin mensualidades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
            <WaButton>Pedir mi web por WhatsApp</WaButton>
            <a href="#trabajos" className="btn-ghost">
              Ver trabajos <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 mono text-mist"
          >
            <li>Pago único</li>
            <li aria-hidden="true">/</li>
            <li>Dominio a tu nombre</li>
            <li aria-hidden="true">/</li>
            <li>Botón a tu WhatsApp</li>
          </motion.ul>
        </div>

        <div className="lg:col-span-5 relative h-[480px] sm:h-[560px] lg:h-[760px] -mx-4 lg:-ml-24 lg:-mr-24">
          <Suspense fallback={<div className="absolute inset-0 phone-fallback" />}>
            <PhoneScene />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Rubros strip ───────────────────────── */

const RUBROS = ['Barberías', 'Restaurantes', 'Estética y uñas', 'Gimnasios', 'Cafeterías', 'Veterinarias', 'Talleres', 'Inmobiliarias', 'Consultorios', 'Tiendas', 'Profesionales', 'Emprendimientos']

function Rubros() {
  return (
    <section className="border-y border-line py-6 overflow-hidden" aria-label="Rubros con los que trabajamos">
      <div className="marquee">
        {[0, 1].map((k) => (
          <ul key={k} className="marquee-track" aria-hidden={k === 1}>
            {RUBROS.map((r) => (
              <li key={r} className="flex items-center gap-8">
                <span className="text-2xl md:text-3xl font-semibold tracking-tight text-bone/80">{r}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-grad" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}

/* ───────────────────────── Price ───────────────────────── */

const INCLUDED = [
  'Diseño a medida de tu negocio',
  'Adaptada a celular, tablet y compu',
  'Botón directo a tu WhatsApp',
  'Servicios, precios, horarios y ubicación',
  'Links a tus redes',
  'Optimizada para aparecer en Google',
]

function Price() {
  return (
    <section id="precio" className="section">
      <div className="container-custom grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div {...reveal()} className="lg:col-span-5">
          <p className="eyebrow">Precio</p>
          <h2 className="h2 mt-5">
            Un precio.
            <br />
            <span className="text-mist">Sin letra chica.</span>
          </h2>
          <p className="lead mt-6 max-w-md">
            Pagás una vez y la web es tuya. Lo único aparte es el dominio (tunegocio.com), que lo registrás a tu nombre.
          </p>
          <Link to="/productos" className="link-arrow mt-8">
            ¿Necesitás tienda online, turnos o algo a medida? Lo cotizamos <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div {...reveal(0.1)} className="lg:col-span-7">
          <TiltCard>
            <div className="ticket">
              <div className="ticket-top">
                <div>
                  <p className="mono text-mist">Página web · pago único</p>
                  <p className="price mt-3">
                    <span className="price-cur">USD</span>
                    <span className="text-grad">35</span>
                  </p>
                </div>
                <div className="ticket-badge" style={{ transform: 'translateZ(40px)' }}>
                  <span className="mono">Entrega</span>
                  <span className="text-3xl font-extrabold tracking-tight">24 hs</span>
                </div>
              </div>
              <div className="ticket-cut" aria-hidden="true" />
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 p-8 md:p-10 pt-8">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-bone/90">
                    <span className="check"><Check className="w-3.5 h-3.5" strokeWidth={3} /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="px-8 md:px-10 pb-8 md:pb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <p className="mono text-mist">+ dominio propio · aprox. USD 20 al año</p>
                <WaButton text="Hola Kailex! Quiero mi web de USD 35">La quiero</WaButton>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────────────────── Process ───────────────────────── */

const STEPS = [
  { at: 'Hoy', title: 'Nos escribís', text: 'Por WhatsApp. Nos contás de tu negocio y nos mandás logo, fotos y lo que quieras mostrar.' },
  { at: '24 hs', title: 'Te mostramos tu web', text: 'Te pasamos el link para que la veas en tu celu. Si querés ajustar algo, lo ajustamos.' },
  { at: 'Online', title: 'Sale al mundo', text: 'La publicamos con tu dominio y empieza a traerte clientes directo a tu WhatsApp.' },
]

function Process() {
  return (
    <section className="section">
      <div className="container-custom">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="eyebrow">Cómo funciona</p>
          <h2 className="h2 mt-5">De un mensaje a tu web online.</h2>
        </motion.div>

        <ol className="mt-16 grid md:grid-cols-3 gap-px bg-line rounded-3xl overflow-hidden border border-line">
          {STEPS.map((s, i) => (
            <motion.li key={s.title} {...reveal(i * 0.12)} className="step">
              <div className="flex items-center justify-between">
                <span className="mono text-mist">Paso {i + 1}</span>
                <span className="step-at">{s.at}</span>
              </div>
              <div className="step-track" aria-hidden="true">
                <motion.span
                  className="step-fill"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.35, ease: EASE }}
                />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mt-8">{s.title}</h3>
              <p className="text-mist mt-3 leading-relaxed">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────────────────── Work ───────────────────────── */

function Work() {
  return (
    <section id="trabajos" className="section scroll-mt-24">
      <div className="container-custom">
        <motion.div {...reveal()} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Trabajos</p>
            <h2 className="h2 mt-5">Negocios reales,<br />webs reales.</h2>
          </div>
          <p className="lead max-w-sm">Cada web se diseña para su rubro. Ninguna plantilla, ninguna igual a otra.</p>
        </motion.div>
        <div className="mt-16 grid lg:grid-cols-2 gap-16 lg:gap-10">
          {WORK.map((w, i) => (
            <WorkCard key={w.name} w={w} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── FAQ ───────────────────────── */

const FAQS = [
  { q: '¿Qué incluye la web de USD 35?', a: 'Una página completa para tu negocio: quiénes son, qué ofrecés, precios, horarios, ubicación, fotos, tus redes y un botón directo a tu WhatsApp. Adaptada a celular y lista para aparecer en Google.' },
  { q: '¿Hay que pagar todos los meses?', a: 'No. Es un solo pago. Lo único que se renueva es el dominio (tunegocio.com), que sale aprox. USD 20 al año y queda registrado a tu nombre.' },
  { q: '¿De verdad está en 24 horas?', a: 'Sí, una web simple está lista en un día desde que tenemos tu información (logo, fotos y textos). Si no tenés textos, te ayudamos a armarlos.' },
  { q: '¿Trabajan con negocios de otros países?', a: 'Sí. Todo se hace online por WhatsApp, así que no importa dónde estés.' },
  { q: '¿Y si necesito algo más grande?', a: 'Hacemos tiendas online, sistemas de turnos y proyectos a medida. Escribinos y lo cotizamos según lo que necesites.' },
]

function Faq() {
  return (
    <section className="section">
      <div className="container-custom grid lg:grid-cols-12 gap-12">
        <motion.div {...reveal()} className="lg:col-span-4">
          <p className="eyebrow">Preguntas</p>
          <h2 className="h2 mt-5">Lo que siempre nos preguntan.</h2>
          <Link to="/faq" className="link-arrow mt-8">Ver todas <ArrowUpRight className="w-4 h-4" /></Link>
        </motion.div>
        <Accordion items={FAQS} className="lg:col-span-8" />
      </div>
    </section>
  )
}

/* ───────────────────────── Final CTA ───────────────────────── */

function FinalCta() {
  return (
    <section className="section pb-32">
      <div className="container-custom">
        <motion.div {...reveal()} className="cta-panel">
          <div className="cta-orb" aria-hidden="true" />
          <p className="eyebrow justify-center">Arrancamos hoy</p>
          <h2 className="display-sm mt-6">
            Escribinos hoy.
            <br />
            <span className="text-grad">Mañana tenés tu web.</span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <WaButton className="text-lg px-8 py-5">{WHATSAPP_DISPLAY}</WaButton>
            <a href={igLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <IgIcon className="w-4 h-4" /> @{INSTAGRAM}
            </a>
          </div>
          <p className="mono text-mist mt-6">Escribí «WEB» y te mostramos ejemplos</p>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <SEO
        title="Tu página web en 24 horas"
        description="Kailex diseña la página web de tu negocio en 24 horas. USD 35, pago único, sin mensualidades. Adaptada a celular y con botón directo a tu WhatsApp."
        path="/"
      />
      <Hero />
      <Rubros />
      <Price />
      <Process />
      <Work />
      <Faq />
      <FinalCta />
    </>
  )
}
