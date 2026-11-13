import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Words light up one by one as the paragraph scrolls through the viewport.
// Words wrapped in *asterisks* get the brand gradient.
const TEXT =
  'Tu cliente te busca en el celular antes de escribirte. Si no te encuentra, le escribe a otro. Por eso diseñamos una web que se ve *impecable* en cualquier pantalla, carga *al *instante* y lo lleva directo a tu *WhatsApp.*'

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const accent = word.startsWith('*')
  const clean = word.replace(/\*/g, '')
  return (
    <motion.span style={{ opacity }} className={`manifesto-word ${accent ? 'text-grad' : ''}`}>
      {clean}
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = TEXT.split(' ')

  return (
    <section className="section" aria-label="Por qué Kailex">
      <div className="container-custom">
        <p className="eyebrow">Por qué una web</p>
        <p ref={ref} className="manifesto mt-8">
          {words.map((w, i) => {
            const start = i / words.length
            return <Word key={`${w}-${i}`} word={w} progress={scrollYProgress} range={[start, start + 1 / words.length]} />
          })}
        </p>
      </div>
    </section>
  )
}
