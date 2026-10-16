import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import SEO from '../components/SEO'
import WaIcon from '../components/WaIcon'
import IgIcon from '../components/IgIcon'
import { reveal } from '../components/Showcase'
import { CONTACT_EMAIL, INSTAGRAM, WHATSAPP_DISPLAY, igLink, waLink } from '../config'

const NEEDS = ['Landing USD 35', 'Web profesional', 'Tienda online', 'Sistema a medida', 'Todavía no sé']

const CHANNELS = [
  { icon: WaIcon, label: 'WhatsApp', value: WHATSAPP_DISPLAY, href: waLink(), note: 'La vía más rápida' },
  { icon: IgIcon, label: 'Instagram', value: `@${INSTAGRAM}`, href: igLink, note: 'Mirá trabajos y escribinos' },
  { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, note: 'Para propuestas largas' },
]

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', negocio: '', necesidad: NEEDS[0], mensaje: '' })
  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const text = [
      `Hola Kailex! Soy ${form.nombre}.`,
      form.negocio && `Mi negocio: ${form.negocio}.`,
      `Me interesa: ${form.necesidad}.`,
      form.mensaje,
    ].filter(Boolean).join('\n')
    window.open(waLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative">
      <SEO
        title="Contacto"
        description="Escribinos por WhatsApp y en 24 horas tenés tu web. Kailex, estudio web para negocios de toda Latinoamérica."
        path="/contacto"
      />

      <section className="pt-40 pb-32 relative overflow-x-clip">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container-custom relative grid lg:grid-cols-12 gap-14">
          <motion.div {...reveal()} className="lg:col-span-5">
            <p className="eyebrow">Contacto</p>
            <h1 className="display-sm mt-5">
              Contanos de
              <br />
              <span className="text-grad">tu negocio.</span>
            </h1>
            <p className="lead mt-6 max-w-md">Completá esto y se abre WhatsApp con el mensaje listo. Te respondemos ahí.</p>

            <ul className="mt-12 space-y-3">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="channel group">
                    <span className="channel-icon"><c.icon className="w-5 h-5" /></span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold text-bone truncate">{c.value}</span>
                      <span className="block text-sm text-mist">{c.note}</span>
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-mist transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form {...reveal(0.1)} onSubmit={onSubmit} className="lg:col-span-7 form-card">
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="field">
                <span>Tu nombre</span>
                <input name="nombre" required value={form.nombre} onChange={set} placeholder="Cómo te llamás" autoComplete="name" />
              </label>
              <label className="field">
                <span>Tu negocio</span>
                <input name="negocio" value={form.negocio} onChange={set} placeholder="Ej: barbería en Rosario" />
              </label>
            </div>

            <fieldset className="mt-7">
              <legend className="field-legend">¿Qué necesitás?</legend>
              <div className="flex flex-wrap gap-2 mt-3">
                {NEEDS.map((n) => (
                  <label key={n} className={`chip ${form.necesidad === n ? 'chip-on' : ''}`}>
                    <input type="radio" name="necesidad" value={n} checked={form.necesidad === n} onChange={set} className="sr-only" />
                    {n}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="field mt-7">
              <span>Contanos un poco más (opcional)</span>
              <textarea name="mensaje" rows={5} value={form.mensaje} onChange={set} placeholder="Qué hacés, qué querés mostrar, si ya tenés dominio…" />
            </label>

            <button type="submit" className="btn-wa w-full mt-8">
              <WaIcon className="w-5 h-5" /> Enviar por WhatsApp
            </button>
            <p className="mono text-mist text-center mt-4">Se abre WhatsApp con tu mensaje. No guardamos tus datos.</p>
          </motion.form>
        </div>
      </section>
    </div>
  )
}
