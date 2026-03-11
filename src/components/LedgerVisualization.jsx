import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Link } from 'lucide-react'

// ─── Easing shared across the section ─────────────────────────────────────────
// Smooth deceleration — like data loading into place, no bounce
const EASE = [0.25, 1, 0.5, 1]

// ─── Data ──────────────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: 'evt_01j2k3l4',
    action: 'user.login',
    actor: 'usr_k2m9x3',
    ip: '192.168.1.42',
    risk: 'INFO',
    hash: '0x4a7b9c2e',
    prevHash: 'genesis',
    ts: '14:23:01.042',
  },
  {
    id: 'evt_01j2k4m5',
    action: 'document.deleted',
    actor: 'usr_b3c5d7',
    ip: '10.0.0.15',
    risk: 'CRITICAL',
    hash: '0xf3d8a1b6',
    prevHash: '0x4a7b9c2e',
    ts: '14:23:04.891',
  },
  {
    id: 'evt_01j2k5n6',
    action: 'role.updated',
    actor: 'role_admin',
    ip: '172.16.0.1',
    risk: 'HIGH',
    hash: '0x9e2c5d8f',
    prevHash: '0xf3d8a1b6',
    ts: '14:23:07.334',
  },
  {
    id: 'evt_01j2k6p7',
    action: 'api_key.rotated',
    actor: 'usr_k2m9x3',
    ip: '192.168.1.42',
    risk: 'MEDIUM',
    hash: '0x1b7f3e9a',
    prevHash: '0x9e2c5d8f',
    ts: '14:23:09.777',
  },
  {
    id: 'evt_01j2k7q8',
    action: 'permission.granted',
    actor: 'role_admin',
    ip: '10.0.0.15',
    risk: 'HIGH',
    hash: '0x8d4c2b6e',
    prevHash: '0x1b7f3e9a',
    ts: '14:23:12.210',
  },
]

const RISK_STYLES = {
  INFO:     { text: '#4D9EFF', bg: 'rgba(77,158,255,0.08)',  border: 'rgba(77,158,255,0.20)'  },
  MEDIUM:   { text: '#F0A500', bg: 'rgba(240,165,0,0.08)',   border: 'rgba(240,165,0,0.20)'   },
  HIGH:     { text: '#FF8C42', bg: 'rgba(255,140,66,0.08)',  border: 'rgba(255,140,66,0.20)'  },
  CRITICAL: { text: '#FF4D4D', bg: 'rgba(255,77,77,0.08)',   border: 'rgba(255,77,77,0.28)'   },
}

// ─── Single audit event card ───────────────────────────────────────────────────
function AuditCard({ event, index }) {
  const risk = RISK_STYLES[event.risk]

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }}
      whileHover={{
        borderColor: risk.text,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${risk.border}`,
        transition: { duration: 0.15, ease: 'easeOut' },
      }}
      style={{ border: `1px solid ${risk.border}`, borderRadius: 12 }}
      className="w-full bg-[#080808] overflow-hidden flex cursor-default"
    >
      {/* Risk accent bar */}
      <div className="w-0.5 shrink-0" style={{ background: risk.text, opacity: 0.5 }} />

      <div className="flex-1 p-4">
        {/* Top row */}
        <div className="flex items-center gap-3 mb-2.5 flex-wrap">
          <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
            {event.id}
          </span>
          <span className="font-mono text-xs font-semibold" style={{ color: risk.text }}>
            {event.action}
          </span>
          <span
            className="ml-auto font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded"
            style={{ color: risk.text, background: risk.bg, border: `1px solid ${risk.border}` }}
          >
            {event.risk}
          </span>
        </div>

        {/* Middle row */}
        <div className="flex items-center gap-3 font-mono text-[11px] mb-3 flex-wrap"
          style={{ color: '#2E2E2E' }}>
          <span>{event.actor}</span>
          <span style={{ color: '#1E1E1E' }}>·</span>
          <span>{event.ip}</span>
          <span style={{ color: '#1E1E1E' }}>·</span>
          <span>[{event.ts}]</span>
        </div>

        {/* Bottom: hash chain */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.09 + 0.35, ease: 'easeOut' }}
          className="flex items-center gap-2 font-mono text-[10px] pt-2.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <Link size={10} style={{ color: 'rgba(77,158,255,0.38)', flexShrink: 0 }} />
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>prev:</span>
          <span style={{ color: 'rgba(77,158,255,0.3)' }}>{event.prevHash}</span>
          <div className="flex items-center gap-1.5 ml-auto">
            <ShieldCheck size={10} style={{ color: '#4D9EFF', opacity: 0.6 }} />
            <span style={{ color: 'rgba(77,158,255,0.45)' }}>SIGNED · {event.hash}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Chain connector with a single traveling particle ─────────────────────────
function ChainConnector({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.09 + 0.3, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      {/* Top segment */}
      <div className="relative flex justify-center" style={{ width: 1, height: 18 }}>
        <div className="absolute inset-0" style={{ background: 'rgba(77,158,255,0.1)' }} />
        <motion.div
          animate={{ y: [0, 18], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: index * 0.3,
            ease: 'linear',
          }}
          style={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: 3, height: 3, borderRadius: '50%',
            background: '#4D9EFF',
            boxShadow: '0 0 4px rgba(77,158,255,0.7)',
          }}
        />
      </div>

      {/* Label */}
      <span
        className="font-mono text-[9px] px-2 py-0.5 rounded"
        style={{
          color: 'rgba(77,158,255,0.22)',
          border: '1px solid rgba(77,158,255,0.06)',
          background: 'rgba(77,158,255,0.02)',
          letterSpacing: '0.04em',
        }}
      >
        sha256 chained ↓
      </span>

      {/* Bottom segment */}
      <div className="relative flex justify-center" style={{ width: 1, height: 18 }}>
        <div className="absolute inset-0" style={{ background: 'rgba(77,158,255,0.1)' }} />
        <motion.div
          animate={{ y: [0, 18], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: index * 0.3 + 0.9,
            ease: 'linear',
          }}
          style={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: 3, height: 3, borderRadius: '50%',
            background: '#4D9EFF',
            boxShadow: '0 0 4px rgba(77,158,255,0.7)',
          }}
        />
      </div>
    </motion.div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────
export default function LedgerVisualization() {
  const cardStackRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: cardStackRef,
    offset: ['start end', 'end start'],
  })

  // 3D perspective tilt — enters slightly angled, resolves flat as it centres
  const rotateX = useTransform(
    scrollYProgress,
    [0,    0.3,  0.7,  1],
    [22,   0,    0,   -6]
  )
  // Subtle parallax on copy — moves slower than scroll
  const copyY = useTransform(scrollYProgress, [0, 1], [36, -36])

  return (
    <section className="py-28 border-t border-[#141414] relative overflow-hidden">

      {/* Radial ambient glow behind the cards */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 65% 52%, rgba(77,158,255,0.045) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-start">

          {/* ── Left: copy ────────────────────────────────────────────────── */}
          <motion.div style={{ y: copyY }} className="lg:sticky lg:top-24 pt-4">

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, ease: EASE }}
              className="text-xs font-mono text-[#4D9EFF] uppercase tracking-[0.2em] mb-4"
            >
              The Ledger
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
              className="text-3xl sm:text-[2.35rem] font-bold text-white leading-[1.12] tracking-tight mb-5"
            >
              Every action.
              <br />
              <span className="text-[#4D9EFF]">Cryptographically</span>
              <br />
              sealed in real time.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
              className="text-[#555] text-[1rem] leading-relaxed mb-8 max-w-sm"
            >
              Each event is SHA-256 chained to the previous — forming a
              tamper-evident ledger that survives even a full database breach.
            </motion.p>

            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: 0.18, ease: EASE }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-8"
              style={{
                border: '1px solid rgba(77,158,255,0.14)',
                background: 'rgba(77,158,255,0.04)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                style={{ background: '#4ECD6A' }}
                aria-hidden
              />
              <span className="font-mono text-[11px]" style={{ color: 'rgba(77,158,255,0.55)' }}>
                ingesting live events
              </span>
            </motion.div>

            {/* Bullet list — staggered */}
            <div className="space-y-3">
              {[
                'Immutable WORM storage',
                'SHA-256 hash chain integrity',
                'Survives a primary DB breach',
                'GraphQL query in < 50ms',
              ].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.22 + i * 0.07, ease: EASE }}
                  className="flex items-center gap-2.5 font-mono text-xs"
                  style={{ color: 'rgba(255,255,255,0.26)' }}
                >
                  <div
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: 'rgba(77,158,255,0.45)' }}
                  />
                  {label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: 3D card stack ──────────────────────────────────────── */}
          <div style={{ perspective: '1200px' }}>
            <motion.div ref={cardStackRef} style={{ rotateX }}>

              {EVENTS.map((event, i) => (
                <div key={event.id}>
                  <AuditCard event={event} index={i} />
                  {i < EVENTS.length - 1 && <ChainConnector index={i} />}
                </div>
              ))}

              {/* Sealed stamp */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: EVENTS.length * 0.09 + 0.2, ease: 'easeOut' }}
                className="mt-3 flex justify-end"
              >
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-[10px]"
                  style={{
                    border: '1px solid rgba(77,158,255,0.12)',
                    background: 'rgba(77,158,255,0.03)',
                    color: 'rgba(77,158,255,0.38)',
                    letterSpacing: '0.04em',
                  }}
                >
                  <ShieldCheck size={11} style={{ color: '#4D9EFF', opacity: 0.55 }} />
                  CHAIN INTEGRITY · VERIFIED · merkle:ok · WORM ✓
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
