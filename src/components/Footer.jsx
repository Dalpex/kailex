import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Globe, Camera, User, ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import logoFooterLight from '../../logokailexlight-v3.png'
import logoFooterDark from '../../logokailexdark-v3.png'

const footerLinks = {
  productos: [
    { label: 'Landing Pages', path: '/productos#landing' },
    { label: 'Sitios Web', path: '/productos#sitios' },
    { label: 'E-commerce', path: '/productos#ecommerce' },
    { label: 'Aplicaciones Web', path: '/productos#apps' },
  ],
  servicios: [
    { label: 'Diseño UI/UX', path: '/servicios#design' },
    { label: 'Desarrollo', path: '/servicios#development' },
    { label: 'SEO', path: '/servicios#seo' },
    { label: 'Mantenimiento', path: '/servicios#maintenance' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', path: '/sobre-nosotros' },
    { label: 'Portfolio', path: '/sobre-nosotros#portfolio' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contacto', path: '/contacto' },
  ],
  legal: [
    { label: 'Privacidad', path: '/privacidad' },
    { label: 'Términos', path: '/terminos' },
    { label: 'Cookies', path: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      {/* CTA Section */}
      <div className="container-custom">
        <div className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 md:p-16 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                ¿Listo para comenzar tu proyecto?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Transformamos tus ideas en experiencias digitales excepcionales.
                Hablemos sobre cómo podemos ayudarte.
              </p>
              <Link
                to="/contacto"
                className="group inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-black/20 hover:scale-105 transition-all duration-300"
              >
                <span>Empezar ahora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12 pb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img
                src={logoFooterLight}
                alt="Kailex"
                className="h-14 w-auto dark:hidden"
              />
              <img
                src={logoFooterDark}
                alt="Kailex"
                className="h-14 w-auto hidden dark:block"
              />
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xs">
              Desarrollo de páginas web modernas, rápidas y accesibles para negocios
              que buscan destacar en el mundo digital.
            </p>
            <div className="flex space-x-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
              >
                <Globe className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"
              >
                <Camera className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Productos</h4>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-slate-600 dark:text-slate-400">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href="mailto:dalpex@kailex.site" className="hover:text-indigo-500 transition-colors">
                  dalpex@kailex.site
                </a>
              </li>
              <li className="flex items-start space-x-3 text-slate-600 dark:text-slate-400">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href="https://wa.me/5491169605924" className="hover:text-indigo-500 transition-colors">
                  +54 11 6960 5924
                </a>
              </li>
              <li className="flex items-start space-x-3 text-slate-600 dark:text-slate-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-custom">
          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              © {new Date().getFullYear()} Kailex. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-slate-500 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
