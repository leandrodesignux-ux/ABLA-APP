import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login.jsx'
import Onboarding from './components/Onboarding.jsx'
import Home from './pages/Home.jsx'

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
            <Route path="/ayuda/consejos" element={<PlaceholderPage title="Consejos" />} />
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
