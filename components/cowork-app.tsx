"use client"

import { useState } from "react"
import { BottomNavigation, type TabType } from "./bottom-navigation"
import { HomePage } from "./home-page"
import { PromotionsPage } from "./promotions-page"
import { BookingsPage } from "./bookings-page"
import { CouponsPage } from "./coupons-page"
import { ProfilePage } from "./profile-page"

export function CoworkApp() {
  const [activeTab, setActiveTab] = useState<TabType>("home")

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as TabType)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Content */}
      <main>
        {activeTab === "home" && <HomePage onNavigate={handleNavigate} />}
        {activeTab === "promotions" && <PromotionsPage />}
        {activeTab === "bookings" && <BookingsPage />}
        {activeTab === "coupons" && <CouponsPage />}
        {activeTab === "profile" && <ProfilePage />}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  )
}
