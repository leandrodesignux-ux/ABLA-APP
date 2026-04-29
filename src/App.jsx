import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login.jsx'
import BottomNav from './components/BottomNav.jsx'
import Onboarding from './components/Onboarding.jsx'
import { Bell, GalleryHorizontalEnd, Menu } from 'lucide-react'

function MoodButton({ label, emoji, active, onClick, colorClass }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-20 w-full flex-col items-center justify-center gap-1 rounded-2xl border bg-white text-slate-800 shadow-sm ${
        active ? 'border-abla-blue' : 'border-slate-200'
      }`}
      aria-label={label}
    >
      <div className={`text-3xl ${colorClass}`}>{emoji}</div>
      <div className="text-sm font-semibold tracking-wide text-abla-blue">{label}</div>
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
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-abla-green bg-white">
        <img src="/ABLA3.PNG" alt="" className="h-full w-full object-cover" draggable="false" />
      </div>
      <div>
        <div className="text-sm font-semibold text-abla-blue">{title}</div>
        <div className="text-xs text-slate-600">Acceso rápido</div>
      </div>
    </button>
  )
}

function Home() {
  const [mood, setMood] = useState(null)

  return (
    <div className="min-h-screen bg-abla-bg pb-24 text-slate-800">
      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        <header className="rounded-2xl bg-abla-green px-4 py-3 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">Home</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"
                aria-label="Galería"
              >
                <GalleryHorizontalEnd className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"
                aria-label="Notificaciones"
              >
                <Bell className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"
                aria-label="Menú"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="ml-1 h-9 w-9 overflow-hidden rounded-full border-2 border-white/60 bg-white/10">
                <img src="/ABLA3.PNG" alt="" className="h-full w-full object-cover" draggable="false" />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-sm font-semibold">¡Hola Matías!</div>
            <div className="text-xs text-white/85">¿Cómo te sentís hoy?</div>
          </div>
        </header>

        <section className="mt-5">
          <div className="text-sm font-semibold text-abla-blue">Mood Tracker</div>
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
          <div className="text-sm font-semibold text-abla-blue">Navegación</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <NavTile title="CONSEJOS" />
            <NavTile title="SOBRE TÍ" />
            <NavTile title="ENCUESTAS" />
          </div>
        </section>
      </div>

      <button
        type="button"
        className="fixed bottom-20 left-1/2 z-50 h-12 -translate-x-1/2 rounded-full bg-abla-blue px-6 font-semibold text-white shadow-lg"
        aria-label="Chatear"
      >
        + CHATEAR
      </button>

      <BottomNav active="home" />
    </div>
  )
}

function RootFlow() {
  const [route, setRoute] = useState('splash')
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const seen = window.localStorage.getItem('abla_onboarding_seen') === '1'
    setRoute(seen ? 'login' : 'onboarding')
  }, [])

  if (route === 'splash') {
    return (
      <button
        type="button"
        onClick={() => setRoute('onboarding')}
        className="block h-screen w-screen bg-white"
        aria-label="Comenzar"
      >
        <img
          src="/ABLA4.PNG"
          alt="ABLA"
          className="h-full w-full object-contain"
          draggable="false"
        />
      </button>
    )
  }

  if (route === 'onboarding') {
    return (
      <Onboarding
        onDone={() => {
          window.localStorage.setItem('abla_onboarding_seen', '1')
          setRoute('login')
        }}
      />
    )
  }

  if (!isAuthed) {
    return (
      <Login
        onLogin={() => {
          setIsAuthed(true)
          setRoute('home')
        }}
      />
    )
  }

  return <Home />
}

function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen bg-abla-bg px-4 py-10 text-slate-800">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-lg font-semibold text-abla-blue">{title}</div>
        <div className="mt-2 text-sm text-slate-600">Placeholder</div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      <div className="mx-auto w-full max-w-[390px] min-h-screen bg-white shadow-2xl relative">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootFlow />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<PlaceholderPage title="Chat" />} />
            <Route path="/ayuda" element={<PlaceholderPage title="Ayuda" />} />
            <Route path="/reportar" element={<PlaceholderPage title="Reportar" />} />
            <Route path="/perfil" element={<PlaceholderPage title="Perfil" />} />
            <Route path="/encuesta" element={<PlaceholderPage title="Encuesta" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
