import { useState } from 'react'
import Login from './components/Login.jsx'
import BottomNav from './components/BottomNav.jsx'

function MoodButton({ label, emoji, active, onClick, colorClass }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-20 w-full flex-col items-center justify-center gap-1 rounded-2xl border bg-white text-slate-800 shadow-sm ${
        active ? 'border-[#415478]' : 'border-slate-200'
      }`}
      aria-label={label}
    >
      <div className={`text-3xl ${colorClass}`}>{emoji}</div>
      <div className="text-sm font-semibold tracking-wide text-[#415478]">{label}</div>
    </button>
  )
}

function NavTile({ title }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left text-slate-800 shadow-sm"
      aria-label={title}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-industrial-brand/20" />
      <div>
        <div className="text-sm font-semibold text-[#415478]">{title}</div>
        <div className="text-xs text-slate-600">Acceso rápido</div>
      </div>
    </button>
  )
}

function Home() {
  const [mood, setMood] = useState(null)

  return (
    <div className="min-h-screen bg-industrial-bg pb-24 text-slate-800">
      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-[#415478]">Hola</div>
            <div className="text-xs text-slate-600">¿Cómo te sentís hoy?</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-industrial-brand/20" aria-hidden="true" />
        </header>

        <section className="mt-5">
          <div className="text-sm font-semibold text-[#415478]">Mood Tracker</div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <MoodButton
              label="BIEN"
              emoji="😊"
              active={mood === 'BIEN'}
              onClick={() => setMood('BIEN')}
              colorClass=""
            />
            <MoodButton
              label="MAS O MENOS"
              emoji="😐"
              active={mood === 'MAS O MENOS'}
              onClick={() => setMood('MAS O MENOS')}
              colorClass=""
            />
            <MoodButton
              label="MAL"
              emoji="😟"
              active={mood === 'MAL'}
              onClick={() => setMood('MAL')}
              colorClass=""
            />
          </div>
        </section>

        <section className="mt-6">
          <div className="text-sm font-semibold text-[#415478]">Navegación</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <NavTile title="CONSEJOS" />
            <NavTile title="SOBRE TÍ" />
            <NavTile title="ENCUESTAS" />
          </div>
        </section>
      </div>

      <button
        type="button"
        className="fixed bottom-20 left-1/2 z-50 h-12 -translate-x-1/2 rounded-full bg-[#415478] px-6 font-semibold text-white shadow-lg"
        aria-label="Chatear"
      >
        + CHATEAR
      </button>

      <BottomNav active="home" />
    </div>
  )
}

function App() {
  const [isAuthed, setIsAuthed] = useState(false)

  if (!isAuthed) {
    return <Login onLogin={() => setIsAuthed(true)} />
  }

  return <Home />
}

export default App
