import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Solution from './components/Solution'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Solution />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
