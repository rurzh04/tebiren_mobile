"use client"

import { X, Sun, Moon, Monitor, Globe, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  type: "theme" | "language"
}

const languages = [
  { id: "ru", name: "Русский", flag: "🇷🇺" },
  { id: "kz", name: "Қазақша", flag: "🇰🇿" },
  { id: "en", name: "English", flag: "🇬🇧" },
]

export function SettingsModal({ isOpen, onClose, type }: SettingsModalProps) {
  const { theme, setTheme } = useTheme()
  const [selectedLang, setSelectedLang] = useState("ru")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={onClose}>
      <div 
        className="w-full bg-background rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">
            {type === "theme" ? "Тема оформления" : "Выбор языка"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 pb-8">
          {type === "theme" ? (
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
                  theme === "light"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-amber-500" />
                </div>
                <span className="text-sm font-medium">Светлая</span>
                {theme === "light" && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
                  theme === "dark"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-slate-300" />
                </div>
                <span className="text-sm font-medium">Тёмная</span>
                {theme === "dark" && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>

              <button
                onClick={() => setTheme("system")}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
                  theme === "system"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-slate-800 flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium">Система</span>
                {theme === "system" && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border transition-all",
                    selectedLang === lang.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  {selectedLang === lang.id && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
