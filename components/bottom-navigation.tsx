"use client"

import { Home, Flame, Calendar, Gift, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLang } from "@/contexts/language-context"

type TabType = "home" | "promotions" | "bookings" | "coupons" | "profile"

interface BottomNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const { t } = useLang()

  const navItems = [
    { id: "home" as TabType, label: t.nav.home, icon: <Home className="w-5 h-5" /> },
    { id: "promotions" as TabType, label: t.nav.promotions, icon: <Flame className="w-5 h-5" /> },
    { id: "bookings" as TabType, label: t.nav.bookings, icon: <Calendar className="w-5 h-5" /> },
    { id: "coupons" as TabType, label: t.nav.coupons, icon: <Gift className="w-5 h-5" /> },
    { id: "profile" as TabType, label: t.nav.profile, icon: <User className="w-5 h-5" /> },
  ]

  return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {navItems.map((item) => (
              <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                      "flex flex-col items-center gap-1 px-4 py-2 transition-colors",
                      activeTab === item.id
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                  )}
              >
                <div className={cn(
                    "relative p-1 rounded-xl transition-colors",
                    activeTab === item.id && "bg-primary/20"
                )}>
                  {item.icon}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
          ))}
        </div>
      </nav>
  )
}

export type { TabType }