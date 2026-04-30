import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AppContext = createContext(null)

const initialState = {
  user: {
    name: 'Matías',
    avatar: '/Avatars/avatar-matias.svg',
  },
  moodHoy: null,
  reportesEnviados: [],
}

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState)

  const setMood = useCallback((mood) => {
    setState((prev) => ({ ...prev, moodHoy: mood }))
  }, [])

  const addReporte = useCallback((reporte) => {
    setState((prev) => ({
      ...prev,
      reportesEnviados: [...prev.reportesEnviados, reporte],
    }))
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      setMood,
      addReporte,
    }),
    [state, setMood, addReporte],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
