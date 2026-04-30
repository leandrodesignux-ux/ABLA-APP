import { useEffect, useMemo, useRef, useState } from 'react'
import { Paperclip, Send } from 'lucide-react'
import { useParams } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

function formatTime(date) {
  try {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

function Bubble({ mine, text, time }) {
  return (
    <div className={`flex w-full ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[75%]">
        <div
          className={`px-4 py-3 text-[14px] leading-5 ${
            mine
              ? 'rounded-2xl rounded-br-sm bg-abla-green text-white'
              : 'rounded-2xl rounded-bl-sm bg-[#F1F5F9] text-[#1E293B]'
          }`}
        >
          {text}
        </div>
        <div className={`mt-1 text-[11px] text-slate-400 ${mine ? 'text-right' : 'text-left'}`}>{time}</div>
      </div>
    </div>
  )
}

export default function ChatView() {
  const { type } = useParams()
  const listRef = useRef(null)

  const chatMeta = useMemo(() => {
    const t = String(type || '').toLowerCase()
    if (t === 'anonimo') return { title: 'Chat Anónimo', avatarSrc: null }
    if (t === 'tutor') return { title: 'Mi Tutor', avatarSrc: '/Avatars/avatar-tutor.svg' }
    if (t === 'profesor') return { title: 'Profesor', avatarSrc: null }
    if (t === 'grupal') return { title: 'Grupal', avatarSrc: null }
    return { title: 'Chat', avatarSrc: null }
  }, [type])

  const [messages, setMessages] = useState(() => [
    {
      id: 'm-1',
      mine: false,
      text: 'Hola, estoy aquí para escucharte. ¿Cómo te sientes hoy?',
      createdAt: Date.now(),
    },
  ])

  const [draft, setDraft] = useState('')

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages.length])

  const send = () => {
    const text = draft.trim()
    if (!text) return

    const myMsg = {
      id: `m-${Date.now()}`,
      mine: true,
      text,
      createdAt: Date.now(),
    }

    setMessages((prev) => [...prev, myMsg])
    setDraft('')

    window.setTimeout(() => {
      const reply = {
        id: `m-${Date.now()}-r`,
        mine: false,
        text: 'Gracias por contarme. ¿Puedes contarme más sobre lo que está pasando?',
        createdAt: Date.now(),
      }
      setMessages((prev) => [...prev, reply])
    }, 1000)
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg pb-24">
      <div className="relative">
        <Header title={chatMeta.title} showBack showIcons={false} />
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
          </div>
        </div>

        <div className="fixed bottom-16 left-0 right-0 z-40">
          <div className="mx-auto w-full max-w-[390px] bg-white px-4 py-3">
            <div className="flex items-center gap-2">
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
                className="h-10 flex-1 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-abla-green focus:outline-none"
                aria-label="Mensaje"
              />

              <button
                type="button"
                onClick={send}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-abla-green text-white"
                aria-label="Enviar"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
    </PageTransition>
  )
}
