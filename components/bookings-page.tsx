"use client"

import { useState } from "react"
import { ChevronRight, MapPin, Clock, Calendar, X, QrCode, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLang } from "@/contexts/language-context"

type TabType = "active" | "history"

interface Booking {
  id: string
  location: string
  type: string
  date: string
  time: string
  status: "active" | "completed" | "cancelled"
  price: string
  qrCode?: string
}

const mockBookings: Booking[] = [
  { id: "1", location: "Tebiren", type: "Рабочее место Open Space", date: "15 марта 2026", time: "09:00 - 18:00", status: "active", price: "8 000 ₸", qrCode: "BOOK-2026-001" },
  { id: "2", location: "SmArt.Point", type: "Переговорная КОКТЕМ", date: "16 марта 2026", time: "14:00 - 16:00", status: "active", price: "24 000 ₸", qrCode: "BOOK-2026-002" },
  { id: "3", location: "Moskva", type: "Рабочее место Open Space", date: "10 марта 2026", time: "10:00 - 19:00", status: "completed", price: "8 000 ₸" },
  { id: "4", location: "Tebiren", type: "Переговорная АРБАТ", date: "5 марта 2026", time: "10:00 - 12:00", status: "cancelled", price: "24 000 ₸" },
]

export function BookingsPage() {
  const { t } = useLang()
  const [activeTab, setActiveTab] = useState<TabType>("active")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState<string | null>(null)

  const filteredBookings = mockBookings.filter((booking) =>
      activeTab === "active" ? booking.status === "active" : booking.status === "completed" || booking.status === "cancelled"
  )

  const handleCancelBooking = (_bookingId: string) => {
    setShowCancelConfirm(null)
    setSelectedBooking(null)
  }

  const statusLabel = (status: Booking["status"]) => {
    if (status === "active") return t.bookings.status.active
    if (status === "completed") return t.bookings.status.completed
    return t.bookings.status.cancelled
  }

  return (
      <div className="min-h-screen bg-background pb-24">
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-xl font-medium text-center">{t.bookings.title}</h1>
        </div>

        <div className="px-4 mb-6">
          <div className="flex border-b border-border">
            <button
                onClick={() => setActiveTab("active")}
                className={cn("flex-1 pb-3 text-center font-medium transition-colors",
                    activeTab === "active" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"
                )}
            >
              {t.bookings.active}
            </button>
            <button
                onClick={() => setActiveTab("history")}
                className={cn("flex-1 pb-3 text-center font-medium transition-colors",
                    activeTab === "history" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"
                )}
            >
              {t.bookings.history}
            </button>
          </div>
        </div>

        <div className="px-4 space-y-4">
          {filteredBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  {activeTab === "active" ? t.bookings.noActive : t.bookings.noHistory}
                </p>
              </div>
          ) : (
              filteredBookings.map((booking) => (
                  <button
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking)}
                      className="w-full bg-card rounded-2xl p-4 text-left hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium",
                        booking.status === "active" ? "bg-primary/20 text-primary"
                            : booking.status === "completed" ? "bg-muted text-muted-foreground"
                                : "bg-destructive/20 text-destructive"
                    )}>
                      {statusLabel(booking.status)}
                    </span>
                          <span className="text-sm font-medium text-primary">{booking.price}</span>
                        </div>
                        <h3 className="font-medium text-foreground mb-3">{booking.type}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" /><span>{booking.location}</span></div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="w-4 h-4" /><span>{booking.date}</span></div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4" /><span>{booking.time}</span></div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
                    </div>
                  </button>
              ))
          )}
        </div>

        {/* Booking Detail Modal */}
        {selectedBooking && (
            <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setSelectedBooking(null)}>
              <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="text-lg font-semibold">{t.bookings.bookingDetails}</h2>
                  <button onClick={() => setSelectedBooking(null)} className="p-2 rounded-full hover:bg-secondary transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                <span className={cn("px-3 py-1 rounded-full text-sm font-medium",
                    selectedBooking.status === "active" ? "bg-primary/20 text-primary"
                        : selectedBooking.status === "completed" ? "bg-muted text-muted-foreground"
                            : "bg-destructive/20 text-destructive"
                )}>
                  {statusLabel(selectedBooking.status)}
                </span>
                    <span className="text-lg font-bold">{selectedBooking.price}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{selectedBooking.type}</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"><MapPin className="w-5 h-5 text-muted-foreground" /></div><div><p className="text-sm text-muted-foreground">Location</p><p className="font-medium">{selectedBooking.location}</p></div></div>
                    <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"><Calendar className="w-5 h-5 text-muted-foreground" /></div><div><p className="text-sm text-muted-foreground">{t.bookings.active}</p><p className="font-medium">{selectedBooking.date}</p></div></div>
                    <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"><Clock className="w-5 h-5 text-muted-foreground" /></div><div><p className="text-sm text-muted-foreground">{t.bookingForm.time}</p><p className="font-medium">{selectedBooking.time}</p></div></div>
                  </div>
                  {selectedBooking.status === "active" && selectedBooking.qrCode && (
                      <div className="bg-card rounded-2xl p-6 mb-6 text-center">
                        <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center mb-3">
                          <QrCode className="w-24 h-24 text-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">{t.bookings.qrCode}</p>
                        <p className="font-mono font-bold text-lg">{selectedBooking.qrCode}</p>
                      </div>
                  )}
                  {selectedBooking.status === "active" && (
                      <div className="flex gap-3">
                        <button onClick={() => setShowCancelConfirm(selectedBooking.id)} className="flex-1 py-4 rounded-xl border border-destructive text-destructive hover:bg-destructive/10 transition-colors">
                          {t.bookings.cancel}
                        </button>
                        <button className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                          <Phone className="w-5 h-5" />{t.bookings.contact}
                        </button>
                      </div>
                  )}
                </div>
              </div>
            </div>
        )}

        {/* Cancel Confirmation */}
        {showCancelConfirm && (
            <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowCancelConfirm(null)}>
              <div className="bg-card rounded-2xl p-6 w-full max-w-sm animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-semibold text-center">{t.bookings.cancelConfirm}</h3>
                <p className="text-muted-foreground text-center mt-2 text-sm">{t.bookings.cancelDesc}</p>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowCancelConfirm(null)} className="flex-1 py-3 rounded-xl border border-border hover:bg-secondary transition-colors">
                    {t.profile.logoutCancel}
                  </button>
                  <button onClick={() => handleCancelBooking(showCancelConfirm)} className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">
                    {t.bookings.confirm}
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  )
}