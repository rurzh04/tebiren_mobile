"use client"

import { Gift, Copy, Check, Plus, Ticket, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Coupon {
  id: string
  code: string
  discount: string
  description: string
  validUntil: string
  isUsed: boolean
  minPurchase?: string
}

const initialCoupons: Coupon[] = [
  {
    id: "1",
    code: "WELCOME20",
    discount: "20%",
    description: "Скидка на первое бронирование",
    validUntil: "31.03.2026",
    isUsed: false,
  },
  {
    id: "2",
    code: "SPRING15",
    discount: "15%",
    description: "Весенняя скидка на месячный тариф",
    validUntil: "30.04.2026",
    isUsed: false,
    minPurchase: "от 50 000 ₸",
  },
  {
    id: "3",
    code: "MEETING50",
    discount: "50%",
    description: "Скидка на переговорные комнаты",
    validUntil: "15.03.2026",
    isUsed: true,
  },
  {
    id: "4",
    code: "COFFEE",
    discount: "Бесплатно",
    description: "Бесплатный кофе на неделю",
    validUntil: "20.03.2026",
    isUsed: false,
  },
]

export function CouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons)
  const [showAddCoupon, setShowAddCoupon] = useState(false)
  const [newCouponCode, setNewCouponCode] = useState("")
  const [addError, setAddError] = useState("")
  const [addSuccess, setAddSuccess] = useState(false)

  const activeCoupons = coupons.filter(c => !c.isUsed)
  const usedCoupons = coupons.filter(c => c.isUsed)

  const handleAddCoupon = () => {
    if (!newCouponCode.trim()) {
      setAddError("Введите промокод")
      return
    }
    
    if (coupons.some(c => c.code.toLowerCase() === newCouponCode.toLowerCase())) {
      setAddError("Этот промокод уже добавлен")
      return
    }

    // Simulate adding a new coupon
    if (newCouponCode.toUpperCase() === "NEWUSER") {
      setCoupons([
        ...coupons,
        {
          id: Date.now().toString(),
          code: "NEWUSER",
          discount: "10%",
          description: "Скидка для новых пользователей",
          validUntil: "31.12.2026",
          isUsed: false,
        }
      ])
      setAddSuccess(true)
      setTimeout(() => {
        setShowAddCoupon(false)
        setNewCouponCode("")
        setAddSuccess(false)
      }, 1500)
    } else {
      setAddError("Промокод не найден или недействителен")
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-center justify-between">
        <div className="w-10" />
        <h1 className="text-xl font-medium">купоны</h1>
        <button
          onClick={() => setShowAddCoupon(true)}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Stats Card */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-4 border border-primary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Ticket className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Активных купонов</p>
                <p className="text-2xl font-bold">{activeCoupons.length}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Потенциальная экономия</p>
              <p className="text-lg font-semibold text-primary">до 35%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Coupons */}
      {activeCoupons.length > 0 && (
        <div className="px-4 mb-6">
          <h2 className="text-sm text-muted-foreground mb-3">Активные купоны</h2>
          <div className="space-y-3">
            {activeCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </div>
      )}

      {/* Used Coupons */}
      {usedCoupons.length > 0 && (
        <div className="px-4">
          <h2 className="text-sm text-muted-foreground mb-3">Использованные</h2>
          <div className="space-y-3">
            {usedCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </div>
      )}

      {coupons.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Gift className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">У вас пока нет купонов</p>
          <button
            onClick={() => setShowAddCoupon(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Добавить промокод
          </button>
        </div>
      )}

      {/* Add Coupon Modal */}
      {showAddCoupon && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setShowAddCoupon(false)}>
          <div 
            className="w-full bg-background rounded-t-3xl p-6 animate-in slide-in-from-bottom"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Добавить промокод</h2>
              <button 
                onClick={() => {
                  setShowAddCoupon(false)
                  setNewCouponCode("")
                  setAddError("")
                }}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addSuccess ? (
              <div className="flex flex-col items-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-in zoom-in">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <p className="text-lg font-medium">Промокод добавлен!</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    value={newCouponCode}
                    onChange={(e) => {
                      setNewCouponCode(e.target.value.toUpperCase())
                      setAddError("")
                    }}
                    className="w-full px-4 py-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors text-center text-lg font-medium tracking-wider"
                  />
                  {addError && (
                    <p className="text-destructive text-sm mt-2 text-center">{addError}</p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground text-center mb-6">
                  Попробуйте: NEWUSER
                </p>

                <button
                  onClick={handleAddCoupon}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Применить
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn(
      "bg-card rounded-2xl p-4 border-l-4 relative overflow-hidden",
      coupon.isUsed 
        ? "border-l-muted-foreground opacity-60" 
        : "border-l-primary"
    )}>
      {/* Decorative circles */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background" />
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background" />
      
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-2xl font-bold",
              coupon.isUsed ? "text-muted-foreground" : "text-primary"
            )}>
              {coupon.discount}
            </span>
            {coupon.isUsed && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                использован
              </span>
            )}
          </div>
          <p className="text-sm text-foreground mb-1">{coupon.description}</p>
          {coupon.minPurchase && (
            <p className="text-xs text-primary mb-1">{coupon.minPurchase}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Действует до: {coupon.validUntil}
          </p>
        </div>

        {!coupon.isUsed && (
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all",
              copied 
                ? "bg-primary/20 text-primary" 
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Скопировано</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="font-mono">{coupon.code}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
