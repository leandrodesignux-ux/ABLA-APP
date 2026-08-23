export const ablaEase = [0.22, 1, 0.36, 1]

export const ablaMotion = {
  press: {
    scaleX: [1, 1.02, 1],
    scaleY: [1, 0.94, 1],
    transition: { duration: 0.28, ease: ablaEase },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: [0.85, 1.04, 1],
      transition: { duration: 0.45, ease: ablaEase },
    },
  },
  float: {
    y: [0, -4, 0],
    rotate: [-1, 1, -1],
    transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
  },
  wiggle: {
    rotate: [0, -4, 3, -2, 0],
    transition: { duration: 0.5, ease: ablaEase },
  },
  breathe: {
    scale: [1, 1.025, 1],
    transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const characterInteractions = {
  friendly: { body: { hover: { scaleX: 1.04, scaleY: 0.97, y: -1 }, tap: { scaleX: 1.08, scaleY: 0.91, y: 2 } }, pupils: { hover: { x: 1.8, y: -0.4 }, tap: { y: 1.4 } }, arms: { hover: { y: -3, rotate: -2 } }, mouth: { hover: { scaleX: 1.12, y: -1 } } },
  curious: { body: { hover: { rotate: 2.5, x: 1, scaleX: 1.025 }, tap: { rotate: -2, scaleY: 0.94 } }, pupils: { hover: { x: 2.2 }, tap: { x: -1, y: 1 } }, arms: { hover: { y: -2, rotate: 3 } }, mouth: { hover: { scaleY: 1.15 } } },
  shy: { body: { hover: { y: -3, scaleY: 1.025 }, tap: { y: 1, scaleY: 0.95 } }, pupils: { hover: { x: 1.7, y: -1 } }, arms: { hover: { x: -1, y: -1 } }, mouth: { hover: { scaleX: 1.06 } } },
  listening: { body: { hover: { scaleY: 1.025, y: -1 }, tap: { scaleY: 0.97 } }, pupils: { hover: { y: -1.2 } }, arms: { hover: { x: 1, y: -1 } }, mouth: { hover: { y: -0.5 } } },
  supportive: { body: { hover: { scaleX: 1.035, scaleY: 0.985 }, tap: { scaleX: 1.06, scaleY: 0.94 } }, pupils: { hover: { y: -0.7 } }, arms: { hover: { y: -3, scaleX: 1.05 } }, mouth: { hover: { scaleX: 1.08 } } },
  alert: { body: { hover: { y: -1, scaleX: 1.015 }, tap: { scaleY: 0.97, y: 1 } }, pupils: { hover: { y: -1 } }, arms: { hover: { y: -2, scaleX: 0.96 } }, mouth: { hover: { scaleX: 0.96 } } },
  celebrate: { body: { hover: { y: -3, scaleY: 1.04 }, tap: { scaleX: 1.08, scaleY: 0.9, y: 2 } }, pupils: { hover: { y: -1.5 } }, arms: { hover: { y: -5, rotate: -4 } }, mouth: { hover: { scaleX: 1.18, scaleY: 1.08 } } },
  calm: { body: { hover: { scaleX: 1.02, scaleY: 1.01 }, tap: { scaleY: 0.98 } }, pupils: { hover: { y: -0.5 } }, arms: { hover: { y: -1 } }, mouth: { hover: { scaleX: 1.04 } } },
}

export function characterPartVariants(preset = 'friendly', reducedMotion = false) {
  const selected = characterInteractions[preset] || characterInteractions.friendly
  const transition = { duration: reducedMotion ? 0.01 : 0.24, ease: ablaEase }
  const part = (name) => ({
    idle: { opacity: name === 'decoration' ? 0.45 : 1, scale: name === 'decoration' ? 0.82 : 1, x: 0, y: 0, rotate: 0 },
    hover: { ...(selected[name]?.hover || (name === 'decoration' ? { opacity: 1, scale: 1 } : {})), transition },
    tap: { ...(selected[name]?.tap || selected[name]?.hover || {}), transition: { ...transition, duration: reducedMotion ? 0.01 : 0.13 } },
    selected: { ...(selected[name]?.hover || {}), transition },
  })
  return { body: part('body'), pupils: part('pupils'), arms: part('arms'), mouth: part('mouth'), decoration: part('decoration') }
}

export function motionIfAllowed(reducedMotion, animation) {
  return reducedMotion ? {} : animation
}
