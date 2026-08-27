import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff, HelpCircle, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ablaEase, ablaMotion, motionIfAllowed } from '../design/motion.js'
import AblaCompanion from './companion/AblaCompanion.jsx'
import PageTransition from './PageTransition.jsx'

const characterVariants = {
  idle: { personality: 'friendly', mood: 'happy', pose: 'idle', gaze: 'right', decorations: 'subtle', copy: 'Estoy aquí contigo.' },
  hover: { personality: 'friendly', mood: 'happy', pose: 'waving', gaze: 'center', decorations: 'subtle', copy: '¡Hola! Qué bueno verte.' },
  wave: { personality: 'friendly', mood: 'excited', pose: 'waving', gaze: 'center', decorations: 'energy', copy: '¡Hola! Vamos paso a paso.' },
  emailFocus: { personality: 'curious', mood: 'curious', pose: 'listening', gaze: 'right', accessory: 'question', decorations: 'question', copy: 'Te ayudo a comenzar.' },
  emailTyping: { personality: 'friendly', mood: 'focused', pose: 'pointing', gaze: 'right', decorations: 'none', copy: 'Perfecto, sigue así.' },
  passwordFocus: { personality: 'protective', mood: 'calm', pose: 'protecting', gaze: 'left', eyeExpression: 'closed', accessory: 'shield', decorations: 'none', copy: 'No miro. Tu privacidad importa.' },
  error: { personality: 'empathetic', mood: 'worried', pose: 'supporting', gaze: 'center', decorations: 'none', copy: 'No pasa nada. Revisemos tus datos.' },
  success: { personality: 'motivating', mood: 'excited', pose: 'celebrating', gaze: 'center', accessory: 'check', decorations: 'energy', copy: '¡Todo listo!' },
  help: { personality: 'empathetic', mood: 'supported', pose: 'listening', gaze: 'center', accessory: 'speech', decorations: 'heart', copy: 'Cuéntame, estamos para ayudarte.' },
}

function LoginField({ id, label, icon: Icon, children, error }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-extrabold text-abla-blue">{label}</label><div className="relative"><Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />{children}</div>{error && <p className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>}</div>
}

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const waveTimer = useRef(null)
  const successTimer = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [activeField, setActiveField] = useState(null)
  const [hoveringCharacter, setHoveringCharacter] = useState(false)
  const [waveActive, setWaveActive] = useState(false)
  const [helpActive, setHelpActive] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => () => {
    window.clearTimeout(waveTimer.current)
    window.clearTimeout(successTimer.current)
  }, [])

  const characterState = useMemo(() => {
    if (Object.keys(errors).length) return 'error'
    if (success) return 'success'
    if (activeField === 'password' || passwordVisible) return 'passwordFocus'
    if (activeField === 'email') return email ? 'emailTyping' : 'emailFocus'
    if (helpActive) return 'help'
    if (waveActive) return 'wave'
    if (hoveringCharacter) return 'hover'
    return 'idle'
  }, [activeField, email, errors, helpActive, hoveringCharacter, passwordVisible, success, waveActive])

  const character = characterVariants[characterState]
  const inputClass = 'min-h-[52px] w-full rounded-abla-control border border-abla-border bg-white py-3 pl-12 pr-4 text-sm text-abla-ink outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-abla-green focus:shadow-[0_0_0_3px_rgba(86,160,135,.12)]'

  const interactWithCharacter = () => {
    if (success || Object.keys(errors).length) return
    window.clearTimeout(waveTimer.current)
    setWaveActive(true)
    waveTimer.current = window.setTimeout(() => setWaveActive(false), 1700)
  }

  const updateEmail = (value) => {
    setEmail(value)
    if (errors.email || errors.form) setErrors({})
  }

  const updatePassword = (value) => {
    setPassword(value)
    if (errors.password || errors.form) setErrors({})
  }

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!email.trim()) nextErrors.email = 'Ingresa tu correo electrónico.'
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Revisa el formato del correo.'
    if (!password) nextErrors.password = 'Ingresa tu contraseña.'
    else if (password.length < 6) nextErrors.password = 'La contraseña debe tener al menos 6 caracteres.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    setActiveField(null)
    setSuccess(true)
    successTimer.current = window.setTimeout(() => {
      navigate('/')
      onLogin?.({ email, remember })
    }, reducedMotion ? 50 : 600)
  }

  return <PageTransition><div className="min-h-dvh overflow-hidden bg-abla-bg px-4 py-5 text-abla-ink sm:px-6 md:py-8 lg:px-8">
    <main className="mx-auto grid min-h-[calc(100dvh-2.5rem)] w-full max-w-7xl items-center gap-5 md:min-h-[calc(100dvh-4rem)] md:grid-cols-[.82fr_1.18fr] md:gap-7 lg:grid-cols-[.94fr_1.06fr] lg:gap-12">
      <section className="relative order-1 flex min-h-44 items-center justify-center overflow-hidden rounded-abla-panel bg-[linear-gradient(135deg,rgba(232,243,239,.95),rgba(233,238,245,.85))] p-4 md:min-h-[640px] md:p-8 lg:min-h-[680px]" aria-labelledby="welcome-support-title">
        <div className="absolute -left-14 top-12 h-40 w-40 rounded-abla-blob bg-white/55" aria-hidden="true" />
        <div className="absolute right-8 top-10 h-4 w-4 rotate-45 rounded-md bg-[#9FC8F5]/70 md:right-14" aria-hidden="true" />
        <div className="absolute bottom-20 right-8 h-20 w-32 rounded-full border-2 border-dashed border-abla-green/15 md:right-14" aria-hidden="true" />
        <div className="relative flex w-full flex-row items-center justify-center gap-5 md:flex-col md:gap-7">
          <button type="button" onClick={interactWithCharacter} onMouseEnter={() => setHoveringCharacter(true)} onMouseLeave={() => setHoveringCharacter(false)} className="grid h-32 w-32 shrink-0 place-items-center rounded-abla-blob bg-white/55 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-abla-green/35 md:h-72 md:w-72 lg:h-80 lg:w-80" aria-label="Interactuar con ABLA">
            <AnimatePresence mode="wait" initial={false}><motion.span key={characterState} initial={{ opacity: 0, scale: reducedMotion ? 1 : .985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? .01 : .28, ease: ablaEase }} className="grid place-items-center">
              <AblaCompanion {...character} size="hero" interactive={false} animate={characterState === 'idle'} label={`ABLA: ${character.copy}`} className="h-[118px] w-[118px] md:h-[250px] md:w-[250px] lg:h-[280px] lg:w-[280px]" />
            </motion.span></AnimatePresence>
          </button>
          <div className="max-w-sm md:text-center">
            <AnimatePresence mode="wait"><motion.p key={character.copy} initial={{ opacity: 0, y: reducedMotion ? 0 : 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs font-extrabold text-abla-green md:text-sm" aria-live="polite">{character.copy}</motion.p></AnimatePresence>
            <h2 id="welcome-support-title" className="mt-2 text-xl font-black leading-tight text-abla-blue md:text-3xl">Aquí te escuchamos,<br />aquí estás seguro.</h2>
            <p className="mt-2 hidden text-sm leading-6 text-slate-500 sm:block">ABLA es un espacio para aprender, conectar y sentirte acompañado.</p>
          </div>
        </div>
      </section>

      <section className="order-2 mx-auto w-full max-w-xl rounded-abla-panel bg-white p-5 shadow-abla-float sm:p-7 md:p-9 lg:p-11" aria-labelledby="login-title">
        <img src="/Logo/abla-logo.svg" alt="ABLA" className="h-14 w-14" draggable="false" />
        <h1 id="login-title" className="mt-5 text-[clamp(2rem,4vw,3rem)] font-black leading-tight tracking-tight text-abla-blue">Bienvenido a ABLA</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500 md:text-base">Ingresa a tu espacio seguro para continuar.</p>

        <form className="mt-7 space-y-5" onSubmit={submit} noValidate>
          <LoginField id="email" label="Correo electrónico" icon={Mail} error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => updateEmail(event.target.value)} onFocus={() => setActiveField('email')} onBlur={() => setActiveField(null)} className={`${inputClass} ${errors.email ? 'border-red-300' : ''}`} placeholder="tu@correo.com" aria-invalid={Boolean(errors.email)} />
          </LoginField>
          <LoginField id="password" label="Contraseña" icon={LockKeyhole} error={errors.password}>
            <input id="password" name="password" type={passwordVisible ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => updatePassword(event.target.value)} onFocus={() => setActiveField('password')} onBlur={() => setActiveField(null)} className={`${inputClass} pr-12 ${errors.password ? 'border-red-300' : ''}`} placeholder="Mínimo 6 caracteres" aria-invalid={Boolean(errors.password)} />
            <button type="button" onClick={() => setPasswordVisible((visible) => !visible)} className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl text-slate-400 hover:bg-abla-blue-soft hover:text-abla-blue" aria-label={passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}>{passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
          </LoginField>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm"><label className="flex cursor-pointer items-center gap-2 font-semibold text-slate-600"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-4 w-4 rounded border-abla-border accent-abla-green" />Recordarme</label><button type="button" onFocus={() => setHelpActive(true)} onBlur={() => setHelpActive(false)} onMouseEnter={() => setHelpActive(true)} onMouseLeave={() => setHelpActive(false)} className="font-bold text-abla-green hover:underline">¿Olvidaste tu contraseña?</button></div>

          <AnimatePresence>{Object.keys(errors).length > 0 && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-abla-control bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">Revisa tus datos e intenta nuevamente.</motion.p>}</AnimatePresence>
          <AnimatePresence>{success && <motion.p variants={ablaMotion.pop} initial="hidden" animate="visible" className="rounded-abla-control bg-abla-green-soft px-4 py-3 text-center text-sm font-extrabold text-abla-blue" role="status">¡Todo listo! Entrando a tu espacio…</motion.p>}</AnimatePresence>

          <motion.button type="submit" disabled={success} whileTap={motionIfAllowed(reducedMotion, ablaMotion.press)} className="min-h-[52px] w-full rounded-abla-control bg-abla-green px-5 text-base font-extrabold text-white shadow-abla-green transition-colors hover:bg-[#478F77] disabled:cursor-wait disabled:opacity-70">{success ? 'Ingresando…' : 'Iniciar sesión'}</motion.button>
        </form>

        <button type="button" onFocus={() => setHelpActive(true)} onBlur={() => setHelpActive(false)} onMouseEnter={() => setHelpActive(true)} onMouseLeave={() => setHelpActive(false)} onClick={() => setHelpActive(true)} className="mx-auto mt-5 flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-abla-blue hover:bg-abla-blue-soft"><HelpCircle className="h-4 w-4" />¿Necesitas ayuda?</button>
        <p className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400"><ShieldCheck className="h-4 w-4 text-abla-green" />Tu información está protegida.</p>
      </section>
    </main>
  </div></PageTransition>
}
