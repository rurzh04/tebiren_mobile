"use client"

import { cn } from "@/lib/utils"

interface PricingPlan {
  id: string
  duration: string
  name: string
  price: string
  priceLabel: string
  color: string
  bgColor: string
}

const pricingPlans: PricingPlan[] = [
  {
    id: "month",
    duration: "1 month",
    name: "MONTH flex",
    price: "100 000",
    priceLabel: "₸/месяц",
    color: "text-violet-300",
    bgColor: "bg-gradient-to-br from-slate-100 to-slate-200",
  },
  {
    id: "week",
    duration: "7 days",
    name: "7 DAYS",
    price: "60 000",
    priceLabel: "₸/день",
    color: "text-primary",
    bgColor: "bg-gradient-to-br from-violet-500 to-violet-600",
  },
  {
    id: "day",
    duration: "1 day",
    name: "DAY 1",
    price: "8 000",
    priceLabel: "₸/день",
    color: "text-primary",
    bgColor: "bg-gradient-to-br from-primary to-lime-400",
  },
]

interface PricingCardsProps {
  onPlanSelect: (planId: string) => void
}

export function PricingCards({ onPlanSelect }: PricingCardsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-foreground">
        работай с комфортом от 8 000 ₸
      </h3>
      
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
        {pricingPlans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => onPlanSelect(plan.id)}
            className={cn(
              "min-w-[160px] rounded-2xl p-4 flex flex-col items-start",
              plan.bgColor,
              "hover:scale-[1.02] transition-transform active:scale-[0.98]"
            )}
          >
            <span className={cn(
              "text-3xl font-bold italic",
              plan.id === "month" ? "text-violet-500" : plan.color
            )}>
              {plan.duration}
            </span>
            <div className="mt-auto pt-4 space-y-1">
              <p className={cn(
                "text-sm",
                plan.id === "month" ? "text-slate-600" : "text-foreground/80"
              )}>
                {plan.price} {plan.priceLabel}
              </p>
              <p className={cn(
                "text-xs font-medium",
                plan.id === "month" ? "text-slate-700" : "text-foreground"
              )}>
                {plan.name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
