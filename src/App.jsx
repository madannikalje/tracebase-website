import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Solution from './components/Solution'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import LedgerVisualization from './components/LedgerVisualization'

function CursorGlow() {
  const rawX = useMotionValue(-2000)
  const rawY = useMotionValue(-2000)

  const x = useSpring(rawX, { damping: 22, stiffness: 220, mass: 0.4 })
  const y = useSpring(rawY, { damping: 22, stiffness: 220, mass: 0.4 })

  useEffect(() => {
    const move = (e) => {
      rawX.set(e.clientX - 26)   // center: ring is 52px wide
      rawY.set(e.clientY - 26)
      document.documentElement.style.setProperty('--cx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cy', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [rawX, rawY])

  const accent     = 'rgba(77,158,255,'
  const tickStyle  = (dir) => {
    const base = { position: 'absolute', background: `${accent}0.55)` }
    if (dir === 'top')    return { ...base, top: -7,  left: '50%', transform: 'translateX(-50%)', width: 1, height: 7 }
    if (dir === 'bottom') return { ...base, bottom: -7, left: '50%', transform: 'translateX(-50%)', width: 1, height: 7 }
    if (dir === 'left')   return { ...base, left: -7, top: '50%',  transform: 'translateY(-50%)', width: 7, height: 1 }
    if (dir === 'right')  return { ...base, right: -7, top: '50%', transform: 'translateY(-50%)', width: 7, height: 1 }
  }

  return (
    <motion.div
      className="fixed pointer-events-none"
      whileTap={{ scale: 1.4, opacity: 0.5 }}
      style={{ width: 52, height: 52, x, y, zIndex: 9999 }}
    >
      {/* Outer ring */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: `1px solid ${accent}0.38)`,
        boxShadow: `0 0 10px ${accent}0.08), inset 0 0 10px ${accent}0.04)`,
      }} />

      {/* Rotating dashed inner orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 6, borderRadius: '50%',
          border: `1px dashed ${accent}0.22)`,
        }}
      />

      {/* Crosshair tick marks */}
      <div style={tickStyle('top')} />
      <div style={tickStyle('bottom')} />
      <div style={tickStyle('left')} />
      <div style={tickStyle('right')} />

      {/* Center dot */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 3, height: 3, borderRadius: '50%',
        background: `${accent}0.9)`,
        boxShadow: `0 0 5px ${accent}0.6)`,
      }} />

      {/* Status label */}
      <div style={{
        position: 'absolute', bottom: -20, left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '7.5px',
        color: `${accent}0.4)`,
        whiteSpace: 'nowrap',
        letterSpacing: '0.18em',
      }}>
        AUDIT.LIVE
      </div>
    </motion.div>
  )
}

// ─── Click ripple effect ──────────────────────────────────────────────────
function ClickEffect() {
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    const onClick = (e) => {
      const id = Date.now() + Math.random()
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1000)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      {ripples.map(({ id, x, y }) => (
        <div
          key={id}
          className="fixed pointer-events-none"
          style={{ left: x, top: y, zIndex: 9998 }}
        >
          {/* Outer expanding ring */}
          <motion.div
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.9 }}
            animate={{ width: 140, height: 140, x: -70, y: -70, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              border: '1px solid rgba(77,158,255,0.7)',
              boxShadow: '0 0 8px rgba(77,158,255,0.25)',
            }}
          />
          {/* Inner faster ring */}
          <motion.div
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
            animate={{ width: 80, height: 80, x: -40, y: -40, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              border: '1px solid rgba(77,158,255,0.5)',
            }}
          />
          {/* Floating "EVT_CAPTURED" label */}
          <motion.div
            initial={{ opacity: 1, y: -12, x: 8 }}
            animate={{ opacity: 0, y: -36 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.05 }}
            style={{
              position: 'absolute',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '8px',
              color: 'rgba(77,158,255,0.85)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.14em',
            }}
          >
            EVT_CAPTURED
          </motion.div>
        </div>
      ))}
    </>
  )
}

// ─── Audit log stream data ────────────────────────────────────────────────
const COL_DATA = [
  // Column 1 — actions
  [
    'document.deleted', 'user.login', 'role.updated', 'api_key.rotated',
    'permission.grant', 'file.exported', 'setting.changed', '2fa.enabled',
    'webhook.fired', 'user.invited', 'token.revoked', 'record.viewed',
    'session.created', 'login.failed', 'mfa.verified', 'config.updated',
  ],
  // Column 2 — actor IDs + hash fragments
  [
    'usr_k2m9x3', 'a3f7e2b9c1', 'doc_3j8k1p', 'key_8w2r5t',
    '9d4b2e7f3a', 'role_admin', 'evt_1j2k3l', 'VERIFIED ✓',
    'ed25519/ok', 'hash:b7c4e9f2', 'sig:valid', 'usr_b3c5d7',
    'rpt_5n8p2q', 'tok_7r4w9x', 'org_4x9z1r', 'integrity:ok',
  ],
  // Column 3 — timestamps + compliance labels
  [
    '[14:23:01]', '[14:23:04]', 'IMMUTABLE', '[14:23:07]',
    '[14:23:09]', 'SIGNED ✓', '[14:23:12]', '[14:23:15]',
    'TAMPER-PROOF', '[14:23:18]', 'WORM ✓', '[14:23:21]',
    '[14:23:25]', 'SOC2 ✓', '[14:23:28]', 'COMPLIANT',
  ],
  // Column 4 — more actions
  [
    'export.triggered', 'user.suspended', 'org.created', 'billing.updated',
    'data.purged', 'audit.queried', 'ip:192.168.1.42', 'ip:10.0.0.15',
    'record.locked', 'access.denied', 'key.expired', 'user.restored',
    'policy.applied', 'alert.triggered', 'snapshot.taken', 'log.sealed',
  ],
  // Column 5 — hex checksums
  [
    '0x4a7b9c2e', 'sha256:a3f7', '0xf3d8a1b6', 'checksum:✓',
    '0x9e2c5d8f', '0x1b7f3e9a', 'merkle:ok', '0x8d4c2b6e',
    '0x5f9a3d7c', '0x2e6b8f1d', 'chain:valid', '0x7c1e4a9b',
    'proof:ed25519', '0x3d8f2c7a', 'root:9e4f2a', '0xa1c7e3f5',
  ],
]

const COLUMNS = [
  { left: '3%',  duration: 38, opacity: 0.07, blur: 1,   color: '77,158,255' },
  { left: '21%', duration: 28, opacity: 0.10, blur: 0.5, color: '77,158,255' },
  { left: '40%', duration: 22, opacity: 0.06, blur: 1.5, color: '120,80,255' },
  { left: '60%', duration: 32, opacity: 0.09, blur: 0.5, color: '77,158,255' },
  { left: '80%', duration: 25, opacity: 0.07, blur: 1,   color: '0,210,190'  },
]

function LogColumn({ entries, duration, opacity, blur, color, left }) {
  const doubled = [...entries, ...entries]

  const textRows = doubled.map((entry, i) => (
    <div
      key={i}
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '10.5px',
        color: `rgba(${color}, 0.9)`,
        lineHeight: '2',
        whiteSpace: 'nowrap',
        letterSpacing: '0.02em',
      }}
    >
      {entry}
    </div>
  ))

  // Shared animation — both layers use identical props so they stay in sync
  const anim = { animate: { y: ['0%', '-50%'] }, transition: { duration, repeat: Infinity, ease: 'linear' } }

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: 0,
        bottom: 0,
        width: '160px',
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        maskImage:        'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      {/* Base layer — always faintly visible */}
      <motion.div {...anim} style={{ opacity, filter: `blur(${blur}px)` }}>
        {textRows}
      </motion.div>

      {/* Spotlight layer — bright, revealed only where cursor hovers */}
      <motion.div
        {...anim}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.65,
          WebkitMaskImage: 'radial-gradient(circle 170px at var(--cx, -999px) var(--cy, -999px), black 0%, transparent 100%)',
          maskImage:        'radial-gradient(circle 170px at var(--cx, -999px) var(--cy, -999px), black 0%, transparent 100%)',
        }}
      >
        {textRows}
      </motion.div>
    </div>
  )
}

function BeamBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>

      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right,  rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top-center glow */}
      <div
        className="absolute"
        style={{
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(77,158,255,0.10) 0%, rgba(100,60,255,0.05) 45%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Scrolling audit log columns */}
      {COLUMNS.map((col, i) => (
        <LogColumn key={i} entries={COL_DATA[i]} {...col} />
      ))}
    </div>
  )
}

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans overflow-x-hidden">
      <CursorGlow />
      <ClickEffect />
      <BeamBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <Problems />
          <LedgerVisualization />
          <Solution />
          <Pricing />
        </main>
        <Footer />
      </div>
    </div>
  )
}
