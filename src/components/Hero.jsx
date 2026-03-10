import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react'

// ─── Syntax-highlighted code strings ───────────────────────────────────────
// All colors via inline styles — safe static content, no user input involved.

const INGEST_CODE = `<span style="color:#5C6970;font-style:italic">// Webhook → TraceBase Ingestion</span>
<span style="color:#C792EA">import</span> { <span style="color:#82AAFF">TraceBase</span> } <span style="color:#C792EA">from</span> <span style="color:#C3E88D">'@tracebase/node'</span>;

<span style="color:#C792EA">const</span> <span style="color:#EEFFFF">tb</span> = <span style="color:#C792EA">new</span> <span style="color:#FFCB6B">TraceBase</span>({
  <span style="color:#FFCB6B">apiKey</span>: process.env.<span style="color:#FFCB6B">TB_API_KEY</span>,
});

<span style="color:#C792EA">export default async function</span> <span style="color:#82AAFF">handler</span>(req, res) {
  <span style="color:#C792EA">await</span> tb.<span style="color:#82AAFF">ingest</span>({
    <span style="color:#FFCB6B">actorId</span>:    req.user.id,
    <span style="color:#FFCB6B">actorType</span>:  <span style="color:#C3E88D">'user'</span>,
    <span style="color:#FFCB6B">action</span>:     <span style="color:#C3E88D">'document.deleted'</span>,
    <span style="color:#FFCB6B">resourceId</span>: req.body.documentId,
    <span style="color:#FFCB6B">metadata</span>: {
      <span style="color:#FFCB6B">ipAddress</span>:  req.ip,
      <span style="color:#FFCB6B">userAgent</span>:  req.headers[<span style="color:#C3E88D">'user-agent'</span>],
      <span style="color:#FFCB6B">orgId</span>:      req.user.orgId,
    },
  });

  <span style="color:#C792EA">return</span> res.<span style="color:#82AAFF">json</span>({ ok: <span style="color:#C792EA">true</span> });
  <span style="color:#5C6970;font-style:italic">// ↳ eventId: 'evt_01j2k3l4m5'</span>
}`

const QUERY_CODE = `<span style="color:#5C6970;font-style:italic"># Retrieve audit events via GraphQL</span>
<span style="color:#C792EA">query</span> <span style="color:#82AAFF">GetAuditLog</span>(<span style="color:#FFCB6B">$orgId</span>: <span style="color:#89DDFF">ID</span>!, <span style="color:#FFCB6B">$limit</span>: <span style="color:#89DDFF">Int</span>) {
  <span style="color:#82AAFF">auditEvents</span>(
    filter:  { orgId: <span style="color:#FFCB6B">$orgId</span> }
    orderBy: <span style="color:#F78C6C">TIMESTAMP_DESC</span>
    limit:   <span style="color:#FFCB6B">$limit</span>
  ) {
    <span style="color:#82AAFF">id</span>
    <span style="color:#82AAFF">actor</span> {
      <span style="color:#82AAFF">id</span>
      <span style="color:#82AAFF">displayName</span>
    }
    <span style="color:#82AAFF">action</span>
    <span style="color:#82AAFF">resource</span> { id  type }
    <span style="color:#82AAFF">timestamp</span>
    <span style="color:#82AAFF">ipAddress</span>
    <span style="color:#82AAFF">verified</span>   <span style="color:#5C6970;font-style:italic"># Cryptographic proof ✓</span>
  }
}`

const TABS = [
  { id: 'ingest', label: 'ingest.js', lang: 'js', code: INGEST_CODE },
  { id: 'query', label: 'query.graphql', lang: 'graphql', code: QUERY_CODE },
]

// ─── Code Editor Mockup ────────────────────────────────────────────────────

function CodeEditor() {
  const [activeId, setActiveId] = useState('ingest')
  const tab = TABS.find((t) => t.id === activeId)
  const lineCount = tab.code.split('\n').length

  return (
    <div className="rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-[#1A1A1A]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" aria-hidden />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" aria-hidden />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" aria-hidden />
        <span className="ml-4 text-[11px] text-[#404040] font-mono">~/app/api/audit</span>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-[#1A1A1A] bg-[#0D0D0D]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveId(t.id)}
            className={`px-4 py-2.5 text-xs font-mono border-b-2 transition-all duration-150 ${
              activeId === t.id
                ? 'text-[#CCCCCC] border-[#4D9EFF] bg-[#111111]'
                : 'text-[#404040] border-transparent hover:text-[#666666] hover:bg-[#0F0F0F]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Code body */}
      <div className="p-5 overflow-x-auto max-h-[420px] overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex gap-5"
          >
            {/* Line numbers */}
            <div
              className="flex flex-col text-right select-none font-mono text-xs text-[#2A2A2A] leading-6 shrink-0"
              aria-hidden
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>

            {/* Highlighted code */}
            <pre
              className="flex-1 font-mono text-xs leading-6 text-[#EEFFFF] whitespace-pre overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: tab.code }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Hero Section ──────────────────────────────────────────────────────────

const TRUST_BADGES = [
  '< 50ms Ingestion SLA',
  '99.99% Uptime SLA',
  'SOC 2 Type II',
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-16"
      style={{
        background:
          'radial-gradient(ellipse 90% 60% at 50% -5%, rgba(77,158,255,0.07) 0%, transparent 65%)',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left copy ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1E1E1E] bg-[#111111] text-xs text-[#666666] mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ECD6A] animate-pulse" aria-hidden />
              SOC 2 Type II Readiness, Instantly
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              Drop-in Audit Logs
              <br />
              <span className="text-[#4D9EFF]">for B2B SaaS.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="text-[1.05rem] text-[#777777] leading-relaxed mb-8 max-w-[480px]"
            >
              Pass your compliance audit. Offload your primary database.
              Integrate a tamper-proof, GraphQL-powered audit trail into your
              app in an afternoon.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.20 }}
              className="flex flex-wrap gap-5 mb-9"
            >
              {TRUST_BADGES.map((label) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-[#555555]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4D9EFF] shrink-0" />
                  {label}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.26 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#4D9EFF] hover:bg-[#3D8EEF] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_0_24px_rgba(77,158,255,0.35)]"
              >
                Start Building Free
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#777777] hover:text-white border border-[#222222] hover:border-[#3A3A3A] font-medium text-sm px-6 py-3 rounded-lg transition-all duration-200"
              >
                <BookOpen className="w-4 h-4" />
                Read the Docs
              </a>
            </motion.div>
          </div>

          {/* ── Right code editor ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <CodeEditor />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0A0A0A)',
        }}
        aria-hidden
      />
    </section>
  )
}
