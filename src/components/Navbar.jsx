import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../../logokailexdark-v3.png'
import WaIcon from './WaIcon'
import { waLink } from '../config'

const navItems = [
  { path: '/', label: 'Inicio' },
  { path: '/productos', label: 'Productos' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/sobre-nosotros', label: 'Nosotros' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen ? 'bg-ink/75 backdrop-blur-xl border-b border-line' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center" aria-label="Kailex, inicio">
              <img src={logo} alt="Kailex" className="h-9 w-auto" />
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${active ? 'text-bone' : 'text-mist hover:text-bone'}`}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-full bg-white/[0.07] border border-line -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              <WaIcon className="w-4 h-4" /> Pedir mi web
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 text-bone"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 z-30 md:hidden bg-ink/95 backdrop-blur-xl"
          >
            <div className="container-custom py-8 flex flex-col">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.path}
                    className={`block py-4 border-b border-line font-display text-3xl font-extrabold tracking-tight ${
                      location.pathname === item.path ? 'text-bone' : 'text-mist'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-wa mt-8">
                <WaIcon className="w-5 h-5" /> Pedir mi web por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
