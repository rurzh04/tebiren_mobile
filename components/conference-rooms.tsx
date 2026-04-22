"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ConferenceRoom {
  id: string
  name: string
  capacity: number
  pricePerHour: string
  image: string
}

const conferenceRooms: ConferenceRoom[] = [
  {
    id: "koktem",
    name: "КӨКТЕМ",
    capacity: 10,
    pricePerHour: "12 000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "arbat",
    name: "АРБАТ",
    capacity: 10,
    pricePerHour: "12 000",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "samal",
    name: "САМАЛ",
    capacity: 10,
    pricePerHour: "12 000",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&auto=format&fit=crop&q=80",
  },
]

interface ConferenceRoomsProps {
  isOpen: boolean
  onClose: () => void
  onRoomSelect: (roomId: string) => void
}

export function ConferenceRooms({ isOpen, onClose, onRoomSelect }: ConferenceRoomsProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button
          onClick={onClose}
          className="text-primary"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium">Переговорные комнаты</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <h2 className="text-xl font-medium mb-6">организуй встречи легко</h2>

        <div className="space-y-6">
          {conferenceRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onRoomSelect(room.id)}
              className="w-full text-left"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    до {room.capacity} чел.
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <ChevronRight className="w-6 h-6 text-foreground bg-muted/50 rounded-full p-1" />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <h3 className="font-medium">{room.name}</h3>
                <span className="text-muted-foreground">{room.pricePerHour} ₸ за час</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
