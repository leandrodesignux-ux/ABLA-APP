import { useState } from 'react'
import { Check, Copy, ExternalLink, HeartHandshake, Layers3, Mail, Sparkles, Wrench } from 'lucide-react'
import BottomNav from '../components/BottomNav.jsx'
import Header from '../components/Header.jsx'
import PageTransition from '../components/PageTransition.jsx'

const tools = [
  ['Figma', 'Diseño visual, prototipado y sistema de componentes'],
  ['React + Vite', 'Arquitectura de interfaz y navegación por perfiles'],
  ['Tailwind CSS', 'Sistema responsive, tokens y consistencia visual'],
  ['Framer Motion', 'Microinteracciones y feedback emocional sutil'],
  ['Lucide + SVG propio', 'Iconografía funcional e ilustraciones ABLA'],
  ['Local Storage', 'Prototipo persistente para check-ins y seguimiento'],
]

const process = [
  ['Investigar la barrera emocional', 'El punto de partida fue entender qué necesita una persona para sentirse suficientemente segura como para pedir ayuda.'],
  ['Diseñar niveles de exposición', 'Chat anónimo, orientación, citas y reportes permiten comenzar desde el nivel de confianza disponible.'],
  ['Conectar tres perfiles', 'La experiencia adapta información y acciones para estudiantes, apoderados y profesionales sin separar el proceso.'],
  ['Hacer visible el seguimiento', 'Estados, bitácora y rutas guiadas convierten el reporte en un proceso comprensible y acompañable.'],
  ['Refinar y validar', 'El sistema se revisó mobile-first, con lectura accesible, motion reducido y estados que no dependen solo del color.'],
]

const impact = [
  ['Un ecosistema, tres perspectivas', 'ABLA evolucionó de una app centrada en estudiantes a una experiencia conectada para estudiantes, apoderados y profesionales.'],
  ['Más formas de pedir ayuda', 'El producto integra chat anónimo, citas, consejos, reportes y recursos para que una única acción no sea la única puerta de entrada.'],
  ['Seguimiento comprensible', 'Los casos avanzan mediante seis estados visibles, desde la recepción hasta el cierre y seguimiento.'],
  ['Prevención cotidiana', 'El check-in y el Mood Tracker incorporan el registro emocional semanal y mensual sin convertirlo en una evaluación clínica.'],
]

function DetailCard({ eyebrow, title, icon: Icon, children }) {
  return <section className="rounded-abla-panel bg-white p-5 shadow-abla-card md:p-6" aria-labelledby={`section-${eyebrow}`}>
    <div className="flex items-center justify-between gap-3"><p id={`section-${eyebrow}`} className="text-xs font-black uppercase tracking-[.15em] text-abla-green">{eyebrow}</p><span className="grid h-10 w-10 place-items-center rounded-2xl bg-abla-blue-soft text-abla-blue" aria-hidden="true"><Icon className="h-5 w-5" /></span></div>
    <h2 className="mt-3 text-xl font-black text-abla-blue">{title}</h2>
    <div className="mt-5">{children}</div>
  </section>
}

function NarrativeList({ items }) {
  return <div className="divide-y divide-slate-100">{items.map(([title, description]) => <article key={title} className="py-4 first:pt-0 last:pb-0"><h3 className="text-sm font-extrabold text-abla-blue">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{description}</p></article>)}</div>
}

export default function ComoLoConstrui() {
  const [copied, setCopied] = useState(false)
  const email = 'leandrodesign.ux@gmail.com'

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return <PageTransition><div className="min-h-dvh bg-abla-bg pb-24 md:pb-12"><Header title="Cómo lo construí" showBack />
    <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10 lg:px-8">
      <section className="overflow-hidden rounded-abla-panel bg-abla-blue text-white shadow-abla-float">
        <div className="grid gap-7 p-5 md:p-8 lg:grid-cols-[1fr_340px] lg:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[.14em] text-abla-green-soft"><Sparkles className="h-3.5 w-3.5" /> Documentación del proyecto</span>
            <h1 className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-black leading-none tracking-tight">Leandro Balbian</h1>
            <p className="mt-3 text-base font-bold text-abla-green-soft md:text-lg">Product Designer · UX/UI · Diseño de producto digital</p>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/75 md:text-base">ABLA nace de una pregunta sensible: ¿cómo permitir que un estudiante pida ayuda sin sentirse expuesto y, al mismo tiempo, dar a los adultos información suficiente para intervenir y acompañar? La respuesta evolucionó hacia un ecosistema de prevención, comunicación y seguimiento para toda la comunidad escolar.</p>
          </div>

          <aside className="rounded-abla-card bg-white/8 p-4 ring-1 ring-white/15 md:p-5" aria-label="Datos profesionales de Leandro Balbian">
            <p className="text-xs font-black uppercase tracking-[.15em] text-white/55">Contacto</p>
            <button type="button" onClick={copyEmail} className="mt-4 flex min-h-14 w-full items-center gap-3 rounded-abla-control bg-white/10 px-4 text-left transition-colors hover:bg-white/15" aria-label={copied ? 'Correo copiado' : `Copiar correo ${email}`}><Mail className="h-5 w-5 shrink-0 text-abla-green-soft" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{email}</span><span className="text-[11px] text-white/55">{copied ? 'Copiado al portapapeles' : 'Haz clic para copiar'}</span></span>{copied ? <Check className="h-4 w-4 text-abla-green-soft" /> : <Copy className="h-4 w-4 text-white/55" />}</button>
            <a href="https://www.linkedin.com/in/leodisenofreelance/" target="_blank" rel="noreferrer" className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-abla-control bg-abla-green-soft px-4 text-sm font-black text-abla-blue"><span className="grid h-4 w-4 place-items-center rounded-sm bg-abla-blue text-[9px] text-white" aria-hidden="true">in</span> LinkedIn <ExternalLink className="h-3.5 w-3.5" /></a>
            <a href="https://leandrobalbian.com/" target="_blank" rel="noreferrer" className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-abla-control bg-white px-4 text-sm font-black text-abla-blue">Portfolio <ExternalLink className="h-4 w-4" /></a>
          </aside>
        </div>
      </section>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-3">
        <DetailCard eyebrow="herramientas" title="Con qué se construyó" icon={Wrench}><div className="space-y-2.5">{tools.map(([name, use]) => <div key={name} className="rounded-abla-control bg-abla-bg p-3.5"><div className="text-sm font-extrabold text-abla-blue">{name}</div><div className="mt-1 text-xs leading-5 text-slate-500">{use}</div></div>)}</div></DetailCard>
        <DetailCard eyebrow="proceso" title="Cómo tomé las decisiones" icon={Layers3}><NarrativeList items={process} /></DetailCard>
        <DetailCard eyebrow="impacto" title="Qué cambió con ABLA" icon={HeartHandshake}><NarrativeList items={impact} /></DetailCard>
      </div>

      <section className="mt-6 rounded-abla-panel bg-abla-green-soft p-5 md:p-8"><p className="text-xs font-black uppercase tracking-[.15em] text-abla-green">Reflexión</p><p className="mt-3 max-w-4xl text-lg font-extrabold leading-8 text-abla-blue md:text-2xl">Diseñar una experiencia segura no elimina la complejidad del problema: permite que cada persona pueda enfrentarlo desde el nivel de confianza que tiene en ese momento.</p></section>
    </main><BottomNav /></div></PageTransition>
}
