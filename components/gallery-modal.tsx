"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const galleryImages = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    title: "Open Space",
    description: "Просторная рабочая зона",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    title: "Переговорная",
    description: "Комната для встреч до 10 человек",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    title: "Кофе-поинт",
    description: "Зона отдыха с кофемашиной",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    title: "Ресепшн",
    description: "Главный вход",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=600&fit=crop",
    title: "Лаунж зона",
    description: "Место для неформальных встреч",
  },
]

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  locationName: string
}

export function GalleryModal({ isOpen, onClose, locationName }: GalleryModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "single">("grid")

  if (!isOpen) return null

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90" onClick={onClose}>
      <div 
        className="h-full flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-white">
            Галерея {locationName}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {viewMode === "grid" ? (
          /* Grid View */
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => {
                    setSelectedIndex(index)
                    setViewMode("single")
                  }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium">{image.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Single Image View */
          <div className="flex-1 flex flex-col">
            <div className="flex-1 relative">
              <Image
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].title}
                fill
                className="object-contain"
              />
              
              {/* Navigation arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Image info */}
            <div className="p-4 bg-black/50">
              <h3 className="text-white font-semibold">
                {galleryImages[selectedIndex].title}
              </h3>
              <p className="text-white/70 text-sm mt-1">
                {galleryImages[selectedIndex].description}
              </p>
              
              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0",
                      index === selectedIndex && "ring-2 ring-primary"
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setViewMode("grid")}
                className="mt-4 text-primary text-sm"
              >
                Показать все фото
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
