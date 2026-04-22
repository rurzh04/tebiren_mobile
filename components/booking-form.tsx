"use client"

import { useState } from "react"
import { X, Calendar, Clock, MapPin, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface BookingFormProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  planPrice: string
  onConfirm: (booking: BookingData) => void
}

interface BookingData {
  date: string
  startTime: string
  endTime: string
  location: string
}

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
]

const locations = [
  { id: "tebiren", name: "Tebiren", address: "ул. Достык 5" },
  { id: "smartpoint", name: "SmArt.Point", address: "пр. Аль-Фараби 77" },
  { id: "globus", name: "Globus", address: "ул. Панфилова 100" },
  { id: "moskva", name: "Moskva", address: "пр. Абая 150" },
]

export function BookingForm({ isOpen, onClose, planName, planPrice, onConfirm }: BookingFormProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedStartTime, setSelectedStartTime] = useState("")
  const [selectedEndTime, setSelectedEndTime] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("tebiren")
  const [isConfirmed, setIsConfirmed] = useState(false)

  if (!isOpen) return null

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        value: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('ru-RU', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('ru-RU', { month: 'short' }),
      })
    }
    return dates
  }

  const dates = generateDates()

  const handleConfirm = () => {
    setIsConfirmed(true)
    setTimeout(() => {
      onConfirm({
        date: selectedDate,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
        location: selectedLocation,
      })
      setIsConfirmed(false)
      setStep(1)
      setSelectedDate("")
      setSelectedStartTime("")
      setSelectedEndTime("")
      onClose()
    }, 2000)
  }

  const canProceed = () => {
    if (step === 1) return selectedDate !== ""
    if (step === 2) return selectedStartTime !== "" && selectedEndTime !== ""
    if (step === 3) return selectedLocation !== ""
    return false
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={onClose}>
      <div 
        className="w-full bg-background rounded-t-3xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold">{planName}</h2>
            <p className="text-primary font-medium">{planPrice}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-2 px-4 py-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "flex-1 h-1 rounded-full transition-colors",
                s <= step ? "bg-primary" : "bg-secondary"
              )}
            />
          ))}
        </div>

        {isConfirmed ? (
          /* Success State */
          <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-in zoom-in">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-center">Бронирование подтверждено!</h3>
            <p className="text-muted-foreground text-center mt-2">
              Детали отправлены на вашу почту
            </p>
          </div>
        ) : (
          <>
            {/* Step 1: Date Selection */}
            {step === 1 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Выберите дату</h3>
                </div>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDate(d.value)}
                      className={cn(
                        "flex flex-col items-center min-w-[60px] p-3 rounded-xl border transition-all",
                        selectedDate === d.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <span className="text-xs text-muted-foreground uppercase">{d.day}</span>
                      <span className="text-lg font-semibold mt-1">{d.date}</span>
                      <span className="text-xs text-muted-foreground">{d.month}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Time Selection */}
            {step === 2 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Выберите время</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">Начало</p>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3">
                  {timeSlots.slice(0, -1).map((time) => (
                    <button
                      key={`start-${time}`}
                      onClick={() => {
                        setSelectedStartTime(time)
                        if (selectedEndTime && selectedEndTime <= time) {
                          setSelectedEndTime("")
                        }
                      }}
                      className={cn(
                        "px-4 py-2 rounded-xl border whitespace-nowrap transition-all",
                        selectedStartTime === time
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-2 mt-3">Конец</p>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                  {timeSlots.slice(1).map((time) => (
                    <button
                      key={`end-${time}`}
                      onClick={() => setSelectedEndTime(time)}
                      disabled={!selectedStartTime || time <= selectedStartTime}
                      className={cn(
                        "px-4 py-2 rounded-xl border whitespace-nowrap transition-all",
                        selectedEndTime === time
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50",
                        (!selectedStartTime || time <= selectedStartTime) && "opacity-40 cursor-not-allowed"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Location Selection */}
            {step === 3 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Выберите локацию</h3>
                </div>
                <div className="space-y-3">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.id)}
                      className={cn(
                        "w-full p-4 rounded-xl border text-left transition-all",
                        selectedLocation === loc.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <p className="font-medium">{loc.name}</p>
                      <p className="text-sm text-muted-foreground">{loc.address}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="p-4 border-t border-border flex gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 rounded-xl border border-border hover:bg-secondary transition-colors"
                >
                  Назад
                </button>
              )}
              <button
                onClick={() => {
                  if (step < 3) {
                    setStep(step + 1)
                  } else {
                    handleConfirm()
                  }
                }}
                disabled={!canProceed()}
                className={cn(
                  "flex-1 py-3 rounded-xl font-medium transition-all",
                  canProceed()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                )}
              >
                {step < 3 ? "Далее" : "Забронировать"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
