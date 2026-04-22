"use client"

import { useState } from "react"
import Image from "next/image"
import { Bell, Search } from "lucide-react"
import { LocationSelector } from "./location-selector"
import { QuickActions } from "./quick-actions"
import { PricingCards } from "./pricing-cards"
import { PlanDetailModal } from "./plan-detail-modal"
import { ConferenceRooms } from "./conference-rooms"
import { GalleryModal } from "./gallery-modal"
import { NotificationsPanel } from "./notifications-panel"
import { BookingForm } from "./booking-form"
import { cn } from "@/lib/utils"

const locationLogos = [
  { id: "moskva", name: "MOSKVA", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop" },
  { id: "smartpoint", name: "SmArt.Point", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=200&fit=crop" },
  { id: "globus", name: "Globus", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop" },
]

const locationNames: Record<string, string> = {
  tebiren: "Tebiren",
  smartpoint: "SmArt.Point",
  globus: "Globus",
  moskva: "Moskva",
  sputnik: "Sputnik",
}

interface HomePageProps {
  onNavigate?: (tab: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [selectedLocation, setSelectedLocation] = useState("tebiren")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showConferenceRooms, setShowConferenceRooms] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingPlan, setBookingPlan] = useState({ name: "", price: "" })
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case "conference":
        setShowConferenceRooms(true)
        break
      case "workspace":
        setSelectedPlan("month")
        break
      case "promo":
        onNavigate?.("promotions")
        break
      case "community":
        onNavigate?.("profile")
        break
      case "events":
        onNavigate?.("promotions")
        break
      case "biometry":
        onNavigate?.("profile")
        break
    }
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleBookNow = (planName: string, planPrice: string) => {
    setBookingPlan({ name: planName, price: planPrice })
    setSelectedPlan(null)
    setShowBookingForm(true)
  }

  const handleBookingConfirm = () => {
    setShowBookingForm(false)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top Bar */}
      <div className="px-4 pt-4 flex items-center justify-between">
        <div className="flex-1">
          {showSearch ? (
            <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                onBlur={() => {
                  if (!searchQuery) setShowSearch(false)
                }}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowNotifications(true)}
          className="relative p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
      </div>

      {/* Location Logos */}
      <div className="px-4 pt-4">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar">
          {locationLogos.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc.id)}
              className={cn(
                "relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 transition-all",
                selectedLocation === loc.id
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "ring-2 ring-border ring-offset-2 ring-offset-background opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={loc.image}
                alt={loc.name}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Location Selector */}
      <div className="px-4 mt-4 flex items-center justify-between">
        <span className="text-muted-foreground">выбранный объект:</span>
        <LocationSelector
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
        />
      </div>

      {/* Business Park Header */}
      <div className="px-4 mt-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            {locationNames[selectedLocation] || "Tebiren"}
          </h1>
          <p className="text-muted-foreground text-sm">бизнес-парк</p>
        </div>
        <button 
          onClick={() => setShowGallery(true)}
          className="px-4 py-2 border border-border rounded-full text-sm hover:bg-secondary transition-colors"
        >
          галерея
        </button>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <QuickActions onActionClick={handleActionClick} />
      </div>

      {/* Pricing Section */}
      <div className="px-4 mt-8">
        <PricingCards onPlanSelect={handlePlanSelect} />
      </div>

      {/* Info Text */}
      <div className="px-4 mt-6">
        <p className="text-primary text-sm">
          доступно после покупки тарифа
        </p>
      </div>

      {/* Plan Detail Modal */}
      <PlanDetailModal
        planId={selectedPlan}
        onClose={() => setSelectedPlan(null)}
        onBookNow={handleBookNow}
      />

      {/* Conference Rooms */}
      <ConferenceRooms
        isOpen={showConferenceRooms}
        onClose={() => setShowConferenceRooms(false)}
        onRoomSelect={(roomId) => {
          setShowConferenceRooms(false)
          setBookingPlan({ name: `Переговорная ${roomId}`, price: "12 000 ₸/час" })
          setShowBookingForm(true)
        }}
      />

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        locationName={locationNames[selectedLocation] || "Tebiren"}
      />

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Booking Form */}
      <BookingForm
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        planName={bookingPlan.name}
        planPrice={bookingPlan.price}
        onConfirm={handleBookingConfirm}
      />
    </div>
  )
}
