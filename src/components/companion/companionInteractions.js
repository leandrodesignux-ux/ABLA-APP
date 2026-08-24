import { companionTokens } from './companionTokens.js'

export const companionReactions = {
  acknowledge: {
    priority: 1, duration: 780, mood: 'happy', gaze: 'down', pose: 'idle',
    motion: { y: [0, 1, 0], rotate: [0, 2, -1, 0], transition: { duration: companionTokens.timing.acknowledge } },
  },
  listen: {
    priority: 2, duration: 1200, mood: 'calm', gaze: 'target', pose: 'listening',
    motion: { rotate: [0, 1, 1], transition: { duration: 1.1 } },
  },
  encourage: {
    priority: 1, duration: 950, mood: 'happy', gaze: 'up', pose: 'pointing', decorations: 'energy',
    motion: { y: [0, -3, 0], transition: { duration: .8 } },
  },
  celebrate: {
    priority: 2, duration: 1100, mood: 'excited', gaze: 'up', pose: 'celebrating', decorations: 'energy', accessory: 'spark',
    motion: { y: [0, -5, 0], scaleY: [1, 1.025, 1], transition: { duration: .85 } },
  },
  concern: {
    priority: 4, duration: 1500, mood: 'worried', gaze: 'center', pose: 'listening', decorations: 'none',
    motion: { y: [0, 2, 2], scaleY: [1, .99, .99], transition: { duration: 1.25 } },
  },
  protect: {
    priority: 5, duration: 1450, mood: 'focused', gaze: 'center', pose: 'protecting', accessory: 'shield', decorations: 'none',
    motion: { scaleX: [1, 1.02, 1.02], transition: { duration: 1 } },
  },
  think: {
    priority: 1, duration: 1200, mood: 'curious', gaze: 'up', pose: 'thinking', accessory: 'question', decorations: 'question',
    motion: { rotate: [0, -1.5, -1.5], transition: { duration: .8 } },
  },
  wait: {
    priority: 1, duration: 1400, mood: 'calm', gaze: 'left', pose: 'resting', decorations: 'none',
    motion: { scaleX: [1, .995, 1], scaleY: [1, 1.012, 1], transition: { duration: 1.4 } },
  },
  success: {
    priority: 3, duration: 1250, mood: 'relieved', gaze: 'center', pose: 'supporting', accessory: 'check', decorations: 'subtle',
    motion: { y: [3, 0, 0], scale: [.96, 1.025, 1], transition: { duration: .8 } },
  },
}

export const reactionNames = Object.keys(companionReactions)

export function getCompanionReaction(name) {
  return companionReactions[name] || null
}

