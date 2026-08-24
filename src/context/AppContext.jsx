import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { RATINGS_INICIALES } from '../data/profesoresData.js'
import { loadMoodEntries, normalizeMoodValue, persistMoodEntries, upsertMoodEntry } from '../data/moodHistory.js'

const AppContext = createContext(null)

const SS = sessionStorage

const initialState = {
  user: { name: 'Matías', avatar: '/Avatars/avatar-matias.svg' },
  perfil: SS.getItem('abla_perfil') || null,
  moodHoy: SS.getItem('abla_mood') || null,
  moodEntries: loadMoodEntries(),
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
  ratingsEncuesta: JSON.parse(SS.getItem('abla_ratings') || 'null') || RATINGS_INICIALES,
  encuestasRespondidas: JSON.parse(SS.getItem('abla_encuestas') || '[]'),
}

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState)

  const setMood = useCallback((mood) => {
    setState((p) => {
      const moodEntries = upsertMoodEntry(p.moodEntries, normalizeMoodValue(mood))
      persistMoodEntries(moodEntries)
      return { ...p, moodHoy: mood, moodEntries }
    })
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

  const addRating = useCallback((profesorId, categoriaId, estrellas) => {
    setState((prev) => {
      const ratings = JSON.parse(JSON.stringify(prev.ratingsEncuesta))
      if (!ratings[profesorId]) ratings[profesorId] = {}
      if (!ratings[profesorId][categoriaId]) ratings[profesorId][categoriaId] = { total: 0, suma: 0 }
      ratings[profesorId][categoriaId].total += 1
      ratings[profesorId][categoriaId].suma += estrellas

      const encuestaId = `${profesorId}-${categoriaId}-${Date.now()}`
      const encuestasActualizadas = [...prev.encuestasRespondidas, {
        id: encuestaId,
        profesorId,
        categoriaId,
        estrellas,
        fecha: new Date().toISOString(),
      }]

      SS.setItem('abla_ratings', JSON.stringify(ratings))
      SS.setItem('abla_encuestas', JSON.stringify(encuestasActualizadas))

      return {
        ...prev,
        ratingsEncuesta: ratings,
        encuestasRespondidas: encuestasActualizadas,
      }
    })
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
      addRating,
      ratingsEncuesta: state.ratingsEncuesta,
      encuestasRespondidas: state.encuestasRespondidas,
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
      addRating,
      clearSession,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Provider and its colocated hook intentionally share this module.
// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be inside AppProvider')
  return ctx
}
