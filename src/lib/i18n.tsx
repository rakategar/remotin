import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { COPY, type Copy, type Lang } from '../content'

const KEY = 'remotin-lang'

const read = (): Lang => {
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
    document.title = COPY[lang].meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', COPY[lang].meta.description)
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* storage blocked: language just won't persist */
    }
  }, [lang])
  return <LangContext.Provider value={{ lang, c: COPY[lang], setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
