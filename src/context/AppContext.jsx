import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AppContext = createContext(null)

const SS = sessionStorage

const initialState = {
  user: { name: 'Matías', avatar: '/Avatars/avatar-matias.svg' },
  perfil: SS.getItem('abla_perfil') || null,
  moodHoy: SS.getItem('abla_mood') || null,
  reportesEnviados: JSON.parse(SS.getItem('abla_reportes') || '[]'),
  citasAgendadas: JSON.parse(SS.getItem('abla_citas') || '[]'),
  // Perfil del hijo (para apoderado)
  hijoPerfil: JSON.parse(SS.getItem('abla_hijo') || 'null'),
  // Certificados NEE del hijo
  certificadosNEE: JSON.parse(SS.getItem('abla_nee') || '[]'),
  // Flags de onboarding
  appOnbDone: SS.getItem('abla_app_onb') === '1',
  // Reglamento interno leído
  reglamentoLeido: SS.getItem('abla_reglamento') === '1',
}

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState)

  const setMood = useCallback((mood) => {
    setState((p) => ({ ...p, moodHoy: mood }))
    SS.setItem('abla_mood', mood)
  }, [])

  const setPerfil = useCallback((p) => {
    setState((prev) => ({ ...prev, perfil: p }))
    SS.setItem('abla_perfil', p)
  }, [])

  const addReporte = useCallback((reporte) => {
    setState((prev) => {
      const updated = [...prev.reportesEnviados, {
        ...reporte,
        id: `BIM-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        fecha: new Date().toISOString(),
        estadoProtocolo: 'recibido',
        severidad: reporte.severidad || 'medio',
        frecuencia: reporte.frecuencia || '',
        tieneEvidencia: reporte.tieneEvidencia || false,
        tiposEvidencia: reporte.tiposEvidencia || [],
      }]
      SS.setItem('abla_reportes', JSON.stringify(updated))
      return { ...prev, reportesEnviados: updated }
    })
  }, [])

  const addCita = useCallback((cita) => {
    setState((prev) => {
      const updated = [...prev.citasAgendadas, cita]
      SS.setItem('abla_citas', JSON.stringify(updated))
      return { ...prev, citasAgendadas: updated }
    })
  }, [])

  const setHijoPerfil = useCallback((hijo) => {
    setState((prev) => ({ ...prev, hijoPerfil: hijo }))
    SS.setItem('abla_hijo', JSON.stringify(hijo))
  }, [])

  const addCertificadoNEE = useCallback((cert) => {
    setState((prev) => {
      const updated = [...prev.certificadosNEE, { ...cert, id: Date.now(), fechaSubida: new Date().toISOString() }]
      SS.setItem('abla_nee', JSON.stringify(updated))
      return { ...prev, certificadosNEE: updated }
    })
  }, [])

  const removeCertificadoNEE = useCallback((id) => {
    setState((prev) => {
      const updated = prev.certificadosNEE.filter((c) => c.id !== id)
      SS.setItem('abla_nee', JSON.stringify(updated))
      return { ...prev, certificadosNEE: updated }
    })
  }, [])

  const marcarReglamentoLeido = useCallback(() => {
    setState((prev) => ({ ...prev, reglamentoLeido: true }))
    SS.setItem('abla_reglamento', '1')
  }, [])

  const clearSession = useCallback(() => {
    SS.clear()
    setState({
      ...initialState,
      perfil: null,
      moodHoy: null,
      reportesEnviados: [],
      citasAgendadas: [],
      hijoPerfil: null,
      certificadosNEE: [],
      appOnbDone: false,
      reglamentoLeido: false,
    })
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      setMood,
      setPerfil,
      addReporte,
      addCita,
      setHijoPerfil,
      addCertificadoNEE,
      removeCertificadoNEE,
      marcarReglamentoLeido,
      clearSession,
    }),
    [
      state,
      setMood,
      setPerfil,
      addReporte,
      addCita,
      setHijoPerfil,
      addCertificadoNEE,
      removeCertificadoNEE,
      marcarReglamentoLeido,
      clearSession,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be inside AppProvider')
  return ctx
}
