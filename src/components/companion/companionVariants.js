export const personalityDefaults = {
  friendly: { mood: 'happy', pose: 'idle', gaze: 'center' },
  curious: { mood: 'curious', pose: 'thinking', gaze: 'up' },
  empathetic: { mood: 'calm', pose: 'listening', gaze: 'center' },
  motivating: { mood: 'happy', pose: 'open', gaze: 'up' },
  calm: { mood: 'calm', pose: 'resting', gaze: 'center' },
  protective: { mood: 'focused', pose: 'protecting', gaze: 'left' },
}

export const moodFaces = {
  neutral: { eyes: 'open', mouth: 'neutral' },
  happy: { eyes: 'open', mouth: 'smile' },
  excited: { eyes: 'happy', mouth: 'bigSmile' },
  calm: { eyes: 'closed', mouth: 'softSmile' },
  curious: { eyes: 'curious', mouth: 'softSmile' },
  confused: { eyes: 'side', mouth: 'worried' },
  worried: { eyes: 'worried', mouth: 'worried' },
  sad: { eyes: 'down', mouth: 'sad' },
  focused: { eyes: 'focused', mouth: 'focused' },
  relieved: { eyes: 'relaxed', mouth: 'smile' },
}

export const gazeOffsets = {
  center: [0, 0], left: [-2.2, 0], right: [2.2, 0], up: [0, -2], down: [0, 2], target: [1.5, -.8],
}

