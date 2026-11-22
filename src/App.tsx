import { useEffect } from 'react'
import { Header } from './components/Header'
import { Ecosystem, Footer, Hero, HowTabs, Notes, Products } from './components/Sections'
import { Statements } from './components/Statements'
import { startSmoothScroll, useRevealAll } from './lib/motion'

export default function App() {
  useEffect(() => startSmoothScroll(), [])
  useRevealAll()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statements />
        <Ecosystem />
        <Products />
        <HowTabs />
        <Notes />
      </main>
      <Footer />
    </>
  )
}
