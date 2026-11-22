import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { COPY, type Copy, type Lang } from '../content'
import { isContact } from './route'

const KEY = 'remotin-lang'

const read = (): Lang => {
  // ?lang=id|en wins (used by hreflang links), then the visitor's saved choice, then English
  const q = new URLSearchParams(window.location.search).get('lang')
  if (q === 'id' || q === 'en') return q
  try {
    return localStorage.getItem(KEY) === 'id' ? 'id' : 'en'
  } catch {
    return 'en'
  }
}

type Ctx = { lang: Lang; c: Copy; setLang: (l: Lang) => void }
const LangContext = createContext<Ctx>({ lang: 'en', c: COPY.en, setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(read)
  useEffect(() => {
    document.documentElement.lang = lang
    if (isContact) {
      document.title = `${COPY[lang].contact.eyebrow} · remot.in`
    } else {
      document.title = COPY[lang].meta.title
      document.querySelector('meta[name="description"]')?.setAttribute('content', COPY[lang].meta.description)
      // each language version is canonical to itself, matching the hreflang links in index.html
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', lang === 'id' ? 'https://remot.in/?lang=id' : 'https://remot.in/')
    }
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* storage blocked: language just won't persist */
    }
  }, [lang])
  return <LangContext.Provider value={{ lang, c: COPY[lang], setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
