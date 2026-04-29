import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from './PageTransition.jsx'

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const submit = () => {
    onLogin?.({ email, password })
    navigate('/')
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-white px-4 pb-24 text-slate-800">
      <div className="mx-auto w-full max-w-[390px]">
        <div className="mt-[60px] flex flex-col items-center">
          <img src="/logo/abla-logo.svg" alt="ABLA" className="h-[120px] w-[120px] select-none" draggable="false" />
          <div className="mt-4 text-[22px] font-bold text-abla-blue">¡Bienvenido/a!</div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
          <label className="block text-sm font-medium text-slate-700">Correo electrónico</label>
          <div className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 focus-within:border-abla-blue">
            <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-full w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              placeholder="tu@correo.com"
              autoComplete="email"
            />
          </div>

          <label className="mt-4 block text-sm font-medium text-slate-700">Contraseña</label>
          <div className="mt-2 flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 focus-within:border-abla-blue">
            <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-full w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
            </button>
          </div>

          <div className="mt-3 flex justify-end">
            <button type="button" className="text-sm font-medium text-abla-green" aria-label="Olvidaste tu contraseña">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="button"
            className="mt-4 h-12 w-full rounded-xl bg-abla-green font-semibold text-white"
            onClick={submit}
          >
            Iniciar Sesión
          </button>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E6E6E6]" />
            <div className="text-sm text-slate-400">o</div>
            <div className="h-px flex-1 bg-[#E6E6E6]" />
          </div>

          <button
            type="button"
            className="mt-5 h-12 w-full rounded-xl border border-abla-green bg-white font-semibold text-abla-green"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
