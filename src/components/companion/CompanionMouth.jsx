import { companionTokens } from './companionTokens.js'

const paths = {
  softSmile: 'M53 69Q60 75 67 69', smile: 'M50 67Q60 78 71 66', bigSmile: 'M48 65Q60 82 73 64',
  neutral: 'M54 71H67', smallOpen: 'M57 68Q61 73 65 68', worried: 'M53 74Q60 67 68 74', sad: 'M51 76Q60 66 70 76', focused: 'M54 72H68',
}

export default function CompanionMouth({ expression = 'softSmile' }) {
  return <path d={paths[expression] || paths.softSmile} fill="none" stroke={companionTokens.color.ink} strokeWidth="3.5" strokeLinecap="round" />
}

