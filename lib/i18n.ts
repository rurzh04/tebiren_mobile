export type Language = "ru" | "kz"

export const translations = {
    ru: {
        // Bottom Navigation
        nav: {
            home: "главная",
            promotions: "акции",
            bookings: "брони",
            coupons: "купоны",
            profile: "профиль",
        },

        // Home Page
        home: {
            search: "Поиск...",
            selectedObject: "выбранный объект:",
            businessPark: "бизнес-парк",
            gallery: "галерея",
            availableAfterPurchase: "доступно после покупки тарифа",
        },

        // Quick Actions
        quickActions: {
            workspace: "рабочее место",
            conference: "конференц-залы",
            promo: "акции",
            biometry: "биометрия",
            community: "сообщество",
            events: "события",
            chat: "переговор...",
        },

        // Pricing Cards
        pricing: {
            title: "Тарифы",
            day1: "DAY 1",
            day5: "DAY 5",
            month: "Месяц",
            per_day: "₸/день",
            per_month: "₸/мес",
            book: "Забронировать",
            from: "от",
        },

        // Bookings Page
        bookings: {
            title: "Мои брони",
            active: "Активные",
            history: "История",
            noActive: "Нет активных броней",
            noHistory: "История пуста",
            cancel: "Отменить",
            cancelConfirm: "Отменить бронирование?",
            cancelDesc: "Это действие нельзя отменить",
            confirm: "Да, отменить",
            back: "Назад",
            qrCode: "QR-код",
            bookingDetails: "Детали бронирования",
            contact: "Связаться",
            status: {
                active: "Активно",
                completed: "Завершено",
                cancelled: "Отменено",
            },
        },

        // Promotions Page
        promotions: {
            title: "Акции",
            filter: "Фильтр",
            allLocations: "Все локации",
            daysLeft: "дн. осталось",
            conditions: "Условия акции",
            share: "Поделиться",
        },

        // Coupons Page
        coupons: {
            title: "Мои купоны",
            active: "Активные",
            used: "Использованные",
            addCoupon: "Добавить купон",
            enterCode: "Введите код купона",
            apply: "Применить",
            copy: "Скопировать",
            copied: "Скопировано!",
            validUntil: "до",
            minPurchase: "Мин. покупка",
            noActive: "Нет активных купонов",
            noUsed: "Нет использованных купонов",
            used_label: "Использован",
        },

        // Profile Page
        profile: {
            balance: "Баланс",
            topUp: "Пополнить",
            personalData: "личные данные",
            accessData: "данные для входа в коворкинг",
            limitAccount: "лимитный счет",
            communityCard: "моя карточка в сообществе",
            goToCrm: "перейти в CRM",
            contact: "связаться с нами",
            about: "о приложении",
            language: "выбор языка",
            theme: "тема оформления",
            logout: "выйти из аккаунта",
            coworking: "КОВОРКИНГ",
            logoutConfirm: "Выйти?",
            logoutCancel: "Отмена",
            logoutConfirmBtn: "Выйти",
        },

        // Settings Modal
        settings: {
            themeTitle: "Тема оформления",
            languageTitle: "Выбор языка",
            light: "Светлая",
            dark: "Тёмная",
            system: "Система",
        },

        // Personal Data Modal
        personalData: {
            title: "Личные данные",
            firstName: "Имя",
            lastName: "Фамилия",
            email: "Email",
        },

        // Notifications
        notifications: {
            title: "Уведомления",
            markAll: "Отметить все",
            empty: "Нет уведомлений",
        },

        // Booking Form
        bookingForm: {
            title: "Оформление брони",
            date: "Дата",
            time: "Время",
            duration: "Продолжительность",
            comment: "Комментарий",
            commentPlaceholder: "Дополнительные пожелания...",
            confirm: "Подтвердить",
            cancel: "Отмена",
        },

        // Conference Rooms
        conferenceRooms: {
            title: "Переговорные комнаты",
            capacity: "чел.",
            perHour: "₸/час",
            book: "Забронировать",
        },

        // Location Selector
        location: {
            selectTitle: "Выберите локацию",
        },

        // Gallery Modal
        gallery: {
            title: "Галерея",
        },

        // Login / Register
        auth: {
            loginTitle: "Войти",
            registerTitle: "Регистрация",
            email: "Email",
            password: "Пароль",
            confirmPassword: "Подтвердите пароль",
            name: "Имя",
            loginBtn: "Войти",
            registerBtn: "Зарегистрироваться",
            noAccount: "Нет аккаунта?",
            hasAccount: "Уже есть аккаунт?",
            register: "Зарегистрироваться",
            login: "Войти",
        },

        // Plan Detail Modal
        planDetail: {
            bookNow: "Забронировать",
            includes: "Включено",
        },
    },

    kz: {
        // Bottom Navigation
        nav: {
            home: "басты",
            promotions: "акциялар",
            bookings: "брондар",
            coupons: "купондар",
            profile: "профиль",
        },

        // Home Page
        home: {
            search: "Іздеу...",
            selectedObject: "таңдалған нысан:",
            businessPark: "бизнес-парк",
            gallery: "галерея",
            availableAfterPurchase: "тариф сатып алғаннан кейін қол жетімді",
        },

        // Quick Actions
        quickActions: {
            workspace: "жұмыс орны",
            conference: "конференц-залдар",
            promo: "акциялар",
            biometry: "биометрия",
            community: "қоғамдастық",
            events: "іс-шаралар",
            chat: "келіссөздер...",
        },

        // Pricing Cards
        pricing: {
            title: "Тарифтер",
            day1: "КҮН 1",
            day5: "КҮН 5",
            month: "Ай",
            per_day: "₸/күн",
            per_month: "₸/ай",
            book: "Брондау",
            from: "бастап",
        },

        // Bookings Page
        bookings: {
            title: "Брондарым",
            active: "Белсенді",
            history: "Тарих",
            noActive: "Белсенді брондар жоқ",
            noHistory: "Тарих бос",
            cancel: "Болдырмау",
            cancelConfirm: "Бронды болдырмау керек пе?",
            cancelDesc: "Бұл әрекетті кері қайтару мүмкін емес",
            confirm: "Иә, болдырмау",
            back: "Артқа",
            qrCode: "QR-код",
            bookingDetails: "Брон мәліметтері",
            contact: "Байланысу",
            status: {
                active: "Белсенді",
                completed: "Аяқталды",
                cancelled: "Болдырылмады",
            },
        },

        // Promotions Page
        promotions: {
            title: "Акциялар",
            filter: "Сүзгі",
            allLocations: "Барлық орналасулар",
            daysLeft: "күн қалды",
            conditions: "Акция шарттары",
            share: "Бөлісу",
        },

        // Coupons Page
        coupons: {
            title: "Купондарым",
            active: "Белсенді",
            used: "Пайдаланылған",
            addCoupon: "Купон қосу",
            enterCode: "Купон кодын енгізіңіз",
            apply: "Қолдану",
            copy: "Көшіру",
            copied: "Көшірілді!",
            validUntil: "дейін",
            minPurchase: "Мин. сатып алу",
            noActive: "Белсенді купондар жоқ",
            noUsed: "Пайдаланылған купондар жоқ",
            used_label: "Пайдаланылды",
        },

        // Profile Page
        profile: {
            balance: "Баланс",
            topUp: "Толтыру",
            personalData: "жеке деректер",
            accessData: "коворкингке кіру деректері",
            limitAccount: "лимиттік шот",
            communityCard: "қоғамдастықтағы карточкам",
            goToCrm: "CRM-ге өту",
            contact: "бізбен байланысу",
            about: "қолданба туралы",
            language: "тіл таңдау",
            theme: "безендіру тақырыбы",
            logout: "аккаунттан шығу",
            coworking: "КОВОРКИНГ",
            logoutConfirm: "Шығу керек пе?",
            logoutCancel: "Болдырмау",
            logoutConfirmBtn: "Шығу",
        },

        // Settings Modal
        settings: {
            themeTitle: "Безендіру тақырыбы",
            languageTitle: "Тіл таңдау",
            light: "Жарық",
            dark: "Қараңғы",
            system: "Жүйе",
        },

        // Personal Data Modal
        personalData: {
            title: "Жеке деректер",
            firstName: "Аты",
            lastName: "Тегі",
            email: "Email",
            phone: "Телефон",
            company: "Компания",
            position: "Лауазым",
            save: "Сақтау",
            saved: "Деректер сақталды!",
        },

        // Notifications
        notifications: {
            title: "Хабарламалар",
            markAll: "Барлығын белгілеу",
            empty: "Хабарламалар жоқ",
        },

        // Booking Form
        bookingForm: {
            title: "Бронды рәсімдеу",
            date: "Күні",
            time: "Уақыты",
            duration: "Ұзақтығы",
            comment: "Пікір",
            commentPlaceholder: "Қосымша тілектер...",
            confirm: "Растау",
            cancel: "Болдырмау",
        },

        // Conference Rooms
        conferenceRooms: {
            title: "Келіссөз бөлмелері",
            capacity: "адам",
            perHour: "₸/сағ",
            book: "Брондау",
        },

        // Location Selector
        location: {
            selectTitle: "Орналасуды таңдаңыз",
        },

        // Gallery Modal
        gallery: {
            title: "Галерея",
        },

        // Login / Register
        auth: {
            loginTitle: "Кіру",
            registerTitle: "Тіркелу",
            email: "Email",
            password: "Құпия сөз",
            confirmPassword: "Құпия сөзді растаңыз",
            name: "Аты",
            loginBtn: "Кіру",
            registerBtn: "Тіркелу",
            noAccount: "Аккаунт жоқ па?",
            hasAccount: "Аккаунт бар ма?",
            register: "Тіркелу",
            login: "Кіру",
        },

        // Plan Detail Modal
        planDetail: {
            bookNow: "Брондау",
            includes: "Кіреді",
        },
    },
}

export type Translations = typeof translations.ru