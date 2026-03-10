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
        width: 400,
        height: 400,
        x,
        y,
        background: 'radial-gradient(circle, rgba(77,158,255,0.055) 0%, transparent 70%)',
        filter: 'blur(48px)',
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
          width: 700,
          height: 700,
          top: '-15%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(77,158,255,0.07) 0%, transparent 65%)',
          filter: 'blur(32px)',
        }}
        animate={{ x: [0, 50, -20, 0], y: [0, 30, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom-right purple orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          bottom: '5%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(120,80,255,0.06) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
        animate={{ x: [0, -40, 20, 0], y: [0, -30, 50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Mid-page faint teal orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: '40%',
          left: '55%',
          background: 'radial-gradient(circle, rgba(0,210,190,0.04) 0%, transparent 65%)',
          filter: 'blur(48px)',
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
