import { motion, useReducedMotion } from 'framer-motion'

const ink = '#3F5577'
const green = '#56A087'
const greenSoft = '#DCECE7'
const blueSoft = '#C7D2E2'

const calm = (reducedMotion, hover, tap = { scale: .97 }) => ({ idle: {}, hover: reducedMotion ? {} : hover, tap: reducedMotion ? {} : tap })

function ChatIllustration({ reducedMotion }) {
  return <>
    <circle cx="48" cy="60" r="39" fill={greenSoft} />
    <motion.g variants={calm(reducedMotion, { y: -4, scale: 1.025 })} style={{ transformOrigin: '54px 55px' }}>
      <path d="M25 35h57c8 0 13 5 13 13v24c0 8-5 13-13 13H55L39 98l4-13H25c-8 0-13-5-13-13V48c0-8 5-13 13-13Z" fill="white" stroke={ink} strokeWidth="3" />
      <motion.g variants={{ idle: { opacity: .45 }, hover: { opacity: 1 } }} fill={green}><circle cx="38" cy="61" r="4" /><circle cx="54" cy="61" r="4" /><circle cx="70" cy="61" r="4" /></motion.g>
    </motion.g>
    <g transform="translate(75 71)"><path d="M13 1 25 6v11c0 9-5 14-12 18C6 31 1 26 1 17V6L13 1Z" fill={blueSoft} stroke="white" strokeWidth="3" /><path d="m8 17 4 4 7-9" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" /></g>
  </>
}

function AppointmentIllustration({ reducedMotion }) {
  return <>
    <path d="M16 26C29 12 88 13 103 29C113 41 107 92 91 103C73 112 28 105 17 91C7 76 5 40 16 26Z" fill="#E7ECF4" />
    <motion.g variants={calm(reducedMotion, { scale: 1.045, y: -3 })} style={{ transformOrigin: '60px 63px' }}>
      <rect x="27" y="28" width="66" height="70" rx="15" fill="white" stroke={ink} strokeWidth="3" />
      <path d="M27 49h66M43 22v13M77 22v13" stroke={green} strokeWidth="5" strokeLinecap="round" />
      <circle cx="46" cy="67" r="5" fill={greenSoft} /><circle cx="61" cy="67" r="5" fill={blueSoft} />
      <motion.path variants={{ idle: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }} d="m70 81 5 5 10-13" fill="none" stroke={green} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
  </>
}

function AdviceIllustration({ reducedMotion }) {
  return <>
    <path d="M20 33C31 16 83 10 101 29C112 42 106 83 89 100C72 109 27 101 15 84C7 70 9 46 20 33Z" fill="#E7F1EE" />
    <motion.g variants={calm(reducedMotion, { rotate: -4, y: -2 })} style={{ transformOrigin: '48px 62px' }}><rect x="24" y="31" width="57" height="72" rx="12" fill="white" stroke={ink} strokeWidth="3" /><path d="M38 49h29M38 61h22M38 73h27" stroke={green} strokeWidth="4" strokeLinecap="round" /></motion.g>
    <motion.g variants={calm(reducedMotion, { rotate: 5, x: 3 })} style={{ transformOrigin: '78px 58px' }}><rect x="63" y="24" width="34" height="46" rx="9" fill={blueSoft} /><path d="M72 39h16M72 49h12" stroke="white" strokeWidth="3" strokeLinecap="round" /></motion.g>
  </>
}

function ReportIllustration({ reducedMotion }) {
  return <>
    <rect x="12" y="20" width="96" height="83" rx="24" fill="#FBEAEA" />
    <motion.g variants={calm(reducedMotion, { y: -4 })}>
      <path d="M46 28 76 40v25c0 21-12 32-30 41C28 97 16 86 16 65V40l30-12Z" fill="white" stroke="#75A9E6" strokeWidth="4" />
      <path d="m31 64 11 11 20-26" fill="none" stroke={green} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
    <motion.g variants={calm(reducedMotion, { x: 3, rotate: 2 })} style={{ transformOrigin: '84px 68px' }}><rect x="68" y="44" width="35" height="49" rx="9" fill="white" stroke={ink} strokeWidth="3" /><path d="M78 59h15M78 69h15M78 79h10" stroke={ink} strokeWidth="3" strokeLinecap="round" /></motion.g>
  </>
}

function SurveyIllustration({ reducedMotion }) {
  return <>
    <circle cx="75" cy="58" r="44" fill="#E3EEED" /><path d="M12 77C21 63 43 62 54 75C63 87 55 106 38 108C21 110 4 93 12 77Z" fill={blueSoft} />
    <motion.g variants={calm(reducedMotion, { y: -3, rotate: 1.5 })} style={{ transformOrigin: '68px 61px' }}><rect x="31" y="22" width="70" height="82" rx="15" fill="white" stroke={ink} strokeWidth="3" /><path d="M46 44h37M46 62h37M46 80h37" stroke={blueSoft} strokeWidth="4" strokeLinecap="round" /><motion.g variants={{ idle: { opacity: .45 }, hover: { opacity: 1 }, tap: { opacity: 1 } }} fill={green}><circle cx="43" cy="44" r="5" /><circle cx="43" cy="62" r="5" /><circle cx="43" cy="80" r="5" /></motion.g><motion.path variants={{ idle: { opacity: 0 }, hover: { opacity: 1 } }} d="m78 91 5 5 10-13" fill="none" stroke={green} strokeWidth="4" strokeLinecap="round" /></motion.g>
  </>
}

export default function ActionIllustration({ type = 'chat', className = '' }) {
  const reducedMotion = useReducedMotion()
  return <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
    {type === 'chat' && <ChatIllustration reducedMotion={reducedMotion} />}
    {type === 'appointment' && <AppointmentIllustration reducedMotion={reducedMotion} />}
    {type === 'advice' && <AdviceIllustration reducedMotion={reducedMotion} />}
    {type === 'report' && <ReportIllustration reducedMotion={reducedMotion} />}
    {type === 'survey' && <SurveyIllustration reducedMotion={reducedMotion} />}
  </svg>
}
