import { motion } from 'framer-motion'
import { Braces, Search, Zap, Globe, Layers, Lock, Code2, ChevronDown } from 'lucide-react'

const FEATURES = [
  {
    icon: Braces,
    title: 'Headless GraphQL API',
    description:
      'Query your audit trail from any client. Filter by actor, action, resource, or timestamp range. Fully paginated, sortable, and blazingly fast.',
  },
  {
    icon: Search,
    title: 'Instant Full-Text Search',
    description:
      'Search across structured JSON metadata in milliseconds. Purpose-built inverted index handles billions of records without breaking a sweat.',
  },
  {
    icon: Zap,
    title: 'Sub-50ms Ingestion SLA',
    description:
      'Fire-and-forget webhook ingestion backed by a contractual SLA. Our globally distributed edge network never becomes your bottleneck.',
  },
]

const ARCH_STEPS = [
  {
    icon: Globe,
    label: 'Customer App',
    sublabel: 'Webhook  POST /events',
    connector: 'HTTPS · Signed Payload',
  },
  {
    icon: Zap,
    label: 'Ingestion Edge',
    sublabel: 'Global CDN · Sub-50ms SLA',
    connector: 'Async Fire & Forget',
  },
  {
    icon: Layers,
    label: 'Pub/Sub Async Queue',
    sublabel: 'Kafka · Guaranteed Delivery',
    connector: 'Ledger Worker',
  },
  {
    icon: Lock,
    label: 'TraceBase WORM Ledger',
    sublabel: 'Cryptographic · Tamper-Proof',
    connector: 'GraphQL',
  },
  {
    icon: Code2,
    label: 'GraphQL API Output',
    sublabel: 'Your UI & Dashboards',
    connector: null,
  },
]

function ArchDiagram() {
  return (
    <div className="flex flex-col items-stretch">
      {ARCH_STEPS.map((step, i) => {
        const Icon = step.icon
        const isFirst = i === 0
        const isLast = i === ARCH_STEPS.length - 1

        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-stretch"
          >
            {/* Step box */}
            <div
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl border transition-colors ${
                isLast
                  ? 'border-[#4D9EFF]/30 bg-[#4D9EFF]/5 shadow-[0_0_24px_rgba(77,158,255,0.06)]'
                  : isFirst
                  ? 'border-[#2A2A2A] bg-[#111111]'
                  : 'border-[#1A1A1A] bg-[#0D0D0D]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isLast ? 'bg-[#4D9EFF]/15' : 'bg-[#161616]'
                }`}
              >
                <Icon
                  className="w-4 h-4"
                  style={{ color: isLast ? '#4D9EFF' : '#4A4A4A' }}
                />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-sm font-medium leading-tight ${
                    isLast ? 'text-[#4D9EFF]' : 'text-[#CCCCCC]'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[11px] text-[#3A3A3A] mt-0.5 font-mono">{step.sublabel}</p>
              </div>
            </div>

            {/* Connector */}
            {!isLast && (
              <div className="flex flex-col items-center py-0.5 gap-0.5">
                <div className="w-px h-3 bg-[#1E1E1E]" />
                <span className="text-[10px] font-mono text-[#2D2D2D] px-2 py-0.5 border border-[#1A1A1A] rounded bg-[#0A0A0A]">
                  {step.connector}
                </span>
                <div className="w-px h-3 bg-[#1E1E1E]" />
                <ChevronDown className="w-3 h-3 text-[#252525]" />
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Solution() {
  return (
    <section id="features" className="py-28 border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: copy + features ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-mono text-[#4D9EFF] uppercase tracking-[0.2em] mb-3">
                The Solution
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                Purpose-built infrastructure
                <br />
                for audit trails.
              </h2>
              <p className="text-[#555555] text-lg mb-14 leading-relaxed max-w-lg">
                TraceBase is not a generic logging tool. It's a compliance-grade,
                API-first audit trail engine designed for the exact challenges
                scaling B2B SaaS teams face.
              </p>
            </motion.div>

            {/* Feature list */}
            <div className="space-y-9">
              {FEATURES.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#4D9EFF]/8 border border-[#4D9EFF]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4.5 h-4.5 text-[#4D9EFF]" style={{ width: 18, height: 18 }} />
                    </div>
                    <div>
                      <h3 className="text-[0.95rem] font-semibold text-white mb-1.5 tracking-tight">
                        {f.title}
                      </h3>
                      <p className="text-sm text-[#555555] leading-relaxed">{f.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ── Right: architecture diagram ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-xl border border-[#161616] bg-[#0A0A0A] p-6">
              <p className="text-[10px] font-mono text-[#2A2A2A] uppercase tracking-[0.2em] text-center mb-5">
                Data Pipeline Overview
              </p>
              <ArchDiagram />

              {/* SLA callout */}
              <div className="mt-6 pt-5 border-t border-[#141414] flex items-center justify-between">
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-white font-mono">{'<'}50ms</p>
                  <p className="text-[10px] text-[#333333] mt-0.5">P99 Ingestion</p>
                </div>
                <div className="w-px h-8 bg-[#1A1A1A]" />
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-white font-mono">99.99%</p>
                  <p className="text-[10px] text-[#333333] mt-0.5">Uptime SLA</p>
                </div>
                <div className="w-px h-8 bg-[#1A1A1A]" />
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-white font-mono">7yr</p>
                  <p className="text-[10px] text-[#333333] mt-0.5">Max Retention</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
