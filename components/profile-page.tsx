"use client"

import { useEffect, useState } from "react"
import {
    ChevronRight,
    Bell,
    LogOut,
    User,
    Building2,
    CreditCard,
    Users,
    Phone,
    Info,
    Languages,
    Moon,
    Sun
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

import { NotificationsPanel } from "./notifications-panel"
import { PersonalDataModal } from "./personal-data-modal"
import { SettingsModal } from "./settings-modal"

interface MenuItem {
    id: string
    label: string
    icon: React.ReactNode
    isDestructive?: boolean
}

export function ProfilePage() {
    const { theme, setTheme } = useTheme()

    const [user, setUser] = useState<any>(null)

    const [showNotifications, setShowNotifications] = useState(false)
    const [showPersonalData, setShowPersonalData] = useState(false)
    const [settingsModal, setSettingsModal] = useState<"theme" | "language" | null>(null)
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

    useEffect(() => {
        const u = localStorage.getItem("user")
        if (u) setUser(JSON.parse(u))
    }, [])

    // =========================
    // AVATAR LOGIC
    // =========================
    const getInitials = (name?: string) => {
        if (!name) return "U"

        const parts = name.trim().split(" ")
        const first = parts[0]?.[0] || ""
        const second = parts[1]?.[0] || ""

        return (first + second).toUpperCase()
    }

    const getAvatarColor = (name?: string) => {
        if (!name) return "from-gray-500 to-gray-600"

        const colors = [
            "from-indigo-500 to-violet-600",
            "from-pink-500 to-rose-500",
            "from-emerald-500 to-teal-600",
            "from-blue-500 to-cyan-600",
            "from-orange-500 to-yellow-500",
        ]

        let hash = 0
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash)
        }

        return colors[Math.abs(hash) % colors.length]
    }

    const handleMenuClick = (itemId: string) => {
        switch (itemId) {
            case "personal":
                setShowPersonalData(true)
                break
            case "language":
                setSettingsModal("language")
                break
            case "theme":
                setSettingsModal("theme")
                break
            case "logout":
                setShowLogoutConfirm(true)
                break
            case "contact":
                window.open("https://wa.me/77084809418", "_blank")
                break
        }
    }

    const logout = () => {
        localStorage.removeItem("user")
        document.cookie = "auth_token=; path=/; max-age=0"
        window.location.href = "/login"
    }

    const personalMenuItems: MenuItem[] = [
        { id: "personal", label: "личные данные", icon: <User className="w-5 h-5" /> },
    ]

    const coworkingMenuItems: MenuItem[] = [
        { id: "access", label: "данные для входа в коворкинг", icon: <Building2 className="w-5 h-5" /> },
        { id: "balance", label: "лимитный счет", icon: <CreditCard className="w-5 h-5" /> },
        { id: "community", label: "моя карточка в сообществе", icon: <Users className="w-5 h-5" /> },
    ]

    const crmMenuItem: MenuItem = {
        id: "crm",
        label: "перейти в CRM",
        icon: <Building2 className="w-5 h-5" />,
    }

    const supportMenuItems: MenuItem[] = [
        { id: "contact", label: "связаться с нами", icon: <Phone className="w-5 h-5" /> },
        { id: "about", label: "о приложении", icon: <Info className="w-5 h-5" /> },
        { id: "language", label: "выбор языка", icon: <Languages className="w-5 h-5" /> },
        { id: "theme", label: "тема оформления", icon: <Moon className="w-5 h-5" /> },
        { id: "logout", label: "выйти из аккаунта", icon: <LogOut className="w-5 h-5" />, isDestructive: true },
    ]

    return (
        <div className="min-h-screen bg-background pb-24">

            {/* HEADER */}
            <div className="flex justify-end gap-3 px-4 pt-4">
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-12 h-12 rounded-xl border border-border flex items-center justify-center"
                >
                    {theme === "dark"
                        ? <Sun className="w-5 h-5" />
                        : <Moon className="w-5 h-5" />
                    }
                </button>

                <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center">
                    crm
                </button>

                <button
                    onClick={() => setShowNotifications(true)}
                    className="w-12 h-12 rounded-xl border border-border flex items-center justify-center relative"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                </button>
            </div>

            {/* PROFILE */}
            <div className="flex flex-col items-center px-4 py-6">

                {/* AVATAR (NO IMAGE) */}
                <div
                    className={`w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold ring-4 ring-border bg-gradient-to-br ${getAvatarColor(user?.full_name)}`}
                >
                    {getInitials(user?.full_name)}
                </div>

                <h1 className="text-xl font-semibold mt-4">
                    {user?.full_name || "User"}
                </h1>

                <p className="text-muted-foreground">
                    {user?.contacts?.value || "no email"}
                </p>

                <p className="text-xs text-primary mt-1">
                    {user?.groups?.[0]?.name || "user"}
                </p>

                {/* BALANCE */}
                <div className="w-full mt-6 p-4 rounded-2xl border">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Баланс</p>
                            <p className="text-2xl font-bold text-primary">
                                {user?.balance ?? 0} ₸
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-primary text-white rounded-xl">
                            Пополнить
                        </button>
                    </div>
                </div>
            </div>

            {/* MENU */}
            <div className="px-4 space-y-4">

                <MenuSection items={personalMenuItems} onItemClick={handleMenuClick} />

                <div className="bg-card rounded-2xl overflow-hidden">
                    <div className="px-4 py-2 text-xs text-primary">КОВОРКИНГ</div>
                    {coworkingMenuItems.map((item, i) => (
                        <MenuItemRow
                            key={item.id}
                            item={item}
                            isLast={i === coworkingMenuItems.length - 1}
                            onClick={() => handleMenuClick(item.id)}
                        />
                    ))}
                </div>

                <MenuSection items={[crmMenuItem]} onItemClick={handleMenuClick} />

                <MenuSection items={supportMenuItems} onItemClick={handleMenuClick} />
            </div>

            {/* MODALS */}
            <NotificationsPanel
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
            />

            <PersonalDataModal
                isOpen={showPersonalData}
                onClose={() => setShowPersonalData(false)}
            />

            {settingsModal && (
                <SettingsModal
                    isOpen={!!settingsModal}
                    onClose={() => setSettingsModal(null)}
                    type={settingsModal}
                />
            )}

            {/* LOGOUT */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-card p-6 rounded-2xl w-[300px]">

                        <h3 className="text-center font-semibold">Выйти?</h3>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 border rounded-xl py-2"
                            >
                                Отмена
                            </button>

                            <button
                                onClick={logout}
                                className="flex-1 bg-red-500 text-white rounded-xl py-2"
                            >
                                Выйти
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

/* ================= UI ================= */

function MenuSection({ items, onItemClick }: any) {
    return (
        <div className="bg-card rounded-2xl overflow-hidden">
            {items.map((item: MenuItem, i: number) => (
                <MenuItemRow
                    key={item.id}
                    item={item}
                    isLast={i === items.length - 1}
                    onClick={() => onItemClick(item.id)}
                />
            ))}
        </div>
    )
}

function MenuItemRow({ item, isLast, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex justify-between px-4 py-4",
                !isLast && "border-b"
            )}
        >
            <span className={item.isDestructive ? "text-red-500" : ""}>
                {item.label}
            </span>

            {item.isDestructive ? (
                <LogOut className="w-5 h-5 text-red-500" />
            ) : (
                <ChevronRight className="w-5 h-5 opacity-60" />
            )}
        </button>
    )
}