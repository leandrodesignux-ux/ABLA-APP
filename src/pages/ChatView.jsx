import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Paperclip, Send } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { useAppContext } from '../context/AppContext.jsx'
import { anonimoBotFlows, tutorBotFlows, apoderadoBotFlows, profesionalBotFlows, CHAT_END_ACTIONS } from '../data/chatFlows.js'

function formatTime(date) {
  try {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

// Typing indicator with 3 animated dots
function TypingIndicator() {
  return (
    <div className="flex w-full justify-start">
      <div className="max-w-[75%]">
        <div className="px-4 py-3 rounded-[18px_18px_18px_4px] bg-white border border-[#E6E6E6]">
          <div className="flex items-center gap-1 h-5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
                className="w-2 h-2 rounded-full bg-abla-green opacity-60"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Bubble({ mine, text, time }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex w-full ${mine ? 'justify-end' : 'justify-start'}`}
    >
      <div className="max-w-[75%]">
        <div
          className={`px-4 py-3 text-[14px] leading-5 ${
            mine
              ? 'rounded-[18px_18px_4px_18px] bg-abla-blue text-white'
              : 'rounded-[18px_18px_18px_4px] bg-white border border-[#E6E6E6] text-abla-blue'
          }`}
        >
          {text}
        </div>
        <div className={`mt-1 text-[11px] text-slate-400 ${mine ? 'text-right' : 'text-left'}`}>{time}</div>
      </div>
    </motion.div>
  )
}

export default function ChatView() {
  const { type } = useParams()
  const location = useLocation()
  const { perfil } = useAppContext()
  const chatType = ['anonimo', 'tutor', 'profesor', 'grupal', 'profesional', 'apoyo-apoderado', 'grupos'].includes(type)
    ? type
    : 'anonimo'
  const navigate = useNavigate()
  const listRef = useRef(null)
  const [shake, setShake] = useState(false)

  const profesorNombre = location.state?.profesorNombre || 'Profesor'
  const profesorAvatarSrc = location.state?.avatarSrc || null
  const grupoNombre = location.state?.grupoNombre || 'Grupo'

  const chatMeta = useMemo(() => {
    const t = String(chatType || 'anonimo').toLowerCase()
    if (t === 'profesional') return {
      title: 'Asistente de Protocolos',
      avatarSrc: null,
      initialMessage: 'Hola. ¿Qué necesitas gestionar hoy?',
    }
    if (perfil === 'apoderado' && t === 'anonimo') return {
      title: 'Orientación Anónima',
      avatarSrc: null,
      initialMessage: 'Hola. Estoy aquí para ayudarte a proteger a tu hijo/a. ¿Qué situación quieres reportar o consultar?',
    }
    if (t === 'tutor') return { title: 'Mi Tutor', avatarSrc: '/Avatars/avatar-tutor.svg', initialMessage: 'Hola, soy tu tutor/a. ¿En qué puedo ayudarte?' }
    if (t === 'anonimo') return { title: 'Chat Anónimo', avatarSrc: null, initialMessage: 'Hola, estoy aquí para escucharte. ¿Qué está pasando?' }
    if (t === 'profesor') return { title: profesorNombre, avatarSrc: profesorAvatarSrc, initialMessage: 'Hola, soy tu profesor. ¿En qué te puedo ayudar?' }
    if (t === 'grupal') return { title: grupoNombre, avatarSrc: null, initialMessage: 'Bienvenido/a al grupo.' }
    return { title: 'Chat', avatarSrc: null, initialMessage: 'Hola, estoy aquí.' }
  }, [chatType, perfil, profesorNombre, profesorAvatarSrc, grupoNombre])

  const flow = useMemo(() => {
    const t = String(chatType || 'anonimo').toLowerCase()
    if (t === 'profesional') return profesionalBotFlows
    if (perfil === 'apoderado' && (t === 'anonimo' || t === 'apoyo-apoderado')) return apoderadoBotFlows
    if (t === 'tutor') return tutorBotFlows
    if (t === 'anonimo') return anonimoBotFlows
    return anonimoBotFlows
  }, [chatType, perfil])

  const [flowNode, setFlowNode] = useState('initial')
  const [quickReplies, setQuickReplies] = useState(flow?.initial?.quickReplies || [])

  useEffect(() => {
    setFlowNode('initial')
    setQuickReplies(flow?.initial?.quickReplies || [])
  }, [flow])

  const initialMsg = flow?.initial?.botMessage || chatMeta.initialMessage || 'Hola, estoy aquí para escucharte.'
  const [messages, setMessages] = useState(() => [
    {
      id: 'm-1',
      mine: false,
      text: initialMsg,
      createdAt: Date.now(),
    },
  ])

  useEffect(() => {
    setMessages([
      {
        id: `m-${Date.now()}`,
        mine: false,
        text: initialMsg,
        createdAt: Date.now(),
      },
    ])
  }, [initialMsg])

  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleQuickReply = (reply) => {
    const userMsg = {
      id: `m-${Date.now()}`,
      mine: true,
      text: reply.label,
      createdAt: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setQuickReplies([])

    if (CHAT_END_ACTIONS[reply.next]) {
      setTimeout(() => navigate(CHAT_END_ACTIONS[reply.next]), 800)
      return
    }

    if (!flow) return

    setIsTyping(true)
    const nextNode = flow[reply.next] || flow.libre
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}-r`,
          mine: false,
          text: nextNode?.botMessage || flow?.libre?.botMessage || 'Cuéntame más. Estoy escuchando.',
          createdAt: Date.now(),
        },
      ])
      setIsTyping(false)
      setFlowNode(reply.next)
      setQuickReplies(nextNode?.quickReplies || [])
    }, 1500)
  }

  // Smooth scroll to bottom
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages.length, isTyping])

  const send = () => {
    const text = draft.trim()
    if (!text) {
      // Shake animation when empty
      setShake(true)
      setTimeout(() => setShake(false), 300)
      return
    }

    const myMsg = {
      id: `m-${Date.now()}`,
      mine: true,
      text,
      createdAt: Date.now(),
    }

    setMessages((prev) => [...prev, myMsg])
    setDraft('')
    setIsTyping(true)

    window.setTimeout(() => {
      const freeNode = flow?.libre
      const reply = {
        id: `m-${Date.now()}-r`,
        mine: false,
        text: freeNode?.botMessage || 'Gracias por contarme. ¿Puedes contarme más sobre lo que está pasando?',
        createdAt: Date.now(),
      }
      setMessages((prev) => [...prev, reply])
      setIsTyping(false)
      if (freeNode) {
        setFlowNode('libre')
        setQuickReplies(freeNode.quickReplies || [])
      }
    }, 2000)
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg pb-24">
      <div className="relative">
        <Header title={chatMeta.title} showBack showIcons={false} />
        {chatType === 'anonimo' ? (
          <div className="pointer-events-none absolute left-1/2 top-[36px] -translate-x-1/2 text-[11px] font-medium text-slate-500">
            Confidencial 🔒
          </div>
        ) : null}
        {chatMeta.avatarSrc ? (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-white/60 bg-white/10">
              <img src={chatMeta.avatarSrc} alt="" className="h-full w-full object-cover" draggable="false" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-56px-96px)] w-full max-w-[390px] flex-col">
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-3">
            {messages.map((m) => (
              <Bubble key={m.id} mine={m.mine} text={m.text} time={formatTime(m.createdAt)} />
            ))}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="fixed bottom-16 left-0 right-0 z-40">
          <div className="mx-auto w-full max-w-[390px] bg-white px-4 py-3">
            {quickReplies.length > 0 ? (
              <div className="mb-3 flex gap-2 overflow-x-auto">
                {quickReplies.map((qr) => (
                  <button
                    key={`${flowNode}-${qr.label}`}
                    type="button"
                    onClick={() => handleQuickReply(qr)}
                    className="shrink-0 rounded-full border border-abla-blue bg-white px-3 py-2 text-[12px] font-medium text-abla-blue"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            ) : null}
            <motion.div
              animate={shake ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500"
                aria-label="Adjuntar"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send()
                }}
                placeholder="Escribe un mensaje..."
                className="h-10 flex-1 rounded-full border bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-abla-green focus:outline-none transition-colors duration-200"
                style={{ borderColor: draft.trim() ? '#56A087' : '#E6E6E6' }}
                aria-label="Mensaje"
              />

              <button
                type="button"
                onClick={send}
                disabled={!draft.trim()}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ${
                  draft.trim()
                    ? 'bg-abla-green text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
                aria-label="Enviar"
              >
                <Send className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
    </PageTransition>
  )
}
