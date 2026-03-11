import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Link, Activity } from 'lucide-react'

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
  INFO:     { text: '#4D9EFF', bg: 'rgba(77,158,255,0.08)',  border: 'rgba(77,158,255,0.22)',  glow: 'rgba(77,158,255,0.12)'  },
  MEDIUM:   { text: '#F0A500', bg: 'rgba(240,165,0,0.08)',   border: 'rgba(240,165,0,0.22)',   glow: 'rgba(240,165,0,0.10)'   },
  HIGH:     { text: '#FF8C42', bg: 'rgba(255,140,66,0.08)',  border: 'rgba(255,140,66,0.22)',  glow: 'rgba(255,140,66,0.10)'  },
  CRITICAL: { text: '#FF4D4D', bg: 'rgba(255,77,77,0.08)',   border: 'rgba(255,77,77,0.22)',   glow: 'rgba(255,77,77,0.12)'   },
}

// ─── Single audit event card ───────────────────────────────────────────────────
function AuditCard({ event, index }) {
  const risk = RISK_STYLES[event.risk]
  const isCritical = event.risk === 'CRITICAL'

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, x: -12 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.012,
        boxShadow: `0 0 28px ${risk.glow}, 0 0 0 1px ${risk.border}`,
        transition: { duration: 0.18 },
      }}
      style={{ border: `1px solid ${risk.border}`, borderRadius: 12, position: 'relative' }}
      className="w-full bg-[#080808] overflow-hidden flex cursor-default"
    >
      {/* Scan line that sweeps on entry */}
      <motion.div
        initial={{ x: '-100%', opacity: 0.7 }}
        whileInView={{ x: '300%', opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: index * 0.13 + 0.3, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '35%',
          background: `linear-gradient(to right, transparent, ${risk.glow}, transparent)`,
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* CRITICAL: pulsing border glow */}
      {isCritical && (
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: -1, borderRadius: 12,
            boxShadow: `0 0 16px ${risk.glow}`,
            border: `1px solid ${risk.border}`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Risk accent bar */}
      <div className="w-0.5 shrink-0 relative z-10" style={{ background: risk.text, opacity: 0.45 }} />

      <div className="flex-1 p-4 relative z-10">
        {/* Top row */}
        <div className="flex items-center gap-3 mb-2.5 flex-wrap">
          <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
            {event.id}
          </span>
          <span className="font-mono text-xs font-semibold" style={{ color: risk.text }}>
            {event.action}
          </span>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: index * 0.13 + 0.28, type: 'spring', stiffness: 300 }}
            className="ml-auto font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded"
            style={{ color: risk.text, background: risk.bg, border: `1px solid ${risk.border}` }}
          >
            {event.risk}
          </motion.span>
        </div>

        {/* Middle row */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#333] mb-3 flex-wrap">
          <span>{event.actor}</span>
          <span className="text-[#222]">·</span>
          <span>{event.ip}</span>
          <span className="text-[#222]">·</span>
          <span className="text-[#2A2A2A]">[{event.ts}]</span>
        </div>

        {/* Bottom: chain link */}
        <div
          className="flex items-center gap-2 font-mono text-[10px] pt-2.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <Link size={10} style={{ color: 'rgba(77,158,255,0.4)', flexShrink: 0 }} />
          <span style={{ color: 'rgba(255,255,255,0.12)' }}>prev:</span>
          <span style={{ color: 'rgba(77,158,255,0.32)' }}>{event.prevHash}</span>
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.13 + 0.42 }}
            className="flex items-center gap-1.5 ml-auto"
          >
            <ShieldCheck size={10} style={{ color: '#4D9EFF', opacity: 0.65 }} />
            <span style={{ color: 'rgba(77,158,255,0.5)' }}>SIGNED · {event.hash}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Chain connector with flowing particle ─────────────────────────────────────
function ChainConnector({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.13 + 0.32 }}
      className="flex flex-col items-center gap-0"
    >
      {/* Top line + flowing particle */}
      <div className="relative flex flex-col items-center" style={{ height: 22 }}>
        <div className="w-px h-full" style={{ background: 'rgba(77,158,255,0.12)' }} />
        {/* Particle traveling down */}
        <motion.div
          animate={{ y: [0, 22], opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.25, ease: 'linear' }}
          style={{
            position: 'absolute', top: 0,
            width: 4, height: 4, borderRadius: '50%',
            background: '#4D9EFF',
            boxShadow: '0 0 6px rgba(77,158,255,0.8)',
          }}
        />
      </div>

      {/* Label */}
      <motion.span
        className="font-mono text-[9px] px-2 py-0.5 rounded"
        style={{
          color: 'rgba(77,158,255,0.28)',
          border: '1px solid rgba(77,158,255,0.07)',
          background: 'rgba(77,158,255,0.03)',
        }}
      >
        sha256 chained ↓
      </motion.span>

      {/* Bottom line + flowing particle */}
      <div className="relative flex flex-col items-center" style={{ height: 22 }}>
        <div className="w-px h-full" style={{ background: 'rgba(77,158,255,0.12)' }} />
        <motion.div
          animate={{ y: [0, 22], opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.25 + 0.7, ease: 'linear' }}
          style={{
            position: 'absolute', top: 0,
            width: 4, height: 4, borderRadius: '50%',
            background: '#4D9EFF',
            boxShadow: '0 0 6px rgba(77,158,255,0.8)',
          }}
        />
      </div>
    </motion.div>
  )
}

// ─── Staggered bullet list item ────────────────────────────────────────────────
function BulletItem({ label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: 0.4 + index * 0.08, ease: 'easeOut' }}
      className="flex items-center gap-2.5 font-mono text-xs"
      style={{ color: 'rgba(255,255,255,0.28)' }}
    >
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.6 }}
        className="w-1 h-1 rounded-full shrink-0"
        style={{ background: 'rgba(77,158,255,0.55)' }}
      />
      {label}
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

  // 3D tilt: enters tilted 40°, flattens at center, slight back-tilt on exit
  const rotateX = useTransform(
    scrollYProgress,
    [0,   0.32, 0.68, 1],
    [40,  0,    0,    -12]
  )
  // Slight Z scaling (zoom in as it arrives)
  const scaleZ = useTransform(scrollYProgress, [0, 0.32], [0.92, 1])

  // Left copy parallax
  const copyY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section className="py-28 border-t border-[#141414] relative overflow-hidden">

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 62% 50%, rgba(77,158,255,0.05) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* Floating grid dots (decorative) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -18, 0],
            opacity: [0.04, 0.10, 0.04],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${12 + i * 13}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#4D9EFF',
            pointerEvents: 'none',
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-start">

          {/* ── Left: copy (parallax) ─────────────────────────────────────── */}
          <motion.div style={{ y: copyY }} className="lg:sticky lg:top-24 pt-4">

            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4 }}
              className="text-xs font-mono text-[#4D9EFF] uppercase tracking-[0.2em] mb-4"
            >
              The Ledger
            </motion.p>

            {/* Headline — words stagger in */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl sm:text-[2.35rem] font-bold text-white leading-[1.12] tracking-tight mb-5"
            >
              Every action.
              <br />
              <span className="text-[#4D9EFF]">Cryptographically</span>
              <br />
              sealed in real time.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="text-[#555] text-[1rem] leading-relaxed mb-8 max-w-sm"
            >
              Each event is SHA-256 chained to the previous — forming a
              tamper-evident ledger that survives even a full database breach.
            </motion.p>

            {/* Live events indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: 0.24, type: 'spring', stiffness: 260 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl mb-7"
              style={{
                border: '1px solid rgba(77,158,255,0.18)',
                background: 'rgba(77,158,255,0.05)',
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: '#4ECD6A' }}
              />
              <Activity size={11} style={{ color: '#4D9EFF', opacity: 0.7 }} />
              <span className="font-mono text-[11px]" style={{ color: 'rgba(77,158,255,0.65)' }}>
                ingesting live events
              </span>
            </motion.div>

            {/* Staggered bullets */}
            <div className="space-y-3">
              {[
                'Immutable WORM storage',
                'SHA-256 hash chain integrity',
                'Survives a primary DB breach',
                'GraphQL query in < 50ms',
              ].map((label, i) => (
                <BulletItem key={label} label={label} index={i} />
              ))}
            </div>
          </motion.div>

          {/* ── Right: 3D card stack ──────────────────────────────────────── */}
          <div style={{ perspective: '1100px' }}>
            <motion.div ref={cardStackRef} style={{ rotateX, scale: scaleZ }}>
              {EVENTS.map((event, i) => (
                <div key={event.id}>
                  <AuditCard event={event} index={i} />
                  {i < EVENTS.length - 1 && <ChainConnector index={i} />}
                </div>
              ))}

              {/* Sealed badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: EVENTS.length * 0.13 + 0.15, type: 'spring' }}
                className="mt-3 flex justify-end"
              >
                <motion.div
                  animate={{ boxShadow: ['0 0 0px rgba(77,158,255,0)', '0 0 12px rgba(77,158,255,0.15)', '0 0 0px rgba(77,158,255,0)'] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-[10px]"
                  style={{
                    border: '1px solid rgba(77,158,255,0.18)',
                    background: 'rgba(77,158,255,0.05)',
                    color: 'rgba(77,158,255,0.45)',
                  }}
                >
                  <ShieldCheck size={11} style={{ color: '#4D9EFF', opacity: 0.7 }} />
                  CHAIN INTEGRITY · VERIFIED · merkle:ok · WORM ✓
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
