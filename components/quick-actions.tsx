"use client"

import { Monitor, Users, Flame, Fingerprint, Heart, Calendar, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

const quickActions: QuickAction[] = [
  {
    id: "workspace",
    label: "рабочее место",
    icon: <Monitor className="w-10 h-10" />,
    color: "text-pink-400",
    bgColor: "bg-gradient-to-br from-slate-700 to-slate-800",
  },
  {
    id: "conference",
    label: "конференц-залы",
    icon: <Users className="w-10 h-10" />,
    color: "text-pink-400",
    bgColor: "bg-gradient-to-br from-slate-700 to-slate-800",
  },
]

const smallActions = [
  { id: "promo", label: "акции", icon: <Flame className="w-6 h-6" />, color: "text-orange-400 bg-orange-400/20" },
  { id: "biometry", label: "биометрия", icon: <Fingerprint className="w-6 h-6" />, color: "text-teal-400 bg-teal-400/20" },
  { id: "community", label: "сообщество", icon: <Heart className="w-6 h-6" />, color: "text-pink-400 bg-pink-400/20" },
  { id: "events", label: "события", icon: <Calendar className="w-6 h-6" />, color: "text-blue-400 bg-blue-400/20" },
  { id: "chat", label: "переговор...", icon: <MessageSquare className="w-6 h-6" />, color: "text-purple-400 bg-purple-400/20" },
]

interface QuickActionsProps {
  onActionClick: (actionId: string) => void
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
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
            <span className="text-foreground text-sm mt-8">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Small actions - horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
        {smallActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.id)}
            className="flex flex-col items-center gap-2 min-w-[72px]"
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center",
              action.color
            )}>
              {action.icon}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
