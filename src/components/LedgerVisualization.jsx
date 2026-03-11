import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Link } from 'lucide-react'

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
  INFO:     { text: '#4D9EFF', bg: 'rgba(77,158,255,0.08)',  border: 'rgba(77,158,255,0.22)'  },
  MEDIUM:   { text: '#F0A500', bg: 'rgba(240,165,0,0.08)',   border: 'rgba(240,165,0,0.22)'   },
  HIGH:     { text: '#FF8C42', bg: 'rgba(255,140,66,0.08)',  border: 'rgba(255,140,66,0.22)'  },
  CRITICAL: { text: '#FF4D4D', bg: 'rgba(255,77,77,0.08)',   border: 'rgba(255,77,77,0.22)'   },
}

// ─── Single audit event card ───────────────────────────────────────────────────
function AuditCard({ event, index }) {
  const risk = RISK_STYLES[event.risk]

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.10, ease: 'easeOut' }}
      style={{ border: `1px solid ${risk.border}`, borderRadius: 12 }}
      className="w-full bg-[#080808] overflow-hidden flex"
    >
      {/* Risk accent bar */}
      <div className="w-0.5 shrink-0" style={{ background: risk.text, opacity: 0.4 }} />

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
          <div className="flex items-center gap-1.5 ml-auto">
            <ShieldCheck size={10} style={{ color: '#4D9EFF', opacity: 0.65 }} />
            <span style={{ color: 'rgba(77,158,255,0.5)' }}>SIGNED · {event.hash}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Chain connector ────────────────────────────────────────────────────────────
function ChainConnector({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.3, delay: index * 0.10 + 0.18 }}
      className="flex flex-col items-center py-0.5 gap-0.5"
    >
      <div className="w-px h-2.5" style={{ background: 'rgba(77,158,255,0.1)' }} />
      <span
        className="font-mono text-[9px] px-2 py-0.5 rounded"
        style={{
          color: 'rgba(77,158,255,0.28)',
          border: '1px solid rgba(77,158,255,0.07)',
          background: 'rgba(77,158,255,0.03)',
        }}
      >
        sha256 chained ↓
      </span>
      <div className="w-px h-2.5" style={{ background: 'rgba(77,158,255,0.1)' }} />
    </motion.div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────
export default function LedgerVisualization() {
  const sectionRef = useRef(null)
  const cardStackRef = useRef(null)

  // Track when the CARD STACK scrolls through the viewport for the 3D tilt
  const { scrollYProgress } = useScroll({
    target: cardStackRef,
    // 0 = card stack top hits viewport bottom (entering from below)
    // 1 = card stack bottom hits viewport top (exiting above)
    offset: ['start end', 'end start'],
  })

  // 3D tilt: comes in tilted from below (rotateX +30°), flattens as it centres, tilts slightly away as it exits
  const rotateX = useTransform(
    scrollYProgress,
    [0,   0.35, 0.65, 1],
    [28,  0,    0,    -8]
  )

  // Gentle Y parallax on the copy side
  const copyY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      ref={sectionRef}
      className="py-28 border-t border-[#141414] overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 60% 50%, rgba(77,158,255,0.04) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-start">

          {/* ── Left: copy (parallax) ─────────────────────────────────────── */}
          <motion.div style={{ y: copyY }} className="lg:sticky lg:top-24 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-mono text-[#4D9EFF] uppercase tracking-[0.2em] mb-4">
                The Ledger
              </p>

              <h2 className="text-3xl sm:text-[2.35rem] font-bold text-white leading-[1.12] tracking-tight mb-5">
                Every action.
                <br />
                <span className="text-[#4D9EFF]">Cryptographically</span>
                <br />
                sealed in real time.
              </h2>

              <p className="text-[#555] text-[1rem] leading-relaxed mb-8 max-w-sm">
                Each event is SHA-256 chained to the previous — forming a
                tamper-evident ledger that survives even a full database breach.
              </p>

              {/* Properties */}
              <div className="space-y-3">
                {[
                  ['Immutable WORM storage', 'rgba(77,158,255,0.5)'],
                  ['SHA-256 hash chain integrity', 'rgba(77,158,255,0.5)'],
                  ['Survives a primary DB breach', 'rgba(77,158,255,0.5)'],
                  ['GraphQL query in < 50ms', 'rgba(77,158,255,0.5)'],
                ].map(([label, dot]) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 font-mono text-xs"
                    style={{ color: 'rgba(255,255,255,0.28)' }}
                  >
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: dot }} />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: 3D card stack ──────────────────────────────────────── */}
          {/* Perspective wrapper — perspective must be on the PARENT of the rotating element */}
          <div style={{ perspective: '1000px' }}>
            <motion.div ref={cardStackRef} style={{ rotateX }}>
              {EVENTS.map((event, i) => (
                <div key={event.id}>
                  <AuditCard event={event} index={i} />
                  {i < EVENTS.length - 1 && <ChainConnector index={i} />}
                </div>
              ))}

              {/* Sealed badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: EVENTS.length * 0.10 + 0.1 }}
                className="mt-3 flex justify-end"
              >
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-[10px]"
                  style={{
                    border: '1px solid rgba(77,158,255,0.14)',
                    background: 'rgba(77,158,255,0.04)',
                    color: 'rgba(77,158,255,0.42)',
                  }}
                >
                  <ShieldCheck size={11} style={{ color: '#4D9EFF', opacity: 0.65 }} />
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
