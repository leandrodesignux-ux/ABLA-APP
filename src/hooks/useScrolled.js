import { useState, useEffect } from 'react'

export function useScrolled(ref, threshold = 10) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const element = ref?.current || window
    
    const handleScroll = () => {
      const scrollTop = ref?.current ? ref.current.scrollTop : window.scrollY
      setScrolled(scrollTop > threshold)
    }

    // Check initial scroll position
    handleScroll()

    element.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [ref, threshold])

  return scrolled
}
