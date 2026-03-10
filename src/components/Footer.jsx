import { Shield } from 'lucide-react'

const NAV_LINKS = ['Features', 'Docs', 'Pricing', 'Privacy', 'Terms', 'Status']

export default function Footer() {
  return (
    <footer className="border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <Shield className="h-5 w-5 text-[#4D9EFF]" />
            <span className="font-mono text-[0.95rem] font-semibold text-white tracking-tight">
              TraceBase
            </span>
          </a>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-[#383838] hover:text-[#777777] transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-[#2D2D2D] shrink-0">
            &copy; {new Date().getFullYear()} TraceBase, Inc.
          </p>
        </div>

        {/* Tagline */}
        <div className="mt-10 pt-6 border-t border-[#0F0F0F] text-center">
          <p className="text-[11px] font-mono text-[#222222] tracking-widest uppercase">
            Compliance Infrastructure for Modern Dev Teams.
          </p>
        </div>
      </div>
    </footer>
  )
}
