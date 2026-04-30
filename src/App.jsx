import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import Onboarding from './components/Onboarding.jsx'
import ChatSelect from './pages/ChatSelect.jsx'
import ChatView from './pages/ChatView.jsx'
import Ayuda from './pages/Ayuda.jsx'
import AyudaCita from './pages/AyudaCita.jsx'
import AyudaCalendario from './pages/AyudaCalendario.jsx'
import AyudaConfirmacion from './pages/AyudaConfirmacion.jsx'
import Consejos from './pages/Consejos.jsx'
import Home from './pages/Home.jsx'
import Reportar from './pages/Reportar.jsx'
import ReporteForm from './pages/ReporteForm.jsx'
import Encuesta from './pages/Encuesta.jsx'
import Perfil from './pages/Perfil.jsx'

function RootFlow() {
  const [route, setRoute] = useState('splash')
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('abla_authed') === '1')
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      const seen = window.localStorage.getItem('abla_onboarding_seen') === '1'
      setRoute(seen ? 'login' : 'onboarding')
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (route === 'splash') {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-white">
        <motion.img
          src="/Logo/abla-logo.svg"
          alt="ABLA"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="h-32 w-32"
          draggable="false"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-lg font-medium text-abla-green"
        >
          Tu espacio seguro
        </motion.div>
      </div>
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
          sessionStorage.setItem('abla_authed', '1')
          setIsAuthed(true)
          navigate('/home')
        }}
      />
    )
  }

  return null
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

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootFlow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatSelect />} />
        <Route path="/chat/:type" element={<ChatView />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/ayuda/consejos" element={<Consejos />} />
        <Route path="/ayuda/cita" element={<AyudaCita />} />
        <Route path="/ayuda/cita/calendario" element={<AyudaCalendario />} />
        <Route path="/ayuda/cita/confirmacion" element={<AyudaConfirmacion />} />
        <Route path="/reportar" element={<Reportar />} />
        <Route path="/reportar/:tipo" element={<ReporteForm />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/encuesta" element={<Encuesta />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppContent() {
  return (
    <div className="min-h-screen w-full bg-white">
      <AnimatedRoutes />
    </div>
  )
}

function DesktopShowcase({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a2744] to-[#2d5a4a] flex items-center justify-center p-8">
      <div className="flex items-center gap-16 max-w-6xl">
        {/* Left side - Project info */}
        <div className="hidden lg:block text-white max-w-md">
          <h1 className="text-6xl font-bold tracking-tight mb-2">ABLA</h1>
          <p className="text-2xl text-abla-green font-medium mb-8">App anti-bullying escolar</p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-abla-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-lg">Chat anónimo seguro</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-abla-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-lg">Reportes confidenciales</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-abla-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-lg">Apoyo emocional 24/7</span>
            </div>
          </div>
        </div>

        {/* Phone frame */}
        <div className="rounded-[48px] bg-[#1a1a1a] p-3 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          {/* Notch */}
          <div className="flex justify-center mb-2">
            <div className="w-[120px] h-[28px] rounded-full bg-[#1a1a1a]" />
          </div>
          {/* Screen */}
          <div className="w-[390px] h-[844px] overflow-y-auto overflow-x-hidden rounded-[36px] bg-white relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      {/* Mobile: native app without frame */}
      <div className="md:hidden">
        <AppContent />
      </div>

      {/* Desktop: showcase with phone frame */}
      <div className="hidden md:block">
        <DesktopShowcase>
          <AppContent />
        </DesktopShowcase>
      </div>
    </BrowserRouter>
  )
}

export default App
