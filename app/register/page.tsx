'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL!

export default function RegisterPage() {
    const router = useRouter()
    const [step, setStep] = useState<1|2|3>(1)
    const [form, setForm] = useState({
        first_name: '', last_name: '', middle_name: '', nickname: '',
        email: '', password: '', password2: ''
    })
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(['','','',''])
    const otpRefs = useRef<(HTMLInputElement|null)[]>([])

    const set = (k: string, v: string) => setForm(f => ({...f, [k]: v}))
    const err = (m: string) => { setError(m); setSuccess('') }
    const ok = (m: string) => { setSuccess(m); setError('') }

    const goStep2 = () => {
        if (!form.first_name.trim()) { err('Введите имя'); return }
        if (!form.last_name.trim()) { err('Введите фамилию'); return }
        if (!form.nickname.trim()) { err('Введите никнейм'); return }
        setError(''); setStep(2)
    }

    const submit = async () => {
        if (!form.email || !form.email.includes('@')) { err('Введите корректный email'); return }
        if (form.password.length < 8) { err('Пароль минимум 8 символов'); return }
        if (form.password !== form.password2) { err('Пароли не совпадают'); return }
        setLoading(true); setError('')
        try {
            const r = await fetch(`${API}/api/register`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nickname: form.nickname,
                    first_name: form.first_name,
                    last_name: form.last_name,
                    middle_name: form.middle_name,
                    email: form.email,
                    password: form.password,
                })
            })
            const d = await r.json()
            if (d.token || d.status === 200 || d.status === 201) {
                ok('Аккаунт создан!')
                setOtp(['','','',''])
                setStep(3)
            } else err(d.message?.[0] || 'Ошибка регистрации')
        } catch { err('Ошибка соединения') }
        finally { setLoading(false) }
    }

    const confirmOtp = () => {
        if (otp.join('').length < 4) { err('Введите 4 цифры'); return }
        router.push('/login')
    }

    const resendOtp = async () => {
        // вызов эндпоинта повторной отправки, если есть
        ok('Код отправлен повторно')
    }

    const c = {
        page: { minHeight:'100svh', background:'#0c0c0e', display:'flex', alignItems:'center', justifyContent:'center', padding:16 } as const,
        wrap: { width:'100%', maxWidth:390, display:'flex', flexDirection:'column' as const },
        logoArea: { display:'flex', flexDirection:'column' as const, alignItems:'center', paddingTop:48, paddingBottom:28 },
        logoBox: { width:64, height:64, borderRadius:20, background:'#6366f1', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, marginBottom:14 },
        logoN: { fontSize:26, fontWeight:700, color:'#fff' },
        logoS: { fontSize:13, color:'#505060', marginTop:4 },
        tabRow: { display:'flex', background:'#141416', borderRadius:12, padding:3, marginBottom:24, border:'1px solid #2a2a2f' },
        tab: (on: boolean) => ({ flex:1, textAlign:'center' as const, padding:'9px 0', borderRadius:9, fontSize:14, fontWeight:500, color: on?'#fff':'#a0a0b0', background: on?'#6366f1':'transparent', cursor:'pointer', border:'none', fontFamily:'inherit' }),
        errBox: { background:'#1a0e0e', border:'1px solid #3d1515', borderRadius:10, padding:'10px 12px', color:'#f87171', fontSize:13, display:'flex', alignItems:'center', gap:8, marginBottom:14 },
        okBox: { background:'#0d1a12', border:'1px solid #14532d', borderRadius:10, padding:'10px 12px', color:'#4ade80', fontSize:13, display:'flex', alignItems:'center', gap:8, marginBottom:14 },
        title: { fontSize:24, fontWeight:700, color:'#fff', lineHeight:1.25, marginBottom:6 },
        sub: { fontSize:13, color:'#a0a0b0', lineHeight:1.5, marginBottom:20 },
        row2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 },
        lbl: { fontSize:11, fontWeight:600, color:'#505060', letterSpacing:'.6px', textTransform:'uppercase' as const, marginBottom:7 },
        field: { display:'flex', alignItems:'center', gap:10, background:'#141416', border:'1px solid #2a2a2f', borderRadius:13, padding:'13px 15px', marginBottom:12 },
        inp: { background:'none', border:'none', outline:'none', color:'#fff', fontSize:15, flex:1, width:'100%', fontFamily:'inherit' },
        btn: { width:'100%', padding:15, background:'#6366f1', color:'#fff', border:'none', borderRadius:13, fontSize:15, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'inherit', marginTop:8 },
        btnOut: { width:'100%', padding:13, background:'transparent', color:'#a0a0b0', border:'1px solid #2a2a2f', borderRadius:13, fontSize:14, cursor:'pointer', fontFamily:'inherit', marginTop:8 },
        eyeBtn: { background:'none', border:'none', color:'#505060', cursor:'pointer', padding:0 },
        hint: { textAlign:'center' as const, fontSize:13, color:'#505060', marginTop:14 },
        chip: { background:'#1c1c1f', border:'1px solid #2a2a2f', borderRadius:20, padding:'5px 12px', display:'inline-flex', alignItems:'center', gap:6, color:'#a0a0b0', fontSize:13, marginBottom:16 },
        otp4: { display:'flex', gap:10, marginBottom:8 },
        oc: { flex:1, textAlign:'center' as const, fontSize:22, fontWeight:700, color:'#fff', background:'#141416', border:'1px solid #2a2a2f', borderRadius:14, outline:'none', fontFamily:'inherit', padding:'14px 0' },
    }

    return (
        <div style={c.page}>
            <div style={c.wrap}>
                <div style={c.logoArea}>
                    <div style={c.logoBox}>⚡</div>
                    <div style={c.logoN}>Tebiren</div>
                    <div style={c.logoS}>{step === 3 ? 'Подтверждение email' : 'Создайте аккаунт'}</div>
                </div>

                {step !== 3 && (
                    <div style={c.tabRow}>
                        <button style={c.tab(false)} onClick={() => router.push('/login')}>Вход</button>
                        <button style={c.tab(true)} onClick={() => router.push('/register')}>Регистрация</button>
                    </div>
                )}

                {error && <div style={c.errBox}>⚠ {error}</div>}
                {success && step !== 3 && <div style={c.okBox}>✓ {success}</div>}

                {step === 1 && (
                    <div>
                        <p style={c.title}>Создать<br/>аккаунт</p>
                        <p style={c.sub}>Шаг 1 из 2 — личные данные</p>

                        <div style={c.row2}>
                            <div>
                                <div style={c.lbl}>Имя</div>
                                <div style={c.field}>
                                    <span style={{color:'#505060'}}>👤</span>
                                    <input style={c.inp} type="text" placeholder="Arnat"
                                           value={form.middle_name} onChange={e=>set('middle_name',e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <div style={c.lbl}>Фамилия</div>
                                <div style={c.field}>
                                    <span style={{color:'#505060'}}>👤</span>
                                    <input style={c.inp} type="text" placeholder="Aithzan"
                                           value={form.first_name} onChange={e=>set('first_name',e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div style={c.lbl}>Отчество</div>
                        <div style={c.field}>
                            <span style={{color:'#505060'}}>👤</span>
                            <input style={c.inp} type="text" placeholder="Erzhanuly"
                                   value={form.last_name} onChange={e=>set('last_name',e.target.value)} />
                        </div>

                        <div style={c.lbl}>Никнейм</div>
                        <div style={c.field}>
                            <span style={{color:'#505060',fontSize:17}}>@</span>
                            <input style={c.inp} type="text" placeholder="rurzh"
                                   value={form.nickname} onChange={e=>set('nickname',e.target.value)} />
                        </div>

                        <div style={{height:16}}/>
                        <button style={c.btn} onClick={goStep2}>Далее →</button>
                        <div style={c.hint}>
                            Уже есть аккаунт? <a href="/login" style={{color:'#6366f1', textDecoration:'none', fontWeight:500}}>Войти</a>
                        </div>
                    </div>

                )}

                {step === 2 && (
                    <div>
                        <p style={c.title}>Контакт<br/>и пароль</p>
                        <p style={c.sub}>Шаг 2 из 2 — почти готово</p>

                        <div style={c.lbl}>Email</div>
                        <div style={c.field}>
                            <span style={{color:'#505060',fontSize:17}}>@</span>
                            <input style={c.inp} type="email" placeholder="your@email.com"
                                   value={form.email} onChange={e=>set('email',e.target.value)} />
                        </div>

                        <div style={c.lbl}>Пароль</div>
                        <div style={c.field}>
                            <span style={{color:'#505060'}}>🔒</span>
                            <input style={c.inp} type={showPass?'text':'password'} placeholder="Минимум 8 символов"
                                   value={form.password} onChange={e=>set('password',e.target.value)} />
                            <button style={c.eyeBtn} onClick={()=>setShowPass(!showPass)}>{showPass?'🙈':'👁'}</button>
                        </div>

                        <div style={c.lbl}>Повтор пароля</div>
                        <div style={c.field}>
                            <span style={{color:'#505060'}}>🔒</span>
                            <input style={c.inp} type="password" placeholder="Повторите пароль"
                                   value={form.password2} onChange={e=>set('password2',e.target.value)}
                                   onKeyDown={e=>e.key==='Enter'&&submit()} />
                        </div>

                        <div style={{height:16}}/>
                        <button style={c.btn} onClick={submit} disabled={loading}>
                            {loading ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
                        </button>
                        <button style={c.btnOut} onClick={()=>setStep(1)}>← Назад</button>
                    </div>
                )}

                {step === 3 && (
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
                        <div style={{width:56, height:56, borderRadius:'50%', background:'#1a1a2e', border:'1.5px solid #6366f1', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20, fontSize:24}}>
                            ✉️
                        </div>
                        <p style={c.title}>Проверьте<br/>почту</p>
                        <p style={{...c.sub, textAlign:'center'}}>
                            Отправили 4-значный код на
                        </p>
                        <div style={c.chip}>@ {form.email}</div>

                        {error && <div style={{...c.errBox, width:'100%'}}>⚠ {error}</div>}
                        {success && <div style={{...c.okBox, width:'100%'}}>✓ {success}</div>}

                        <div style={{...c.otp4, width:'100%'}}>
                            {otp.map((v, i) => (
                                <input key={i}
                                       ref={el => { otpRefs.current[i] = el }}
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
                        <p style={{fontSize:12, color:'#404050', marginBottom:24}}>Введите код из письма</p>

                        <button style={{...c.btn, marginTop:0}} onClick={confirmOtp}>
                            Подтвердить и войти →
                        </button>
                        <button style={c.btnOut} onClick={resendOtp}>Отправить снова</button>

                        <p style={{fontSize:12, color:'#303040', marginTop:16, lineHeight:1.6}}>
                            Не нашли письмо? Проверьте папку «Спам»
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}