// Lightweight hero visual for phones, tablets and modest PCs: real client sites in
// CSS phones, each screen scrolling on the compositor. No WebGL, no three.js download.

const PHONES = [
  { src: '/work/lineadtres-screen.jpg', label: null, slot: 'pslot-left', dur: '30s', delay: '-9s', eager: false },
  { src: '/work/tilo-screen.jpg', label: null, slot: 'pslot-right', dur: '28s', delay: '-4s', eager: false },
  { src: '/work/brunna-screen.jpg', label: 'Brunna · ristorante', slot: 'pslot-front', dur: '32s', delay: '0s', eager: true },
]

export default function PhoneStack() {
  return (
    <div className="pstack" aria-hidden="true">
      {PHONES.map((ph) => (
        <div key={ph.src} className={`pslot ${ph.slot}`}>
          <div className="pphone">
            <div className="pphone-screen">
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
            </div>
          </div>
          {ph.label ? (
            <div className="phone-label pslot-label">
              <span className="phone-label-dot" />
              {ph.label}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
