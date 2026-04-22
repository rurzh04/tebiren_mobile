"use client"

import { useState } from "react"
import { ChevronRight, MapPin, Clock, Calendar, X, QrCode, Phone, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

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
  {
    id: "1",
    location: "Tebiren",
    type: "Рабочее место Open Space",
    date: "15 марта 2026",
    time: "09:00 - 18:00",
    status: "active",
    price: "8 000 ₸",
    qrCode: "BOOK-2026-001",
  },
  {
    id: "2",
    location: "SmArt.Point",
    type: "Переговорная КОКТЕМ",
    date: "16 марта 2026",
    time: "14:00 - 16:00",
    status: "active",
    price: "24 000 ₸",
    qrCode: "BOOK-2026-002",
  },
  {
    id: "3",
    location: "Moskva",
    type: "Рабочее место Open Space",
    date: "10 марта 2026",
    time: "10:00 - 19:00",
    status: "completed",
    price: "8 000 ₸",
  },
  {
    id: "4",
    location: "Tebiren",
    type: "Переговорная АРБАТ",
    date: "5 марта 2026",
    time: "10:00 - 12:00",
    status: "cancelled",
    price: "24 000 ₸",
  },
]

export function BookingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("active")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState<string | null>(null)

  const filteredBookings = mockBookings.filter((booking) =>
    activeTab === "active"
      ? booking.status === "active"
      : booking.status === "completed" || booking.status === "cancelled"
  )

  const handleCancelBooking = (bookingId: string) => {
    // In real app, this would call an API
    setShowCancelConfirm(null)
    setSelectedBooking(null)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-medium text-center">мои брони</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-6">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("active")}
            className={cn(
              "flex-1 pb-3 text-center font-medium transition-colors",
              activeTab === "active"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground"
            )}
          >
            активные
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "flex-1 pb-3 text-center font-medium transition-colors",
              activeTab === "history"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground"
            )}
          >
            история
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {activeTab === "active"
                ? "У вас нет активных бронирований"
                : "История бронирований пуста"}
            </p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <BookingCard 
              key={booking.id} 
              booking={booking}
              onSelect={() => setSelectedBooking(booking)}
            />
          ))
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setSelectedBooking(null)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Детали бронирования</h2>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  selectedBooking.status === "active"
                    ? "bg-primary/20 text-primary"
                    : selectedBooking.status === "completed"
                    ? "bg-muted text-muted-foreground"
                    : "bg-destructive/20 text-destructive"
                )}>
                  {selectedBooking.status === "active" ? "Активно" : selectedBooking.status === "completed" ? "Завершено" : "Отменено"}
                </span>
                <span className="text-lg font-bold">{selectedBooking.price}</span>
              </div>

              {/* Booking Info */}
              <h3 className="text-xl font-semibold mb-4">{selectedBooking.type}</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Локация</p>
                    <p className="font-medium">{selectedBooking.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Дата</p>
                    <p className="font-medium">{selectedBooking.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Время</p>
                    <p className="font-medium">{selectedBooking.time}</p>
                  </div>
                </div>
              </div>

              {/* QR Code for active bookings */}
              {selectedBooking.status === "active" && selectedBooking.qrCode && (
                <div className="bg-card rounded-2xl p-6 mb-6 text-center">
                  <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center mb-3">
                    <QrCode className="w-24 h-24 text-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Код бронирования</p>
                  <p className="font-mono font-bold text-lg">{selectedBooking.qrCode}</p>
                </div>
              )}

              {/* Actions */}
              {selectedBooking.status === "active" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelConfirm(selectedBooking.id)}
                    className="flex-1 py-4 rounded-xl border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    Отменить
                  </button>
                  <button className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Связаться
                  </button>
                </div>
              )}

              {selectedBooking.status === "completed" && (
                <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Забронировать снова
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowCancelConfirm(null)}>
          <div 
            className="bg-card rounded-2xl p-6 w-full max-w-sm animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-center">Отменить бронирование?</h3>
            <p className="text-muted-foreground text-center mt-2 text-sm">
              Средства будут возвращены на ваш баланс в течение 24 часов
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCancelConfirm(null)}
                className="flex-1 py-3 rounded-xl border border-border hover:bg-secondary transition-colors"
              >
                Нет
              </button>
              <button
                onClick={() => handleCancelBooking(showCancelConfirm)}
                className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                Да, отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function BookingCard({ booking, onSelect }: { booking: Booking; onSelect: () => void }) {
  return (
    <button 
      onClick={onSelect}
      className="w-full bg-card rounded-2xl p-4 text-left hover:bg-card/80 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              booking.status === "active"
                ? "bg-primary/20 text-primary"
                : booking.status === "completed"
                ? "bg-muted text-muted-foreground"
                : "bg-destructive/20 text-destructive"
            )}>
              {booking.status === "active" ? "активно" : booking.status === "completed" ? "завершено" : "отменено"}
            </span>
            <span className="text-sm font-medium text-primary">{booking.price}</span>
          </div>
          
          <h3 className="font-medium text-foreground mb-3">{booking.type}</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{booking.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{booking.time}</span>
            </div>
          </div>
        </div>
        
        <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
      </div>
    </button>
  )
}
