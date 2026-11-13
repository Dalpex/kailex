import { useEffect, useRef } from 'react'

// Hero visual: photoreal phones built in HTML/CSS, each showing a real client site that
// scrolls on the compositor. Text stays razor sharp (it's real pixels, not a WebGL
// texture), it costs nothing to download, and on desktop the whole stack tilts in 3D
// with the pointer.

const PHONES = [
  { src: '/work/lineadtres-screen.jpg', ink: 'light', slot: 'dslot-left', dur: '30s', delay: '-9s', eager: false },
  { src: '/work/tilo-screen.jpg', ink: 'dark', slot: 'dslot-right', dur: '28s', delay: '-4s', eager: false },
  { src: '/work/brunna-screen.jpg', ink: 'light', slot: 'dslot-front', dur: '32s', delay: '0s', eager: true, label: 'Brunna · ristorante' },
]

function StatusBar({ ink }) {
  return (
    <div className={`dv-status dv-ink-${ink}`}>
      <span>9:41</span>
      <span className="dv-status-icons">
        <svg viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg viewBox="0 0 16 12" aria-hidden="true"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4C5.2.4 2.7 1.5.8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.5 1.3l1.2-1.3A7 7 0 0 0 8 4c-1.8 0-3.4.7-4.7 1.8l1.2 1.3c1-.8 2.2-1.3 3.5-1.3Zm0 3.5c-.6 0-1.1.2-1.5.6L8 11.6l1.5-1.7c-.4-.4-.9-.6-1.5-.6Z" /></svg>
        <svg viewBox="0 0 27 12" aria-hidden="true"><rect x=".5" y=".5" width="22" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".45" /><rect x="2" y="2" width="17" height="8" rx="2" /><path d="M24.5 4v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" opacity=".5" /></svg>
      </span>
    </div>
  )
}

function Device({ ph }) {
  return (
    <div className="dv">
      <div className="dv-depth" aria-hidden="true">
        <span style={{ '--z': '-3px' }} />
        <span style={{ '--z': '-6px' }} />
        <span style={{ '--z': '-9px' }} />
        <span style={{ '--z': '-12px' }} />
      </div>
      <div className="dv-frame">
        <i className="dv-btn dv-btn-action" />
        <i className="dv-btn dv-btn-up" />
        <i className="dv-btn dv-btn-down" />
        <i className="dv-btn dv-btn-power" />
        <div className="dv-bezel">
          <div className="dv-screen">
            <img
              src={ph.src}
              alt=""
              width="780"
              height="3000"
              decoding="async"
              loading={ph.eager ? 'eager' : 'lazy'}
              fetchPriority={ph.eager ? 'high' : 'low'}
              style={{ '--dur': ph.dur, '--delay': ph.delay }}
            />
            <StatusBar ink={ph.ink} />
            <div className="dv-island"><i /></div>
            <div className={`dv-home dv-ink-${ph.ink}`} />
            <div className="dv-glare" />
            <div className="dv-shade" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PhoneStack() {
  const rig = useRef(null)

  useEffect(() => {
    const el = rig.current
    const fine = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!el || !fine.matches) return undefined
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0
    const move = (e) => {
      tx = e.clientX / window.innerWidth - 0.5
      ty = e.clientY / window.innerHeight - 0.5
    }
    const tick = () => {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      const s = Math.min(1, window.scrollY / 800)
      el.style.setProperty('--ry', `${(x * 16 - 8 + s * 10).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${(-y * 10 + 4 + s * 8).toFixed(2)}deg`)
      el.style.setProperty('--gx', (x * 2).toFixed(3))
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return (
    <div className="dstack" aria-hidden="true">
      <div ref={rig} className="dstack-rig">
        {PHONES.map((ph) => (
          <div key={ph.src} className={`dslot ${ph.slot}`}>
            <div className="dslot-float">
              <Device ph={ph} />
            </div>
            {ph.label ? (
              <div className="phone-label dslot-label">
                <span className="phone-label-dot" />
                {ph.label}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="dstack-floor" />
    </div>
  )
}
