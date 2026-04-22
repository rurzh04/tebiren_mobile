"use client"

import { useState } from "react"
import { ChevronRight, Bell, LogOut, User, Building2, CreditCard, Users, Phone, Info, Languages, Moon, Sun } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { NotificationsPanel } from "./notifications-panel"
import { PersonalDataModal } from "./personal-data-modal"
import { SettingsModal } from "./settings-modal"

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: string
  isDestructive?: boolean
}

const personalMenuItems: MenuItem[] = [
  { id: "personal", label: "личные данные", icon: <User className="w-5 h-5" /> },
]

const coworkingMenuItems: MenuItem[] = [
  { id: "access", label: "данные для входа в коворкинг", icon: <Building2 className="w-5 h-5" /> },
  { id: "balance", label: "лимитный счет", icon: <CreditCard className="w-5 h-5" /> },
  { id: "community", label: "моя карточка в сообществе", icon: <Users className="w-5 h-5" /> },
]

const crmMenuItem: MenuItem = {
  id: "crm",
  label: "перейти в CRM",
  icon: <Building2 className="w-5 h-5" />,
}

const supportMenuItems: MenuItem[] = [
  { id: "contact", label: "связаться с нами", icon: <Phone className="w-5 h-5" /> },
  { id: "about", label: "о приложении", icon: <Info className="w-5 h-5" /> },
  { id: "language", label: "выбор языка", icon: <Languages className="w-5 h-5" /> },
  { id: "theme", label: "тема оформления", icon: <Moon className="w-5 h-5" /> },
  { id: "logout", label: "выйти из аккаунта", icon: <LogOut className="w-5 h-5" />, isDestructive: true },
]

export function ProfilePage() {
  const { theme, setTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showPersonalData, setShowPersonalData] = useState(false)
  const [settingsModal, setSettingsModal] = useState<"theme" | "language" | null>(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleMenuClick = (itemId: string) => {
    switch (itemId) {
      case "personal":
        setShowPersonalData(true)
        break
      case "language":
        setSettingsModal("language")
        break
      case "theme":
        setSettingsModal("theme")
        break
      case "logout":
        setShowLogoutConfirm(true)
        break
      case "contact":
        window.open("https://wa.me/77084809418", "_blank")
        break
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Icons */}
      <div className="flex justify-end gap-3 px-4 pt-4">
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-secondary transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
        <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-secondary transition-colors">
          <span className="text-xs font-medium text-muted-foreground">crm</span>
        </button>
        <button 
          onClick={() => setShowNotifications(true)}
          className="relative w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center px-4 py-6">
        <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-border">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-xl font-semibold mt-4">Arnat Aitzhan</h1>
        <p className="text-muted-foreground">+7 708 480 9418</p>
        
        {/* Balance Card */}
        <div className="w-full mt-6 p-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl border border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Баланс</p>
              <p className="text-2xl font-bold text-primary">25 000 ₸</p>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Пополнить
            </button>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-4 space-y-4">
        {/* Personal */}
        <MenuSection items={personalMenuItems} onItemClick={handleMenuClick} />

        {/* Coworking */}
        <div className="bg-card rounded-2xl overflow-hidden">
          <div className="px-4 py-2">
            <span className="text-xs font-medium text-primary bg-primary/20 px-2 py-1 rounded">
              КОВОРКИНГ
            </span>
          </div>
          {coworkingMenuItems.map((item, index) => (
            <MenuItemRow 
              key={item.id} 
              item={item} 
              isLast={index === coworkingMenuItems.length - 1}
              onClick={() => handleMenuClick(item.id)}
            />
          ))}
        </div>

        {/* CRM */}
        <MenuSection items={[crmMenuItem]} onItemClick={handleMenuClick} />

        {/* Support */}
        <MenuSection items={supportMenuItems} onItemClick={handleMenuClick} />
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Personal Data Modal */}
      <PersonalDataModal
        isOpen={showPersonalData}
        onClose={() => setShowPersonalData(false)}
      />

      {/* Settings Modal */}
      {settingsModal && (
        <SettingsModal
          isOpen={!!settingsModal}
          onClose={() => setSettingsModal(null)}
          type={settingsModal}
        />
      )}

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowLogoutConfirm(false)}>
          <div 
            className="bg-card rounded-2xl p-6 w-full max-w-sm animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-center">Выйти из аккаунта?</h3>
            <p className="text-muted-foreground text-center mt-2 text-sm">
              Вы уверены, что хотите выйти?
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-border hover:bg-secondary transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false)
                }}
                className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MenuSection({ items, onItemClick }: { items: MenuItem[]; onItemClick: (id: string) => void }) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden">
      {items.map((item, index) => (
        <MenuItemRow 
          key={item.id} 
          item={item} 
          isLast={index === items.length - 1}
          onClick={() => onItemClick(item.id)}
        />
      ))}
    </div>
  )
}

function MenuItemRow({ item, isLast, onClick }: { item: MenuItem; isLast: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-4 py-4 hover:bg-secondary/50 transition-colors",
        !isLast && "border-b border-border"
      )}
    >
      <span className={cn(
        "text-foreground",
        item.isDestructive && "text-destructive"
      )}>
        {item.label}
      </span>
      {item.isDestructive ? (
        <LogOut className="w-5 h-5 text-destructive" />
      ) : (
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  )
}
