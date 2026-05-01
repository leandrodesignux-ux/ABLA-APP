import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

// Lazy load pages for code splitting
const Login = lazy(() => import('./components/Login.jsx'))
const Onboarding = lazy(() => import('./components/Onboarding.jsx'))
const OnboardingApp = lazy(() => import('./components/OnboardingApp.jsx'))
const ChatSelect = lazy(() => import('./pages/ChatSelect.jsx'))
const ChatView = lazy(() => import('./pages/ChatView.jsx'))
const ChatProfesor = lazy(() => import('./pages/ChatProfesor.jsx'))
const ChatGrupal = lazy(() => import('./pages/ChatGrupal.jsx'))
const Ayuda = lazy(() => import('./pages/Ayuda.jsx'))
const AyudaCita = lazy(() => import('./pages/AyudaCita.jsx'))
const AyudaCalendario = lazy(() => import('./pages/AyudaCalendario.jsx'))
const AyudaConfirmacion = lazy(() => import('./pages/AyudaConfirmacion.jsx'))
const Consejos = lazy(() => import('./pages/Consejos.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const HomeApoderado = lazy(() => import('./pages/HomeApoderado.jsx'))
const HomeProfesional = lazy(() => import('./pages/HomeProfesional.jsx'))
const CertificadosNEE = lazy(() => import('./pages/CertificadosNEE.jsx'))
const Reglamento = lazy(() => import('./pages/Reglamento.jsx'))
const FAQs = lazy(() => import('./pages/FAQs.jsx'))
const Reportar = lazy(() => import('./pages/Reportar.jsx'))
const ReporteForm = lazy(() => import('./pages/ReporteForm.jsx'))
const Encuesta = lazy(() => import('./pages/Encuesta.jsx'))
const Perfil = lazy(() => import('./pages/Perfil.jsx'))
const SobreTi = lazy(() => import('./pages/SobreTi.jsx'))

// Minimal fallback for Suspense
function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-abla-bg">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="h-8 w-8 rounded-full bg-abla-green"
      />
    </div>
  )
}

function RootFlow() {
  const [route, setRoute] = useState('splash')
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('abla_authed') === '1')
  const [appOnbDone, setAppOnbDone] = useState(() => sessionStorage.getItem('abla_app_onb') === '1')
  const navigate = useNavigate()

  const getHomePath = () => {
    const savedPerfil = sessionStorage.getItem('abla_perfil')
    if (savedPerfil === 'apoderado') return '/home/apoderado'
    if (savedPerfil === 'profesional') return '/home/profesional'
    if (savedPerfil === 'estudiante') return '/home'
    return '/sobreti'
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const seen = window.localStorage.getItem('abla_onboarding_seen') === '1'
      setRoute(seen ? 'login' : 'onboarding')
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isAuthed && appOnbDone && route !== 'splash' && route !== 'onboarding') {
      navigate(getHomePath(), { replace: true })
    }
  }, [isAuthed, appOnbDone, route, navigate])

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
        }}
      />
    )
  }

  if (isAuthed && !appOnbDone) {
    return (
      <OnboardingApp
        onDone={() => {
          sessionStorage.setItem('abla_app_onb', '1')
          setAppOnbDone(true)
          navigate(getHomePath())
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
        <Route path="/chat/elegir-profesor" element={<ChatProfesor />} />
        <Route path="/chat/grupos" element={<ChatGrupal />} />
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
        <Route path="/sobreti" element={<SobreTi />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/apoderado" element={<HomeApoderado />} />
        <Route path="/home/profesional" element={<HomeProfesional />} />
        <Route path="/certificados-nee" element={<CertificadosNEE />} />
        <Route path="/reglamento" element={<Reglamento />} />
        <Route path="/faqs" element={<FAQs />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppContent() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Suspense fallback={<PageLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </div>
  )
}

const bullets = [
  'Reporta de forma anónima',
  'Habla con tu tutor',
  'Recursos de ayuda',
  '100% confidencial',
]

function DesktopShowcase({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a2744] to-[#2d5a4a] flex items-center justify-center gap-16 p-8">
      {/* Left panel */}
      <div className="hidden md:block text-white max-w-md">
        <h1 className="text-[48px] font-bold text-white tracking-tight">ABLA</h1>
        <p className="text-[16px] text-abla-green font-medium mt-1">App anti-bullying escolar</p>

        <div className="mt-8 space-y-3">
          {bullets.map((text) => (
            <div key={text} className="flex items-center gap-3">
              <svg className="w-5 h-5 text-abla-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[14px] text-white leading-[1.8]">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phone frame with animation */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[48px] bg-[#0a0a0a] p-3"
        style={{ boxShadow: '0 60px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)' }}
      >
        {/* Notch */}
        <div className="flex justify-center">
          <div className="w-[120px] h-[30px] bg-[#0a0a0a] rounded-b-[20px]" />
        </div>
        {/* Screen */}
        <div className="w-[390px] h-[844px] overflow-y-auto overflow-x-hidden rounded-[36px] bg-white relative">
          {children}
        </div>
      </motion.div>
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
