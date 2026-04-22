"use client"

import { useState } from "react"
import { ChevronDown, Zap, X, Calendar, MapPin, Share2, Heart } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Promotion {
  id: string
  location: string
  locationColor: string
  title: string
  dateRange: string
  daysLeft: number
  description: string
  fullDescription: string
  image: string
  terms: string[]
}

const promotions: Promotion[] = [
  {
    id: "1",
    location: "Sputnik",
    locationColor: "bg-cyan-400 text-cyan-900",
    title: "Сезон Больших Подарков",
    dateRange: "12.03.2026 - 12.05.2026",
    daysLeft: 56,
    description: "Участвуйте в акции «Сезон Больших Подарков» и получите возможность выигра...",
    fullDescription: "Участвуйте в акции «Сезон Больших Подарков» и получите возможность выиграть ценные призы! Каждый день мы разыгрываем подарки среди наших резидентов. Чем больше вы работаете в коворкинге, тем больше шансов на победу!",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80",
    terms: [
      "Акция действует для всех резидентов Sputnik",
      "Для участия необходим активный тариф",
      "Розыгрыш проводится каждую пятницу",
      "Призы: iPhone, AirPods, сертификаты",
    ],
  },
  {
    id: "2",
    location: "Moskva",
    locationColor: "bg-primary text-primary-foreground",
    title: "Летний отдых с Moskva",
    dateRange: "01.06.2026 - 31.08.2026",
    daysLeft: 120,
    description: "Забронируйте рабочее место на лето и получите скидку 20% на все тарифы...",
    fullDescription: "Забронируйте рабочее место на лето и получите скидку 20% на все тарифы! Работайте в комфорте с кондиционером, наслаждайтесь прохладными напитками в нашем кофе-поинте и проводите встречи в современных переговорных.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    terms: [
      "Скидка применяется автоматически при оплате",
      "Действует на тарифы от 7 дней",
      "Можно комбинировать с купонами",
      "Количество мест ограничено",
    ],
  },
  {
    id: "3",
    location: "Tebiren",
    locationColor: "bg-violet-500 text-white",
    title: "Приведи друга",
    dateRange: "01.03.2026 - 31.12.2026",
    daysLeft: 289,
    description: "Приведите друга и получите бесплатный день работы для вас обоих...",
    fullDescription: "Пригласите друга в наш коворкинг и получите бонусы! При первой покупке вашего друга вы оба получаете по одному бесплатному дню. Количество приглашений не ограничено!",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80",
    terms: [
      "Друг должен быть новым клиентом",
      "Бонус начисляется после первой оплаты друга",
      "Бесплатные дни можно накапливать",
      "Действует во всех локациях",
    ],
  },
]

const filters = ["все объекты", "Tebiren", "SmArt.Point"]

export function PromotionsPage() {
  const [selectedFilter, setSelectedFilter] = useState("все объекты")
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null)
  const [likedPromos, setLikedPromos] = useState<string[]>([])

  const filteredPromos = selectedFilter === "все объекты" 
    ? promotions 
    : promotions.filter(p => p.location === selectedFilter)

  const toggleLike = (promoId: string) => {
    setLikedPromos(prev => 
      prev.includes(promoId) 
        ? prev.filter(id => id !== promoId)
        : [...prev, promoId]
    )
  }

  const handleShare = async (promo: Promotion) => {
    if (navigator.share) {
      await navigator.share({
        title: promo.title,
        text: promo.description,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-medium text-center">акции</h1>
      </div>

      {/* Filter Row */}
      <div className="px-4 mb-6 flex items-center justify-between">
        <span className="text-foreground">
          акций: <span className="font-semibold">{filteredPromos.length}</span>
        </span>
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 text-primary"
          >
            <span>{selectedFilter}</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", showFilterMenu && "rotate-180")} />
          </button>
          
          {showFilterMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-card rounded-xl shadow-lg border border-border overflow-hidden z-10">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter)
                    setShowFilterMenu(false)
                  }}
                  className={cn(
                    "w-full px-4 py-3 text-left hover:bg-secondary transition-colors",
                    selectedFilter === filter && "bg-primary/10 text-primary"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Promotions List */}
      <div className="px-4 space-y-6">
        {filteredPromos.map((promo) => (
          <PromotionCard 
            key={promo.id} 
            promotion={promo} 
            isLiked={likedPromos.includes(promo.id)}
            onLike={() => toggleLike(promo.id)}
            onShare={() => handleShare(promo)}
            onDetails={() => setSelectedPromo(promo)}
          />
        ))}
      </div>

      {filteredPromos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Нет акций для выбранного фильтра</p>
        </div>
      )}

      {/* Promo Detail Modal */}
      {selectedPromo && (
        <PromoDetailModal 
          promotion={selectedPromo} 
          onClose={() => setSelectedPromo(null)}
          isLiked={likedPromos.includes(selectedPromo.id)}
          onLike={() => toggleLike(selectedPromo.id)}
        />
      )}
    </div>
  )
}

function PromotionCard({ 
  promotion, 
  isLiked, 
  onLike, 
  onShare,
  onDetails 
}: { 
  promotion: Promotion
  isLiked: boolean
  onLike: () => void
  onShare: () => void
  onDetails: () => void
}) {
  return (
    <div className="bg-card rounded-3xl overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[16/10]">
        <Image
          src={promotion.image}
          alt={promotion.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            promotion.locationColor
          )}>
            {promotion.location}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={onLike}
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <Heart className={cn("w-5 h-5", isLiked ? "fill-red-500 text-red-500" : "text-white")} />
          </button>
          <button
            onClick={onShare}
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {promotion.title}
        </h3>
        
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm text-muted-foreground">{promotion.dateRange}</span>
          <div className="flex items-center gap-1 text-primary">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">осталось {promotion.daysLeft} дней</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {promotion.description}
        </p>

        <button 
          onClick={onDetails}
          className="w-full py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          подробнее
        </button>
      </div>
    </div>
  )
}

function PromoDetailModal({ 
  promotion, 
  onClose,
  isLiked,
  onLike
}: { 
  promotion: Promotion
  onClose: () => void
  isLiked: boolean
  onLike: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom"
        onClick={e => e.stopPropagation()}
      >
        {/* Image Header */}
        <div className="relative h-48">
          <Image
            src={promotion.image}
            alt={promotion.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute top-4 left-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              promotion.locationColor
            )}>
              {promotion.location}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 -mt-8 relative">
          <h2 className="text-2xl font-bold mb-4">{promotion.title}</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{promotion.dateRange}</span>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">{promotion.daysLeft} дней</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{promotion.location}</span>
          </div>

          <p className="text-foreground mb-6">{promotion.fullDescription}</p>

          <h3 className="font-semibold mb-3">Условия акции:</h3>
          <ul className="space-y-2 mb-6">
            {promotion.terms.map((term, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {term}
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            <button
              onClick={onLike}
              className={cn(
                "w-14 h-14 rounded-xl border flex items-center justify-center transition-colors",
                isLiked ? "border-red-500 bg-red-500/10" : "border-border hover:bg-secondary"
              )}
            >
              <Heart className={cn("w-6 h-6", isLiked ? "fill-red-500 text-red-500" : "")} />
            </button>
            <button className="flex-1 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
              Участвовать в акции
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
