import { useEffect } from 'react'
import { ContactPage } from './components/Contact'
import { Header } from './components/Header'
import { Ecosystem, Footer, Hero, HowTabs, Notes, Pillars, Products } from './components/Sections'
import { Statements } from './components/Statements'
import { LangProvider } from './lib/i18n'
import { startSmoothScroll, useRevealAll } from './lib/motion'
import { isContact } from './lib/route'

function Page() {
  useEffect(() => startSmoothScroll(), [])
  useRevealAll()
  return (
    <>
      <Header />
      <main>
        {isContact ? (
          <ContactPage />
        ) : (
          <>
            <Hero />
            <Statements />
            <Pillars />
            <Ecosystem />
            <Products />
            <HowTabs />
            <Notes />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  )
}
