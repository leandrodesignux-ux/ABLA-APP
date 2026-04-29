import { useState } from 'react'

function HandsLogo() {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-industrial-brand/15">
      <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
        <path
          d="M22 36c-3 2-7 1-9-2-2-3-1-7 2-9l10-7c2-1 4 0 5 1l4 6"
          fill="none"
          stroke="#415478"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M42 36c3 2 7 1 9-2 2-3 1-7-2-9l-10-7c-2-1-4 0-5 1l-4 6"
          fill="none"
          stroke="#415478"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 38l6 6 6-6"
          fill="none"
          stroke="#5E9681"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-industrial-bg px-4 py-10 text-slate-800">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col items-center">
          <HandsLogo />
          <h1 className="mt-4 text-2xl font-semibold text-[#415478]">ABLA</h1>
          <p className="mt-1 text-center text-sm text-slate-600">Prevención y acompañamiento ante bullying</p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="block text-sm font-medium text-slate-700">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-[#415478] focus:outline-none"
            placeholder="tu@correo.com"
            autoComplete="email"
          />

          <label className="mt-4 block text-sm font-medium text-slate-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:border-[#415478] focus:outline-none"
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <button
            type="button"
            className="mt-6 h-11 w-full rounded-xl bg-[#415478] font-semibold text-white"
            onClick={() => onLogin?.({ email, password })}
          >
            Iniciar Sesión
          </button>

          <button
            type="button"
            className="mt-3 h-11 w-full rounded-xl border border-[#415478] bg-white font-semibold text-[#415478]"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  )
}
