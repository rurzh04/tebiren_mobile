"use client"

import { X, Bell, Calendar, Gift, CreditCard, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "booking" | "promo" | "payment" | "system"
  title: string
  message: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "Бронирование подтверждено",
    message: "Рабочее место в Tebiren на 15 марта",
    time: "5 мин назад",
    read: false,
  },
  {
    id: "2",
    type: "promo",
    title: "Новая акция!",
    message: "Скидка 20% на все тарифы до конца недели",
    time: "2 часа назад",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Оплата прошла успешно",
    message: "Списано 8 000 ₸ за DAY 1",
    time: "вчера",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "Добро пожаловать!",
    message: "Спасибо за регистрацию в CoWork",
    time: "3 дня назад",
    read: true,
  },
]

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  if (!isOpen) return null

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "booking":
        return <Calendar className="w-5 h-5 text-primary" />
      case "promo":
        return <Gift className="w-5 h-5 text-orange-400" />
      case "payment":
        return <CreditCard className="w-5 h-5 text-green-400" />
      case "system":
        return <CheckCircle className="w-5 h-5 text-blue-400" />
    }
  }

  const unreadCount = mockNotifications.filter(n => !n.read).length

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl animate-in slide-in-from-right"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Уведомления</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "p-4 border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer",
                !notification.read && "bg-primary/5"
              )}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={cn(
                      "font-medium truncate",
                      !notification.read && "text-primary"
                    )}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
