import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-abla-bg px-4 py-10 text-slate-800">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col items-center">
          <img src="/ABLA4.PNG" alt="ABLA" className="w-56 max-w-full select-none" draggable="false" />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="block text-sm font-medium text-slate-700">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-abla-blue focus:outline-none"
            placeholder="tu@correo.com"
            autoComplete="email"
          />

          <label className="mt-4 block text-sm font-medium text-slate-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-abla-blue focus:outline-none"
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <button
            type="button"
            className="mt-6 h-11 w-full rounded-xl bg-abla-blue font-semibold text-white"
            onClick={() => onLogin?.({ email, password })}
          >
            Iniciar Sesión
          </button>

          <button
            type="button"
            className="mt-3 h-11 w-full rounded-xl border border-abla-blue bg-white font-semibold text-abla-blue"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  )
}
