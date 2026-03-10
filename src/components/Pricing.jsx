import { motion } from 'framer-motion'
import { Check, Minus, ArrowRight, Rocket, TrendingUp, Building2 } from 'lucide-react'

const PLANS = [
  {
    icon: Rocket,
    name: 'Developer',
    price: '$0',
    period: '/month',
    description: 'For MVPs and indie projects getting started.',
    cta: 'Start for Free',
    variant: 'ghost',
    highlighted: false,
    features: [
      { text: '100,000 events / month', on: true },
      { text: '30-day hot retention', on: true },
      { text: 'GraphQL API access', on: true },
      { text: 'Community support', on: true },
      { text: 'Embeddable UI widget', on: false },
      { text: 'Signed Session URLs', on: false },
      { text: 'Cold storage archiving', on: false },
      { text: 'SOC 2 Audit Pack', on: false },
    ],
  },
  {
    icon: TrendingUp,
    name: 'Growth',
    badge: 'Most Popular',
    price: '$149',
    period: '/month',
    description: 'For scaling B2B SaaS apps with compliance requirements.',
    cta: 'Start 14-Day Trial',
    variant: 'primary',
    highlighted: true,
    features: [
      { text: '5,000,000 events / month', on: true },
      { text: '1-year cold storage retention', on: true },
      { text: 'GraphQL API access', on: true },
      { text: 'Priority support (SLA)', on: true },
      { text: 'Embeddable UI widget', on: true },
      { text: 'Signed Session URLs', on: true },
      { text: 'Cold storage archiving', on: true },
      { text: 'SOC 2 Audit Pack', on: false },
    ],
  },
  {
    icon: Building2,
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For regulated industries operating at serious scale.',
    cta: 'Talk to Sales',
    variant: 'ghost',
    highlighted: false,
    features: [
      { text: 'Unlimited events', on: true },
      { text: '7-year WORM retention', on: true },
      { text: 'GraphQL API access', on: true },
      { text: 'Dedicated Slack support', on: true },
      { text: 'Embeddable UI widget', on: true },
      { text: 'Signed Session URLs', on: true },
      { text: 'Bring Your Own Cloud (K8s)', on: true },
      { text: 'SOC 2 Audit Pack', on: true },
    ],
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 border-t border-[#141414]">
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
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Start free. Scale with confidence.
          </h2>
          <p className="text-[#555555] text-lg max-w-md mx-auto leading-relaxed">
            No per-seat pricing. No surprise bills.
            Pay only for the events you ingest.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-3 gap-5 items-start"
        >
          {PLANS.map((plan) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                variants={cardAnim}
                className={`relative rounded-xl border p-7 flex flex-col ${
                  plan.highlighted
                    ? 'border-[#4D9EFF]/35 bg-[#0C1626] shadow-[0_0_48px_rgba(77,158,255,0.08)]'
                    : 'border-[#181818] bg-[#0D0D0D]'
                }`}
              >
                {/* Most Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span className="bg-[#4D9EFF] text-white text-[11px] font-semibold px-3.5 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-center gap-3 mb-5 mt-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      plan.highlighted ? 'bg-[#4D9EFF]/15' : 'bg-[#161616]'
                    }`}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: plan.highlighted ? '#4D9EFF' : '#555555' }}
                    />
                  </div>
                  <span className="font-semibold text-white tracking-tight">{plan.name}</span>
                </div>

                {/* Price */}
                <div className="mb-1 flex items-end gap-1">
                  <span className="text-[2.5rem] font-bold text-white leading-none tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[#444444] text-sm mb-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-[#444444] text-sm mb-6 leading-relaxed">{plan.description}</p>

                {/* CTA */}
                <a
                  href="#"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 mb-8 ${
                    plan.variant === 'primary'
                      ? 'bg-[#4D9EFF] hover:bg-[#3D8EEF] text-white hover:shadow-[0_0_20px_rgba(77,158,255,0.25)]'
                      : 'border border-[#252525] text-[#666666] hover:text-white hover:border-[#3A3A3A]'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {/* Divider */}
                <div className="border-t border-[#141414] mb-6" />

                {/* Feature list */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2.5">
                      {f.on ? (
                        <Check className="w-4 h-4 text-[#4ECD6A] shrink-0" />
                      ) : (
                        <Minus className="w-4 h-4 text-[#272727] shrink-0" />
                      )}
                      <span
                        className={`text-sm ${f.on ? 'text-[#888888]' : 'text-[#2E2E2E]'}`}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Enterprise note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs text-[#333333] font-mono mt-8"
        >
          All plans include 99.99% uptime SLA · GDPR & CCPA ready ·
          Cryptographic event verification
        </motion.p>
      </div>
    </section>
  )
}
