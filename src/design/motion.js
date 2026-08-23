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

export function motionIfAllowed(reducedMotion, animation) {
  return reducedMotion ? {} : animation
}
