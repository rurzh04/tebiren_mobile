"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const locations = [
  { id: "TEBIREN", name: "Tebiren", subtitle: "коворкинг" },
  { id: "smartpoint", name: "SmArt.Point", subtitle: "коворкинг" },
]

interface LocationSelectorProps {
  selectedLocation: string
  onLocationChange: (locationId: string) => void
}

export function LocationSelector({ selectedLocation, onLocationChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = locations.find(l => l.id === selectedLocation) || locations[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-primary font-medium"
      >
        <span>{selected.name}</span>
        <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-56 bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => {
                  onLocationChange(location.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 hover:bg-secondary transition-colors",
                  selectedLocation === location.id && "bg-secondary"
                )}
              >
                <span className="text-foreground">{location.name}</span>
                {selectedLocation === location.id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
