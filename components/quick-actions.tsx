"use client"

import { Monitor, Users, Flame, Fingerprint, Heart, Calendar, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLang } from "@/contexts/language-context"

interface QuickActionsProps {
  onActionClick: (actionId: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const { t } = useLang()

  const quickActions = [
    {
      id: "workspace",
      label: t.quickActions.workspace,
      icon: <Monitor className="w-10 h-10" />,
      color: "text-pink-400",
      bgColor: "bg-gradient-to-br from-slate-700 to-slate-800",
    },
    {
      id: "conference",
      label: t.quickActions.conference,
      icon: <Users className="w-10 h-10" />,
      color: "text-pink-400",
      bgColor: "bg-gradient-to-br from-slate-700 to-slate-800",
    },
  ]

  const smallActions = [
    { id: "promo", label: t.quickActions.promo, icon: <Flame className="w-6 h-6" />, color: "text-orange-400 bg-orange-400/20" },
    { id: "biometry", label: t.quickActions.biometry, icon: <Fingerprint className="w-6 h-6" />, color: "text-teal-400 bg-teal-400/20" },
    { id: "community", label: t.quickActions.community, icon: <Heart className="w-6 h-6" />, color: "text-pink-400 bg-pink-400/20" },
    { id: "events", label: t.quickActions.events, icon: <Calendar className="w-6 h-6" />, color: "text-blue-400 bg-blue-400/20" },
    { id: "chat", label: t.quickActions.chat, icon: <MessageSquare className="w-6 h-6" />, color: "text-purple-400 bg-purple-400/20" },
  ]

  return (
      <div className="space-y-4">
        {/* Main actions */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
              <button
                  key={action.id}
                  onClick={() => onActionClick(action.id)}
                  className={cn(
                      "relative rounded-2xl p-4 pt-8 pb-3 flex flex-col items-center justify-end",
                      action.bgColor,
                      "hover:scale-[1.02] transition-transform active:scale-[0.98]"
                  )}
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <div className={cn("relative", action.color)}>
                    {action.icon}
                  </div>
                </div>
                <span className="text-sm font-medium text-white mt-8">{action.label}</span>
              </button>
          ))}
        </div>

        {/* Small actions */}
        <div className="grid grid-cols-5 gap-2">
          {smallActions.map((action) => (
              <button
                  key={action.id}
                  onClick={() => onActionClick(action.id)}
                  className="flex flex-col items-center gap-1"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", action.color)}>
                  {action.icon}
                </div>
                <span className="text-xs text-muted-foreground text-center leading-tight">{action.label}</span>
              </button>
          ))}
        </div>
      </div>
  )
}