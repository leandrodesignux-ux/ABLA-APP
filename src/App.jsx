import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import DesktopSidebar from './components/DesktopSidebar.jsx'
import AblaLoader from './components/AblaLoader.jsx'

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
const Protocolos = lazy(() => import('./pages/Protocolos.jsx'))
const ProtocoloDetalle = lazy(() => import('./pages/ProtocoloDetalle.jsx'))
const Reportar = lazy(() => import('./pages/Reportar.jsx'))
const ReporteForm = lazy(() => import('./pages/ReporteForm.jsx'))
const Bitacora = lazy(() => import('./pages/Bitacora.jsx'))
const Encuesta = lazy(() => import('./pages/Encuesta.jsx'))
const Perfil = lazy(() => import('./pages/Perfil.jsx'))
const SobreTi = lazy(() => import('./pages/SobreTi.jsx'))
const CompanionShowcase = import.meta.env.DEV ? lazy(() => import('./pages/CompanionShowcase.jsx')) : null

// Minimal fallback for Suspense
function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-abla-bg">
      <AblaLoader />
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
        <Route path="/bitacora" element={<Bitacora />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/encuesta" element={<Encuesta />} />
        <Route path="/sobreti" element={<SobreTi />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/apoderado" element={<HomeApoderado />} />
        <Route path="/home/profesional" element={<HomeProfesional />} />
        <Route path="/apoderado/nee" element={<CertificadosNEE />} />
        <Route path="/certificados-nee" element={<CertificadosNEE />} />
        <Route path="/reglamento" element={<Reglamento />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/protocolos" element={<Protocolos />} />
        <Route path="/protocolos/:id" element={<ProtocoloDetalle />} />
        {CompanionShowcase && <Route path="/__companion" element={<CompanionShowcase />} />}
      </Routes>
    </AnimatePresence>
  )
}

function AppContent() {
  const { pathname } = useLocation()
  const showAppShell = pathname !== '/' && pathname !== '/login' && pathname !== '/sobreti'
  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-white">
      {showAppShell && <DesktopSidebar />}
      <main className={showAppShell ? 'min-h-dvh md:pl-56 lg:pl-64' : 'min-h-dvh'}>
      <Suspense fallback={<PageLoader />}>
        <AnimatedRoutes />
      </Suspense>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
