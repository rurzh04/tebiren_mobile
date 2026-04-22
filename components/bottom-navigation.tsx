"use client"

import { Home, Flame, Calendar, Gift, User } from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "home" | "promotions" | "bookings" | "coupons" | "profile"

interface NavItem {
  id: TabType
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: "home", label: "главная", icon: <Home className="w-5 h-5" /> },
  { id: "promotions", label: "акции", icon: <Flame className="w-5 h-5" /> },
  { id: "bookings", label: "брони", icon: <Calendar className="w-5 h-5" /> },
  { id: "coupons", label: "купоны", icon: <Gift className="w-5 h-5" /> },
  { id: "profile", label: "профиль", icon: <User className="w-5 h-5" /> },
]

interface BottomNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
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
