import { Link } from 'react-router-dom'
import logo from '../../logokailexdark-v3.png'
import WaIcon from './WaIcon'
import IgIcon from './IgIcon'
import { CONTACT_EMAIL, INSTAGRAM, WHATSAPP_DISPLAY, igLink, waLink } from '../config'

const pages = [
  { label: 'Inicio', path: '/' },
  { label: 'Productos', path: '/productos' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Nosotros', path: '/sobre-nosotros' },
  { label: 'Preguntas', path: '/faq' },
  { label: 'Contacto', path: '/contacto' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-line overflow-hidden">
      <div className="container-custom pt-20 pb-10">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <img draggable={false} src={logo} alt="Kailex" className="h-9 w-auto" />
            <p className="text-mist mt-6 max-w-sm leading-relaxed">
              Páginas web para negocios que quieren que los encuentren, los elijan y les escriban. Desde Buenos Aires para toda Latinoamérica.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Páginas">
            <p className="mono text-mist mb-5">Páginas</p>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-3">
              {pages.map((p) => (
                <li key={p.path}>
                  <Link to={p.path} className="text-bone/80 hover:text-bone transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="mono text-mist mb-5">Hablemos</p>
            <ul className="space-y-4">
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-bone hover:text-wa transition-colors">
                  <WaIcon className="w-5 h-5" /> {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href={igLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-bone hover:text-pink-400 transition-colors">
                  <IgIcon className="w-5 h-5" /> @{INSTAGRAM}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-mist hover:text-bone transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="footer-word" aria-hidden="true">kailex</p>

        <div className="flex flex-col sm:flex-row justify-between gap-3 border-t border-line pt-8 mono text-mist">
          <span>© {new Date().getFullYear()} Kailex</span>
          <span>Hecho en Buenos Aires</span>
        </div>
      </div>
    </footer>
  )
}
