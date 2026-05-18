'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const API = "http://localhost:8000"

export default function LoginPage() {
    const router = useRouter()
    const [step, setStep] = useState<1|2|3>(1)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState(['','','',''])
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const otpRefs = useRef<(HTMLInputElement|null)[]>([])

    const err = (m: string) => { setError(m); setSuccess('') }
    const ok = (m: string) => { setSuccess(m); setError('') }
    const hide = () => { setError(''); setSuccess('') }
    const go = (n: 1|2|3) => { setStep(n); hide() }

    const sendOtp = async (mail: string) => {
        const r = await fetch(`${API}/api/login/otp`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: mail })
        })
        const d = await r.json()
        if (d.status === 200) { setOtp(['','','','']); go(2) }
        else err('Не удалось отправить код')
    }

    const checkEmail = async () => {
        if (!email || !email.includes('@')) { err('Введите корректный email'); return }
        setLoading(true); hide()
        try {
            const r = await fetch(`${API}/api/login/check`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: email })
            })
            const d = await r.json()
            if (d.status === 200) await sendOtp(email)
            else err(d.message?.[0] || 'Аккаунт не найден')
        } catch { err('Ошибка соединения') }
        finally { setLoading(false) }
    }

    const doLogin = async () => {
        if (!password) { err('Введите пароль'); return }
        setLoading(true); hide()
        try {
            const r = await fetch(`${API}/api/login`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: email, password })
            })
            const d = await r.json()
            if (d.token) {
                document.cookie = `auth_token=${d.token}; path=/; max-age=86400`
                localStorage.setItem("user", JSON.stringify(d.user))

                ok('Успешно! Входим...')
                setTimeout(() => {
                    router.push('/')
                    router.refresh()
                }, 1000)
            }else err('Неверный пароль')
        } catch { err('Ошибка при входе') }
        finally { setLoading(false) }
    }

    const c = {
        page: { minHeight:'100svh', background:'#0c0c0e', display:'flex', alignItems:'center', justifyContent:'center', padding:16 } as const,
        wrap: { width:'100%', maxWidth:390, display:'flex', flexDirection:'column' as const },
        logoArea: { display:'flex', flexDirection:'column' as const, alignItems:'center', paddingTop:56, paddingBottom:36 },
        logoBox: { width:64, height:64, borderRadius:20, background:'#6366f1', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, marginBottom:14 },
        logoN: { fontSize:26, fontWeight:700, color:'#fff', letterSpacing:'-.3px' },
        logoS: { fontSize:13, color:'#505060', marginTop:4 },
        tabRow: { display:'flex', background:'#141416', borderRadius:12, padding:3, marginBottom:24, border:'1px solid #2a2a2f' },
        tab: (on: boolean) => ({ flex:1, textAlign:'center' as const, padding:'9px 0', borderRadius:9, fontSize:14, fontWeight:500, color: on ? '#fff' : '#a0a0b0', background: on ? '#6366f1' : 'transparent', cursor:'pointer', transition:'.2s', border:'none' }),
        errBox: { background:'#1a0e0e', border:'1px solid #3d1515', borderRadius:10, padding:'10px 12px', color:'#f87171', fontSize:13, display:'flex', alignItems:'center', gap:8, marginBottom:14 },
        okBox: { background:'#0d1a12', border:'1px solid #14532d', borderRadius:10, padding:'10px 12px', color:'#4ade80', fontSize:13, display:'flex', alignItems:'center', gap:8, marginBottom:14 },
        title: { fontSize:24, fontWeight:700, color:'#fff', lineHeight:1.25, marginBottom:6 },
        sub: { fontSize:13, color:'#a0a0b0', lineHeight:1.5, marginBottom:20 },
        chip: { background:'#1c1c1f', border:'1px solid #2a2a2f', borderRadius:20, padding:'5px 12px', display:'inline-flex', alignItems:'center', gap:6, color:'#a0a0b0', fontSize:13, marginBottom:16 },
        lbl: { fontSize:11, fontWeight:600, color:'#505060', letterSpacing:'.6px', textTransform:'uppercase' as const, marginBottom:7 },
        field: { display:'flex', alignItems:'center', gap:10, background:'#141416', border:'1px solid #2a2a2f', borderRadius:13, padding:'13px 15px', marginBottom:12 },
        inp: { background:'none', border:'none', outline:'none', color:'#fff', fontSize:15, flex:1, width:'100%', fontFamily:'inherit' },
        otp4: { display:'flex', gap:10, marginBottom:14 },
        oc: { flex:1, textAlign:'center' as const, fontSize:6, fontWeight:700, color:'#fff', background:'#141416', border:'1px solid #2a2a2f', borderRadius:14, outline:'none', fontFamily:'inherit', padding:'14px 0px' },
        btn: { width:'100%', padding:15, background:'#6366f1', color:'#fff', border:'none', borderRadius:13, fontSize:15, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'inherit', marginTop:8 },
        btnOut: { width:'100%', padding:13, background:'transparent', color:'#a0a0b0', border:'1px solid #2a2a2f', borderRadius:13, fontSize:14, cursor:'pointer', fontFamily:'inherit', marginTop:8 },
        hint: { textAlign:'center' as const, fontSize:13, color:'#505060', marginTop:14 },
        eyeBtn: { background:'none', border:'none', color:'#505060', cursor:'pointer', padding:0, fontSize:18, display:'flex', alignItems:'center' },
    }

    return (
        <div style={c.page}>
            <div style={c.wrap}>
                <div style={c.logoArea}>
                    <div style={c.logoBox}>⚡</div>
                    <div style={c.logoN}>Tebiren</div>
                    <div style={c.logoS}>Войдите в аккаунт</div>
                </div>

                <div style={c.tabRow}>
                    <button style={c.tab(true)} onClick={() => router.push('/login')}>Вход</button>
                    <button style={c.tab(false)} onClick={() => router.push('/register')}>Регистрация</button>
                </div>

                {error && <div style={c.errBox}>⚠ {error}</div>}
                {success && <div style={c.okBox}>✓ {success}</div>}

                {step === 1 && (
                    <div>
                        <p style={c.title}>Добро<br/>пожаловать</p>
                        <p style={c.sub}>Введите email чтобы продолжить</p>
                        <div style={c.lbl}>Email</div>
                        <div style={c.field}>
                            <span style={{color:'#505060',fontSize:18}}>@</span>
                            <input style={c.inp} type="email" placeholder="your@email.com"
                                   value={email} onChange={e => setEmail(e.target.value)}
                                   onKeyDown={e => e.key==='Enter' && checkEmail()} autoFocus />
                        </div>
                        <div style={{flex:1, height:24}} />
                        <button style={c.btn} onClick={checkEmail} disabled={loading}>
                            {loading ? 'Проверяем...' : 'Продолжить →'}
                        </button>
                        <div style={c.hint}>
                            Нет аккаунта? <a href="/register" style={{color:'#6366f1', textDecoration:'none', fontWeight:500}}>Зарегистрироваться</a>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <p style={c.title}>Код<br/>подтверждения</p>
                        <div style={c.chip}>✉ {email}</div>
                        <p style={c.sub}>Отправили 4-значный код на email</p>
                        <div style={c.otp4}>
                            {otp.map((v, i) => (
                                <input key={i}
                                       ref={el => otpRefs.current[i] = el}
                                       style={c.oc} type="text" maxLength={1} inputMode="numeric" value={v}
                                       onChange={e => {
                                           const val = e.target.value.replace(/\D/,'')
                                           const next = [...otp]; next[i] = val; setOtp(next)
                                           if (val && i < 3) otpRefs.current[i+1]?.focus()
                                       }}
                                       onKeyDown={e => { if (e.key==='Backspace' && !v && i>0) otpRefs.current[i-1]?.focus() }}
                                />
                            ))}
                        </div>
                        <div style={{flex:1, height:24}} />
                        <button style={c.btn} onClick={() => {
                            if (otp.join('').length < 4) { err('Введите 4 цифры'); return }
                            go(3); setTimeout(() => document.getElementById('l-pass')?.focus(), 200)
                        }}>Подтвердить</button>
                        <button style={c.btnOut} onClick={() => sendOtp(email)}>Отправить снова</button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <p style={c.title}>Введите<br/>пароль</p>
                        <div style={c.chip}>✉ {email}</div>
                        <div style={c.lbl}>Пароль</div>
                        <div style={c.field}>
                            <span style={{color:'#505060',fontSize:18}}>🔒</span>
                            <input id="l-pass" style={c.inp} type={showPass ? 'text' : 'password'}
                                   placeholder="Ваш пароль" value={password}
                                   onChange={e => setPassword(e.target.value)}
                                   onKeyDown={e => e.key==='Enter' && doLogin()} autoFocus />
                            <button style={c.eyeBtn} onClick={() => setShowPass(!showPass)}>
                                {showPass ? '🙈' : '👁'}
                            </button>
                        </div>
                        <div style={{flex:1, height:24}} />
                        <button style={c.btn} onClick={doLogin} disabled={loading}>
                            {loading ? 'Входим...' : 'Войти'}
                        </button>
                        <button style={c.btnOut} onClick={() => go(1)}>← Изменить email</button>
                    </div>
                )}
            </div>
        </div>
    )
}
