export const moodVisuals = {
  bien: {
    label: 'Bien',
    color: '#56A087',
    softColor: '#DCECE7',
    bodyPath: 'M25 20C37 10 82 10 96 22C107 33 107 72 98 88C90 102 72 105 58 100C44 106 24 101 17 87C9 71 12 34 25 20Z',
    motion: { y: [0, -5, 0], scaleY: [1, 1.025, 1], transition: { duration: .72 } },
  },
  mas_o_menos: {
    label: 'Más o menos',
    color: '#86AAA9',
    softColor: '#E3EEED',
    bodyPath: 'M22 27C34 12 52 17 64 12C82 8 101 22 101 42C111 59 97 77 94 91C79 103 61 96 48 102C27 104 14 87 18 69C8 51 12 36 22 27Z',
    motion: { x: [0, 4, -3, 0], rotate: [0, 1.5, -1, 0], transition: { duration: .9 } },
  },
  mal: {
    label: 'Mal',
    color: '#6683A8',
    softColor: '#E5EBF2',
    bodyPath: 'M25 39C38 27 78 25 94 38C105 47 106 75 97 89C88 102 72 105 59 101C44 106 25 102 17 89C9 76 13 50 25 39Z',
    motion: { scaleX: [1, 1.012, 1], scaleY: [1, .985, 1], y: [0, 2, 0], transition: { duration: 2.4 } },
  },
}

export const moodKeys = Object.keys(moodVisuals)

export function normalizeMood(value) {
  if (value === 'BIEN' || value === 'bien') return 'bien'
  if (value === 'MAS O MENOS' || value === 'mas_o_menos') return 'mas_o_menos'
  if (value === 'MAL' || value === 'mal') return 'mal'
  return 'mas_o_menos'
}
