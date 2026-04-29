import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'

function ReportCard({ title, description, imageSrc, accentColor, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full"
    >
      <div className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="h-14 w-1 rounded-full" style={{ backgroundColor: accentColor }} aria-hidden="true" />

        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-abla-bg">
          <img src={imageSrc} alt="" className="h-[60px] w-[60px] object-contain p-2" draggable="false" />
        </div>

        <div className="min-w-0 flex-1 text-left">
          <div className="text-[15px] font-bold text-abla-blue">{title}</div>
          <div className="mt-1 text-[13px] leading-5 text-slate-600">{description}</div>
        </div>

        <ChevronRight className="h-5 w-5 text-slate-400" aria-hidden="true" />
      </div>
    </motion.button>
  )
}

export default function Reportar() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-abla-bg">
      <Header title="Reportar" showBack showIcons={false} />

      <div className="mx-auto w-full max-w-[390px] px-4 pb-24">
        <div className="mt-6 text-[16px] font-bold text-abla-blue">¿Qué situación quieres reportar?</div>

        <div className="mt-4 flex flex-col gap-3">
          <ReportCard
            title="Situación de Abuso"
            description="Reporta una situación de abuso para que podamos ayudarte de forma segura."
            imageSrc="/Illustrations/reporte-abuso.svg"
            accentColor="#56A087"
            onClick={() => navigate('/reportar/abuso')}
          />

          <ReportCard
            title="Cyberbullying"
            description="Si el acoso ocurre por redes o mensajes, repórtalo aquí y guarda evidencia."
            imageSrc="/Illustrations/reporte-cyber.svg"
            accentColor="#F59E0B"
            onClick={() => navigate('/reportar/cyberbullying')}
          />

          <ReportCard
            title="Violencia Física"
            description="Si hubo agresión física o riesgo inmediato, repórtalo cuanto antes."
            imageSrc="/Illustrations/reporte-violencia.svg"
            accentColor="#EF4444"
            onClick={() => navigate('/reportar/violencia')}
          />
        </div>
      </div>
    </div>
  )
}
