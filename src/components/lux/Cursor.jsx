import { useEffect, useRef, useState } from 'react'

// Desktop-only cursor ring + magnetic buttons. Everything runs off one rAF loop and
// writes transforms only, so it never triggers layout. Touch devices never mount it.
const MAGNETIC = '.btn-wa, .btn-ghost, .round-link, [data-magnetic]'

function wantsCursor() {
  if (typeof window === 'undefined') return false
  const mq = (q) => window.matchMedia(q).matches
  return mq('(pointer: fine)') && mq('(hover: hover)') && !mq('(prefers-reduced-motion: reduce)')
}

export default function Cursor() {
  const [on] = useState(wantsCursor)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (!on) return undefined
    const el = ring.current
    const lab = label.current
    let x = -100, y = -100, rx = -100, ry = -100
    let raf = 0
    let mag = null
    let shown = false

    const tick = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      el.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    const release = () => {
      if (mag) {
        mag.style.translate = ''
        mag = null
      }
    }

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      if (!shown) {
        shown = true
        rx = x
        ry = y
        el.classList.add('is-on')
      }
      const t = e.target instanceof Element ? e.target : null
      const tagged = t?.closest('[data-cursor]')
      const text = tagged?.getAttribute('data-cursor') || ''
      if (lab.textContent !== text) lab.textContent = text
      el.classList.toggle('is-label', Boolean(text))
      el.classList.toggle('is-link', !text && Boolean(t?.closest('a, button, input, [role="button"]')))

      const m = t?.closest(MAGNETIC)
      if (m !== mag) release()
      if (m) {
        mag = m
        const r = m.getBoundingClientRect()
        const dx = (x - (r.left + r.width / 2)) * 0.22
        const dy = (y - (r.top + r.height / 2)) * 0.3
        m.style.translate = `${dx}px ${dy}px`
      }
    }
    const leave = () => {
      shown = false
      el.classList.remove('is-on')
      release()
    }
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      release()
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [on])

  if (!on) return null
  return (
    <div ref={ring} className="cursor" aria-hidden="true">
      <span className="cursor-ring" />
      <span ref={label} className="cursor-label" />
    </div>
  )
}
