"use client"

import { useState, useEffect } from "react"
import { useLang } from "@/contexts/language-context"
import { X, Check } from "lucide-react"

interface PersonalDataModalProps {
    isOpen: boolean
    onClose: () => void
}

export function PersonalDataModal({ isOpen, onClose }: PersonalDataModalProps) {
    const { t } = useLang()
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        nickname: "",
    })
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        if (!isOpen) return
        try {
            const raw = localStorage.getItem("user")
            if (!raw) return
            const u = JSON.parse(raw)

            // email: contacts может быть массивом или объектом
            let email = ""
            if (Array.isArray(u.contacts)) {
                email = u.contacts.find((c: any) => c.vendor === "email")?.value ?? ""
            } else if (u.contacts?.vendor === "email") {
                email = u.contacts.value ?? ""
            }

            setFormData({
                full_name: u.full_name ?? "",
                email,
                nickname: u.nickname ?? "",
            })
        } catch {}
    }, [isOpen])

    if (!isOpen) return null

    const handleSave = () => {
        // Сохраняем обновлённые данные обратно в localStorage
        try {
            const raw = localStorage.getItem("user")
            const u = raw ? JSON.parse(raw) : {}
            localStorage.setItem("user", JSON.stringify({ ...u, full_name: formData.full_name, nickname: formData.nickname }))
        } catch {}
        setIsSaved(true)
        setTimeout(() => { setIsSaved(false); onClose() }, 1400)
    }

    // Инициалы из full_name
    const getInitials = (name: string) => {
        const parts = name.trim().split(" ")
        return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={onClose}>
            <div
                className="w-full bg-background rounded-t-3xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-lg font-semibold">{t.personalData.title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {isSaved ? (
                    <div className="p-8 flex flex-col items-center justify-center min-h-[260px]">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-in zoom-in">
                            <Check className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">{t.personalData.saved}</h3>
                    </div>
                ) : (
                    <div className="p-4 overflow-y-auto max-h-[70vh]">
                        {/* Аватар — инициалы, без фото */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold ring-4 ring-border">
                                {getInitials(formData.full_name) || "?"}
                            </div>
                        </div>

                        {/* Форма — только поля которые есть в API */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-muted-foreground mb-1 block">
                                    {t.personalData.firstName}
                                </label>
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-muted-foreground mb-1 block">Никнейм</label>
                                <input
                                    type="text"
                                    value={formData.nickname}
                                    onChange={e => setFormData({ ...formData, nickname: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-muted-foreground cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full mt-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                        >
                            {t.personalData.save}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}