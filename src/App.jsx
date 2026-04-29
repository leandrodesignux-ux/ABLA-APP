import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
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
  const [isAuthed, setIsAuthed] = useState(false)

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
          src="/logo/abla-logo.svg"
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
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      <div className="mx-auto w-full max-w-[390px] min-h-screen bg-white shadow-2xl relative">
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
