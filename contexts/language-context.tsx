"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { translations, type Language, type Translations } from "@/lib/i18n"

interface LanguageContextType {
    lang: Language
    setLang: (lang: Language) => void
    t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "ru",
    setLang: () => {},
    t: translations.ru,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>("ru")

    useEffect(() => {
        const saved = localStorage.getItem("app_language") as Language | null
        if (saved === "ru" || saved === "kz") {
            setLangState(saved)
        }
    }, [])

    const setLang = (newLang: Language) => {
        setLangState(newLang)
        localStorage.setItem("app_language", newLang)
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLang() {
    return useContext(LanguageContext)
}