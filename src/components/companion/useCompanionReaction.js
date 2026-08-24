import { useCallback, useEffect, useRef, useState } from 'react'
import { getCompanionReaction } from './companionInteractions.js'

export default function useCompanionReaction(baseReaction = null) {
  const [reaction, setReaction] = useState(baseReaction)
  const timerRef = useRef(null)
  const reactionRef = useRef(baseReaction)

  const reset = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = null
    reactionRef.current = baseReaction
    setReaction(baseReaction)
  }, [baseReaction])

  const react = useCallback((nextReaction, duration) => {
    const next = getCompanionReaction(nextReaction)
    if (!next) return false
    const current = getCompanionReaction(reactionRef.current)
    if (current && current.priority > next.priority) return false
    if (timerRef.current) window.clearTimeout(timerRef.current)
    reactionRef.current = nextReaction
    setReaction(nextReaction)
    timerRef.current = window.setTimeout(() => {
      reactionRef.current = baseReaction
      setReaction(baseReaction)
      timerRef.current = null
    }, duration || next.duration)
    return true
  }, [baseReaction])

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
  }, [])

  return { reaction, react, reset, isReacting: reaction !== baseReaction }
}

