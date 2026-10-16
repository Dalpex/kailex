import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WaIcon from './components/WaIcon'
import { waLink } from './config'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Servicios from './pages/Servicios'
import SobreNosotros from './pages/SobreNosotros'
import Contacto from './pages/Contacto'
import FAQ from './pages/FAQ'

const ApexFitness = lazy(() => import('./demos/ApexFitness'))

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppContent() {
  const location = useLocation()
  const isDemo = location.pathname.startsWith('/demo')

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
      <a href={waLink()} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Escribinos por WhatsApp">
        <WaIcon className="w-7 h-7" />
      </a>
      <Navbar />
      <main className="pt-20">
        <PageTransition>
          <AnimatedRoutes />
        </PageTransition>
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
