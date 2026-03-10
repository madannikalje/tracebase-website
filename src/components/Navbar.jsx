import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#1A1A1A]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <Shield className="h-5 w-5 text-[#4D9EFF]" />
            <span className="font-mono text-base font-semibold text-white tracking-tight">
              TraceBase
            </span>
          </a>

          {/* Desktop center nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Features', href: '#features' },
              { label: 'Docs', href: '#docs' },
              { label: 'Pricing', href: '#pricing' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#666666] hover:text-white transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className="text-sm text-[#666666] hover:text-white transition-colors duration-150"
            >
              Sign In
            </a>
            <a
              href="#"
              className="inline-flex items-center bg-[#4D9EFF] hover:bg-[#3D8EEF] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-[0_0_16px_rgba(77,158,255,0.3)]"
            >
              Start Building Free
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#666666] hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden border-t border-[#1A1A1A] bg-[#0D0D0D] px-4 pt-3 pb-5 space-y-1"
          >
            {[
              { label: 'Features', href: '#features' },
              { label: 'Docs', href: '#docs' },
              { label: 'Pricing', href: '#pricing' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-[#888888] hover:text-white py-2.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#1A1A1A] mt-2 space-y-2">
              <a
                href="#"
                className="block text-center text-sm text-[#888888] hover:text-white py-2 transition-colors"
              >
                Sign In
              </a>
              <a
                href="#"
                className="block text-center bg-[#4D9EFF] hover:bg-[#3D8EEF] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                Start Building Free
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
