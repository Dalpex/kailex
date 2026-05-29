import { motion } from 'framer-motion'
import { Target, Heart, Users, Lightbulb, Award, TrendingUp } from 'lucide-react'
import ShaderBackground from '../components/ShaderBackground'

const values = [
  { icon: Target, title: 'Excelencia', description: 'Buscamos la perfección en cada detalle, desde el primer pixel hasta la última línea de código.' },
  { icon: Heart, title: 'Pasión', description: 'Amamos lo que hacemos y se nota en cada proyecto que entregamos.' },
  { icon: Users, title: 'Colaboración', description: 'Trabajamos codo a codo con vos, porque tu éxito es el nuestro.' },
  { icon: Lightbulb, title: 'Innovación', description: 'Siempre explorando nuevas tecnologías y formas de hacer las cosas mejor.' },
]

const team = [
  { name: 'Equipo de Diseño', role: 'UI/UX', color: 'from-indigo-500 to-purple-500' },
  { name: 'Equipo de Desarrollo', role: 'Frontend & Backend', color: 'from-purple-500 to-pink-500' },
  { name: 'Equipo de Strategy', role: 'Growth & SEO', color: 'from-pink-500 to-rose-500' },
]

export default function SobreNosotros() {
  return (
    <div className="relative">
      <ShaderBackground variant="default" />
      {/* Hero */}
      <section className="section-padding relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8">
                Sobre{' '}
                <span className="gradient-text">Kailex</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Somos un estudio de desarrollo web dedicado a crear experiencias digitales
                excepcionales para negocios que buscan destacar en el mundo online.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding relative bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Nuestra misión
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Creemos que tener una presencia online profesional no debería ser un lujo
                reservado para grandes empresas. Por eso trabajamos todos los días para hacer
                accesible tecnología de primer nivel a emprendedores, pymes y profesionales.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Cada proyecto es una oportunidad para marcar la diferencia. No solo hacemos páginas
                web: creamos herramientas que ayudan a nuestros clientes a crecer, vender más y
                construir relaciones duraderas con sus clientes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Award, value: '2-3', label: 'Días de entrega' },
                { icon: Users, value: '24/7', label: 'Soporte disponible' },
                { icon: Heart, value: '48h', label: 'Tiempo de respuesta' },
                { icon: TrendingUp, value: '100%', label: 'Compromiso' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
                >
                  <stat.icon className="w-8 h-8 text-indigo-500 mb-4" />
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Nuestros valores
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding relative bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              El equipo
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Profesionales apasionados dedicados a tu éxito.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                  <Users className="w-12 h-12 text-white/80" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
