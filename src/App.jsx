import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Servicios from './pages/Servicios'
import SobreNosotros from './pages/SobreNosotros'
import Contacto from './pages/Contacto'
import FAQ from './pages/FAQ'

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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-transparent dark:bg-transparent transition-colors duration-300">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Navbar />
        <main className="pt-20">
          <PageTransition>
            <AnimatedRoutes />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
