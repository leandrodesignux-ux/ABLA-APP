import { companionTokens } from './companionTokens.js'

export default function CompanionAccessory({ type = 'none' }) {
  if (type === 'speech') return <g><path d="M77 17h30c5 0 8 4 8 9v13c0 5-3 8-8 8H94l-7 6 1-6H77c-5 0-8-3-8-8V26c0-5 3-9 8-9Z" fill="white" stroke={companionTokens.color.blueSoft} strokeWidth="2" /><circle cx="87" cy="33" r="2" fill={companionTokens.color.body} /><circle cx="94" cy="33" r="2" fill={companionTokens.color.body} /><circle cx="101" cy="33" r="2" fill={companionTokens.color.body} /></g>
  if (type === 'shield') return <g transform="translate(2 66)"><path d="M16 1 30 7v13c0 10-6 16-14 20C8 36 2 30 2 20V7L16 1Z" fill="white" stroke="#75A9E6" strokeWidth="3" /><path d="m9 20 5 5 9-11" fill="none" stroke={companionTokens.color.body} strokeWidth="3" strokeLinecap="round" /></g>
  if (type === 'calendar') return <g transform="translate(78 68)"><rect width="38" height="39" rx="8" fill="white" stroke={companionTokens.color.blueSoft} strokeWidth="2" /><path d="M0 13h38M10 0v8M28 0v8" stroke="#75A9E6" strokeWidth="3" /><circle cx="11" cy="23" r="2.5" fill={companionTokens.color.bodySoft} /><circle cx="22" cy="23" r="2.5" fill={companionTokens.color.bodySoft} /></g>
  if (type === 'card') return <g transform="translate(80 66) rotate(5)"><rect width="34" height="43" rx="7" fill="white" stroke={companionTokens.color.blueSoft} strokeWidth="2" /><path d="M8 14h18M8 22h14" stroke={companionTokens.color.body} strokeWidth="3" strokeLinecap="round" /></g>
  if (type === 'options') return <g transform="translate(86 66)" fill="white"><rect width="27" height="8" rx="4" /><rect y="12" width="34" height="8" rx="4" /><rect y="24" width="22" height="8" rx="4" /></g>
  if (type === 'question') return <text x="101" y="31" fill="#9FC8F5" fontSize="30" fontWeight="800">?</text>
  return null
}

