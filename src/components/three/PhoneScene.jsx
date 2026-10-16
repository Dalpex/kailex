import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Html, Lightformer, RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Real phones showing real Kailex sites. Each screen is a full-page capture that
// scrolls slowly, so the phone reads as "someone is browsing this site right now".

const W = 0.74
const H = 1.52
const D = 0.085
const BEZEL = 0.028
const SW = W - BEZEL * 2
const SH = H - BEZEL * 2

function roundedRect(w, h, r, segments = 10) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  const g = new THREE.ShapeGeometry(s, segments)
  // ShapeGeometry UVs are in shape units; normalise them to 0..1 over the rect.
  const pos = g.attributes.position
  const uv = g.attributes.uv
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h)
  uv.needsUpdate = true
  return g
}

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function Screen({ src, speed, delay, still }) {
  const tex = useTexture(src)
  const geo = useMemo(() => roundedRect(SW, SH, 0.085), [])
  const visible = useMemo(() => {
    const img = tex.image
    return Math.min(1, (SH / SW) / (img.height / img.width))
  }, [tex])

  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    tex.repeat.set(1, visible)
    tex.offset.set(0, 1 - visible)
  }, [tex, visible])

  useFrame(({ clock }) => {
    if (still) return
    // read the page: hold, scroll down, hold, scroll back up
    const cycle = speed
    const t = ((clock.elapsedTime + delay) % cycle) / cycle
    let p
    if (t < 0.12) p = 0
    else if (t < 0.55) p = ease((t - 0.12) / 0.43)
    else if (t < 0.67) p = 1
    else p = 1 - ease((t - 0.67) / 0.33)
    tex.offset.y = (1 - visible) * (1 - p)
  })

  return (
    <mesh geometry={geo} position={[0, 0, D / 2 + 0.0012]}>
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  )
}

function Phone({ src, back = '#1a1a22', speed = 26, delay = 0, still, label, labelSide = 'left' }) {
  const front = useMemo(() => roundedRect(W - 0.006, H - 0.006, 0.112), [])
  const glass = useMemo(() => roundedRect(W - 0.006, H - 0.006, 0.112), [])
  const backGeo = useMemo(() => roundedRect(W - 0.01, H - 0.01, 0.11), [])
  const island = useMemo(() => roundedRect(0.2, 0.058, 0.029), [])

  return (
    <group>
      {/* titanium body */}
      <RoundedBox args={[W, H, D]} radius={0.04} smoothness={6} bevelSegments={6} creaseAngle={0.5}>
        <meshPhysicalMaterial color="#3a3a46" metalness={1} roughness={0.22} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={1.4} />
      </RoundedBox>

      {/* black front glass under the screen */}
      <mesh geometry={front} position={[0, 0, D / 2 + 0.0006]}>
        <meshPhysicalMaterial color="#020203" roughness={0.08} clearcoat={1} />
      </mesh>

      <Suspense fallback={null}>
        <Screen src={src} speed={speed} delay={delay} still={still} />
      </Suspense>

      <mesh geometry={island} position={[0, SH / 2 - 0.055, D / 2 + 0.0018]}>
        <meshBasicMaterial color="#000" />
      </mesh>

      {/* glass sheet: catches the studio reflections */}
      <mesh geometry={glass} position={[0, 0, D / 2 + 0.0024]}>
        <meshPhysicalMaterial transparent opacity={0.16} roughness={0.04} metalness={0} clearcoat={1} color="#ffffff" envMapIntensity={2.2} depthWrite={false} />
      </mesh>

      {/* back panel + camera */}
      <mesh geometry={backGeo} position={[0, 0, -D / 2 - 0.0006]} rotation={[0, Math.PI, 0]}>
        <meshPhysicalMaterial color={back} roughness={0.45} clearcoat={0.6} clearcoatRoughness={0.3} />
      </mesh>
      <group position={[0.17, 0.53, -D / 2 - 0.012]}>
        <RoundedBox args={[0.3, 0.3, 0.024]} radius={0.06} smoothness={4}>
          <meshPhysicalMaterial color={back} roughness={0.2} clearcoat={1} />
        </RoundedBox>
        {[[-0.065, 0.065], [-0.065, -0.065], [0.07, 0]].map(([x, y], i) => (
          <mesh key={i} position={[x, y, -0.016]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.048, 0.052, 0.02, 32]} />
            <meshPhysicalMaterial color="#0a0a10" metalness={0.6} roughness={0.15} clearcoat={1} />
          </mesh>
        ))}
      </group>

      {/* side buttons */}
      {[[W / 2 + 0.004, 0.3, 0.2], [-W / 2 - 0.004, 0.38, 0.1], [-W / 2 - 0.004, 0.2, 0.16]].map(([x, y, h], i) => (
        <RoundedBox key={i} args={[0.012, h, 0.03]} radius={0.005} position={[x, y, 0]}>
          <meshPhysicalMaterial color="#4a4a58" metalness={1} roughness={0.25} />
        </RoundedBox>
      ))}

      {label ? (
        <Html
          position={[labelSide === 'left' ? -0.12 : 0.12, -H / 2 - 0.1, 0.1]}
          center
          distanceFactor={2.8}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div className="phone-label">
            <span className="phone-label-dot" />
            {label}
          </div>
        </Html>
      ) : null}
    </group>
  )
}

function Rig({ children, still }) {
  const group = useRef()
  const { pointer } = useThree()
  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const scroll = Math.min(1, window.scrollY / 700)
    const k = 1 - Math.pow(0.002, delta)
    const ty = still ? 0 : pointer.x * 0.28 + scroll * 0.55
    const tx = still ? 0 : -pointer.y * 0.12 + scroll * 0.18
    g.rotation.y += (ty - g.rotation.y) * k
    g.rotation.x += (tx - g.rotation.x) * k
    g.position.y += (scroll * 0.35 - g.position.y) * k
  })
  return <group ref={group}>{children}</group>
}

function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={6} color="#6366F1" position={[-4, 0.5, 1]} scale={[1, 6, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={6} color="#EC4899" position={[4, -0.5, 1]} scale={[1, 6, 1]} target={[0, 0, 0]} />
      <Lightformer form="ring" intensity={2} color="#A855F7" position={[0, 0, -5]} scale={4} />
      <Lightformer form="rect" intensity={1.5} position={[0, -3, 2]} scale={[6, 1, 1]} target={[0, 0, 0]} />
    </Environment>
  )
}

export default function PhoneScene() {
  const wrap = useRef(null)
  const [onScreen, setOnScreen] = useState(true)
  const [still, setStill] = useState(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const narrow = window.matchMedia('(max-width: 640px)')
    const sync = () => {
      setStill(mq.matches)
      setCompact(narrow.matches)
    }
    sync()
    mq.addEventListener('change', sync)
    narrow.addEventListener('change', sync)
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: '100px' })
    if (wrap.current) io.observe(wrap.current)
    return () => {
      mq.removeEventListener('change', sync)
      narrow.removeEventListener('change', sync)
      io.disconnect()
    }
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={onScreen ? 'always' : 'never'}
        dpr={[1, compact ? 1.5 : 2]}
        camera={{ position: [0, 0, 4.7], fov: compact ? 36 : 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[2, 3, 4]} intensity={1.2} />
        <Suspense fallback={null}>
          <Studio />
          <Rig still={still}>
            <group position={[0.62, 0.16, -0.55]} rotation={[0, -0.42, 0.04]}>
              <Float enabled={!still} speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
                <Phone src="/work/tilo-screen.jpg" back="#3d4a36" speed={30} delay={9} still={still} label="TILO · nails & body" labelSide="right" />
              </Float>
            </group>
            <group position={[-0.42, -0.04, 0.35]} rotation={[0, 0.3, -0.03]}>
              <Float enabled={!still} speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
                <Phone src="/work/brunna-screen.jpg" back="#2a2118" speed={34} still={still} label="Brunna · ristorante" />
              </Float>
            </group>
          </Rig>
          <ContactShadows position={[0, -1.18, 0]} opacity={0.55} scale={6} blur={2.6} far={2.5} color="#000000" />
        </Suspense>
      </Canvas>
    </div>
  )
}
