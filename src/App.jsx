import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Solution from './components/Solution'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

function CursorGlow() {
  const rawX = useMotionValue(-1000)
  const rawY = useMotionValue(-1000)

  const x = useSpring(rawX, { damping: 28, stiffness: 180, mass: 0.6 })
  const y = useSpring(rawY, { damping: 28, stiffness: 180, mass: 0.6 })

  useEffect(() => {
    const move = (e) => {
      rawX.set(e.clientX - 200)
      rawY.set(e.clientY - 200)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [rawX, rawY])

  return (
    <motion.div
      className="fixed pointer-events-none rounded-full"
      style={{
        width: 700,
        height: 700,
        x,
        y,
        background: 'radial-gradient(circle, rgba(77,158,255,0.22) 0%, rgba(77,158,255,0.08) 40%, transparent 75%)',
        filter: 'blur(20px)',
        zIndex: 0,
      }}
    />
  )
}

function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Top-left blue orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 1000,
          height: 1000,
          top: '-20%',
          left: '-15%',
          background: 'radial-gradient(circle, rgba(77,158,255,0.2) 0%, rgba(77,158,255,0.07) 45%, transparent 75%)',
          filter: 'blur(16px)',
        }}
        animate={{ x: [0, 50, -20, 0], y: [0, 30, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom-right purple orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 900,
          height: 900,
          bottom: '-5%',
          right: '-15%',
          background: 'radial-gradient(circle, rgba(120,80,255,0.18) 0%, rgba(120,80,255,0.07) 45%, transparent 75%)',
          filter: 'blur(18px)',
        }}
        animate={{ x: [0, -40, 20, 0], y: [0, -30, 50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Mid-page faint teal orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          top: '35%',
          left: '50%',
          background: 'radial-gradient(circle, rgba(0,210,190,0.14) 0%, rgba(0,210,190,0.05) 45%, transparent 75%)',
          filter: 'blur(20px)',
        }}
        animate={{ x: [0, 30, -50, 0], y: [0, -50, 20, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
      />
    </div>
  )
}

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans overflow-x-hidden">
      <CursorGlow />
      <BackgroundOrbs />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <Problems />
          <Solution />
          <Pricing />
        </main>
        <Footer />
      </div>
    </div>
  )
}
