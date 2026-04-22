"use client"

import { useState } from "react"
import { X, Camera, Check } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface PersonalDataModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PersonalDataModal({ isOpen, onClose }: PersonalDataModalProps) {
  const [formData, setFormData] = useState({
    firstName: "Arnat",
    lastName: "Aitzhan",
    email: "arnat@example.com",
    phone: "+7 708 480 9418",
    company: "Tech Corp",
    position: "Developer",
  })
  const [isSaved, setIsSaved] = useState(false)

  if (!isOpen) return null

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={onClose}>
      <div 
        className="w-full bg-background rounded-t-3xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Личные данные</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSaved ? (
          <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-in zoom-in">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Данные сохранены!</h3>
          </div>
        ) : (
          <div className="p-4 overflow-y-auto max-h-[70vh]">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-border">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Camera className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Имя</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Фамилия</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Телефон</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Компания</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Должность</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full mt-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Сохранить
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
