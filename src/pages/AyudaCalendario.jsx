import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function isWeekend(date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

function getQueryParam(search, key) {
  try {
    return new URLSearchParams(search).get(key)
  } catch {
    return null
  }
}

function DayButton({ label, disabled, selected, onClick, isOutsideMonth }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      onClick={disabled ? undefined : onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold ${
        selected
          ? 'bg-abla-green text-white'
          : 'bg-white text-slate-700'
      } ${disabled ? 'opacity-40' : ''} ${isOutsideMonth ? 'text-slate-300' : ''}`}
      aria-label={label}
    >
      {label}
    </motion.button>
  )
}

export default function AyudaCalendario() {
  const navigate = useNavigate()
  const location = useLocation()

  const proFromState = location?.state?.proName
  const proFromQuery = getQueryParam(location?.search || '', 'pro')
  const proName = proFromState || proFromQuery || 'Profesional'

  const today = useMemo(() => startOfDay(new Date()), [])

  const monthInfo = useMemo(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()

    const first = new Date(year, month, 1)
    const last = new Date(year, month + 1, 0)

    const monthLabel = now.toLocaleDateString([], { month: 'long', year: 'numeric' })

    const mondayBasedFirstDay = (first.getDay() + 6) % 7
    const totalDays = last.getDate()

    const cells = []
    for (let i = 0; i < 42; i += 1) {
      const dayNumber = i - mondayBasedFirstDay + 1
      const date = new Date(year, month, dayNumber)
      const inMonth = dayNumber >= 1 && dayNumber <= totalDays
      cells.push({ date, inMonth })
    }

    return { monthLabel, cells, year, month }
  }, [])

  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const timeSlots = useMemo(() => ['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'], [])

  const canConfirm = Boolean(selectedDate && selectedTime)

  const dateLabel = useMemo(() => {
    if (!selectedDate) return null
    try {
      return new Date(selectedDate).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
    } catch {
      return null
    }
  }, [selectedDate])

  return (
    <PageTransition>
    <div className="min-h-screen bg-abla-bg">
      <Header title="Agendar cita" showBack showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] px-4 pb-10">
        <div className="mt-6 text-[16px] font-bold text-abla-blue">{proName}</div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-center text-[14px] font-semibold text-slate-700">{monthInfo.monthLabel}</div>

          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-[12px] font-semibold text-slate-500">
            <div>Lu</div>
            <div>Ma</div>
            <div>Mi</div>
            <div>Ju</div>
            <div>Vi</div>
            <div>Sa</div>
            <div>Do</div>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-2">
            {monthInfo.cells.map((cell) => {
              const date = cell.date
              const dayLabel = String(date.getDate())

              const isPast = startOfDay(date).getTime() < today.getTime()
              const isBusinessDay = !isWeekend(date)
              const isAvailable = cell.inMonth && isBusinessDay && !isPast

              const selected =
                selectedDate && startOfDay(selectedDate).getTime() === startOfDay(date).getTime() && cell.inMonth

              return (
                <DayButton
                  key={date.toISOString()}
                  label={dayLabel}
                  disabled={!isAvailable}
                  selected={selected}
                  isOutsideMonth={!cell.inMonth}
                  onClick={() => setSelectedDate(date)}
                />
              )
            })}
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[14px] font-semibold text-abla-blue">Horario</div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {timeSlots.map((t) => {
              const active = selectedTime === t
              return (
                <motion.button
                  key={t}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedTime(t)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold ${
                    active
                      ? 'border-abla-green bg-abla-green text-white'
                      : 'border-[#E6E6E6] bg-white text-slate-700'
                  }`}
                  aria-label={`Hora ${t}`}
                >
                  {t}
                </motion.button>
              )
            })}
          </div>
        </div>

        <motion.button
          type="button"
          whileHover={canConfirm ? { scale: 1.02 } : {}}
          whileTap={canConfirm ? { scale: 0.96 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={() => {
            if (!canConfirm) return
            const qp = new URLSearchParams()
            qp.set('pro', proName)
            qp.set('date', dateLabel || '')
            qp.set('time', selectedTime || '')
            navigate(`/ayuda/cita/confirmacion?${qp.toString()}`)
          }}
          className={`mt-6 h-12 w-full rounded-xl font-bold ${
            canConfirm ? 'bg-abla-green text-white' : 'bg-slate-200 text-slate-500'
          }`}
          aria-label="Confirmar cita"
        >
          CONFIRMAR CITA
        </motion.button>
      </div>
    </div>
    </PageTransition>
  )
}
