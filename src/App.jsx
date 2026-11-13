import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WaIcon from './components/WaIcon'
import { waLink } from './config'
import Home from './pages/Home'
import Cursor from './components/lux/Cursor'
import ScrollProgress from './components/lux/ScrollProgress'

const loadProductos = () => import('./pages/Productos')
const loadServicios = () => import('./pages/Servicios')
const loadSobreNosotros = () => import('./pages/SobreNosotros')
const loadContacto = () => import('./pages/Contacto')
const loadFAQ = () => import('./pages/FAQ')
const PAGES = [loadProductos, loadServicios, loadSobreNosotros, loadContacto, loadFAQ]
const Productos = lazy(loadProductos)
const Servicios = lazy(loadServicios)
const SobreNosotros = lazy(loadSobreNosotros)
const Contacto = lazy(loadContacto)
const FAQ = lazy(loadFAQ)
const ApexFitness = lazy(() => import('./demos/ApexFitness'))

// New page starts at the top (unless the link points at a #section).
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

// Each page fades in with a CSS animation on its own keyed wrapper. No AnimatePresence:
// with lazy pages, "wait for exit, then suspend" could leave the new page blank.
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-in">
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  )
}

// Fetch the other pages in the background once the home page is idle, so a click
// on the menu never has to wait for the network.
function usePrefetchPages() {
  useEffect(() => {
    const load = () => PAGES.forEach((fn) => fn().catch(() => {}))
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500))
    const id = idle(load, { timeout: 4000 })
    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(id) : clearTimeout(id))
  }, [])
}

function AppContent() {
  const location = useLocation()
  const isDemo = location.pathname.startsWith('/demo')
  usePrefetchPages()

  if (isDemo) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/demo/apex" element={<ApexFitness />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-ink">
      <ScrollToTop />
      <ScrollProgress />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <a href={waLink()} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Escribinos por WhatsApp">
        <WaIcon className="w-7 h-7" />
      </a>
      <Navbar />
      <main className="pt-20">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  )
}

export default App
