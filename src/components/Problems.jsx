import { motion } from 'framer-motion'
import { Database, ShieldAlert, Timer } from 'lucide-react'

const PROBLEMS = [
  {
    icon: Database,
    iconColor: '#FF6B6B',
    iconBg: 'rgba(255, 107, 107, 0.08)',
    borderHover: 'hover:border-[#FF6B6B]/20',
    tag: 'Scalability',
    title: 'Database Bloat',
    description:
      'Stop dumping high-volume, append-only time-series data into your transactional Postgres DB. Audit logs have entirely different performance profiles, retention windows, and query patterns — and they will poison your primary store.',
  },
  {
    icon: ShieldAlert,
    iconColor: '#4D9EFF',
    iconBg: 'rgba(77, 158, 255, 0.08)',
    borderHover: 'hover:border-[#4D9EFF]/20',
    tag: 'Security',
    title: 'Zero Trust Ingestion',
    description:
      'Your security logs are worthless if they can be altered after the fact. Guarantee cryptographically immutable, tamper-proof records with a WORM storage model — uncompromised even if your primary database is fully breached.',
  },
  {
    icon: Timer,
    iconColor: '#FFCB6B',
    iconBg: 'rgba(255, 203, 107, 0.08)',
    borderHover: 'hover:border-[#FFCB6B]/20',
    tag: 'Velocity',
    title: 'Wasted Sprints',
    description:
      "Don't spend months building custom indexing, cold-storage archiving, and full-text search pipelines for your audit trail. That's infrastructure engineering, not product. Ship the features that move your ARR.",
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Problems() {
  return (
    <section className="py-28 border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-[#4D9EFF] uppercase tracking-[0.2em] mb-3">
            The Problem
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Building audit logs is a trap.
          </h2>
          <p className="text-[#555555] text-lg max-w-md mx-auto leading-relaxed">
            It looks simple until you're 3 sprints deep and still haven't shipped.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-3 gap-5"
        >
          {PROBLEMS.map((p) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                variants={card}
                className={`group relative p-7 rounded-xl border border-[#161616] bg-[#0D0D0D] ${p.borderHover} transition-all duration-300 cursor-default`}
              >
                {/* Tag */}
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#333333] mb-4">
                  {p.tag}
                </p>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: p.iconBg }}
                >
                  <Icon className="w-5 h-5" style={{ color: p.iconColor }} />
                </div>

                {/* Content */}
                <h3 className="text-[1.05rem] font-semibold text-white mb-3 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">{p.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
