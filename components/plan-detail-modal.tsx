"use client"

import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlanDetailModalProps {
  planId: string | null
  onClose: () => void
  onBookNow?: (planName: string, planPrice: string) => void
}

const planDetails: Record<string, {
  duration: string
  name: string
  price: string
  subtitle: string
  highlight: string
  features: string[]
  bgGradient: string
  textColor: string
}> = {
  month: {
    duration: "1 month",
    name: "MONTH flex",
    price: "100 000 ₸/месяц",
    subtitle: "Рабочее место в Open Space",
    highlight: "Незакрепленное место",
    features: [
      "Рабочее место в Open Space, доступ на месяц 24/7",
      "Незакрепленное место",
      "Безлимитный Wi-Fi",
      "Доступ на кухню и к coffee point",
      "Скидка - 50% на переговорные и конференц-залы",
    ],
    bgGradient: "bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300",
    textColor: "text-violet-500",
  },
  week: {
    duration: "7 days",
    name: "7 DAYS",
    price: "60 000 ₸/неделя",
    subtitle: "Рабочее место в Open Space",
    highlight: "Незакрепленное место",
    features: [
      "Рабочее место в Open Space, доступ на 7 дней",
      "Незакрепленное место",
      "Безлимитный Wi-Fi",
      "Доступ на кухню и к coffee point",
      "Скидка - 30% на переговорные",
    ],
    bgGradient: "bg-gradient-to-b from-violet-400 via-violet-500 to-violet-600",
    textColor: "text-primary",
  },
  day: {
    duration: "1 day",
    name: "DAY 1",
    price: "8 000 ₸/день",
    subtitle: "Рабочее место в Open Space",
    highlight: "Незакрепленное место",
    features: [
      "Рабочее место в Open Space на 1 день",
      "Незакрепленное место",
      "Безлимитный Wi-Fi",
      "Доступ на кухню и к coffee point",
    ],
    bgGradient: "bg-gradient-to-b from-primary via-lime-400 to-lime-500",
    textColor: "text-primary",
  },
}

export function PlanDetailModal({ planId, onClose, onBookNow }: PlanDetailModalProps) {
  if (!planId) return null
  
  const plan = planDetails[planId]
  if (!plan) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header with gradient */}
      <div className={cn("relative pt-12 pb-8 px-6", plan.bgGradient)}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <h1 className={cn("text-6xl font-bold italic", plan.textColor)}>
          {plan.duration}
        </h1>
        <h2 className={cn("text-2xl font-bold mt-2", planId === "month" ? "text-slate-700" : "text-foreground")}>
          {plan.name}
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <p className="text-sm">
          <span className="text-primary">доступ на 1 месяц</span>
          {" "}
          <span className="text-foreground">{plan.subtitle}</span>
        </p>
        <p className="text-primary text-sm mt-1">{plan.highlight}</p>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">описание</h3>
          <ol className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex gap-3 text-sm text-foreground">
                <span className="text-muted-foreground">{index + 1}.</span>
                <span>{feature}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Similar plans */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">похожие</h3>
          <div className="flex gap-3">
            {Object.entries(planDetails)
              .filter(([id]) => id !== planId)
              .slice(0, 2)
              .map(([id, p]) => (
                <div
                  key={id}
                  className={cn(
                    "flex-1 rounded-2xl p-4",
                    p.bgGradient
                  )}
                >
                  <span className={cn("text-2xl font-bold italic", p.textColor)}>
                    {p.duration}
                  </span>
                  <p className={cn("text-xs mt-2 font-medium", id === "month" ? "text-slate-700" : "text-foreground")}>
                    {p.name}
                  </p>
                  <p className={cn("text-xs", id === "month" ? "text-slate-600" : "text-foreground/80")}>
                    {p.price.split("/")[0]} ₸ за час
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-background">
        <span className="text-lg font-semibold">{plan.price}</span>
        <button 
          onClick={() => onBookNow?.(plan.name, plan.price)}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          выбрать дату
        </button>
      </div>
    </div>
  )
}
