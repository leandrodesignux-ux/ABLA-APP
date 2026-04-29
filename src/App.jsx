import { motion } from 'framer-motion'
import { Activity, Cpu, ShieldAlert, Wifi } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-industrial-bg text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="mx-auto max-w-5xl px-4 py-6"
      >
        <header className="glass-panel flex items-center justify-between rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
              <Cpu className="h-5 w-5 text-industrial-brand" />
            </div>
            <div className="text-left">
              <div className="text-tech-med font-medium tracking-wide text-slate-100">
                Consola Industrial
              </div>
              <div className="text-tech-data text-slate-300">
                ABLA-APP / Visual Core
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-tech-data text-slate-300">
            <Wifi className="h-4 w-4 text-industrial-brand" />
            <span>LINK OK</span>
          </div>
        </header>

        <main className="mt-6 grid gap-4 md:grid-cols-3">
          <section className="glass-panel rounded-xl p-4 md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-industrial-brand" />
                <h1 className="text-tech-med font-medium">Estado del Sistema</h1>
              </div>
              <div className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-tech-data text-industrial-brand">
                ONLINE
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-left">
                <div className="text-tech-data text-slate-400">Canal</div>
                <div className="mt-1 text-tech-med">Control / I/O</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/30">
                  <div className="h-full w-2/3 bg-industrial-brand" />
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-left">
                <div className="text-tech-data text-slate-400">Reloj</div>
                <div className="mt-1 font-mono text-tech-med">00:00:00.000</div>
                <div className="mt-2 text-tech-data text-slate-400">Sincronización pendiente</div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 text-left font-mono text-tech-data leading-5 text-slate-300">
              <div className="text-slate-400">$ boot --profile industrial</div>
              <div>
                <span className="text-industrial-brand">[OK]</span> tokens cargados
              </div>
              <div>
                <span className="text-industrial-brand">[OK]</span> interfaz inicializada
              </div>
              <div>
                <span className="text-industrial-brand">[OK]</span> animación de entrada lista
              </div>
            </div>
          </section>

          <aside className="glass-panel rounded-xl p-4 text-left">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-industrial-brand" />
              <h2 className="text-tech-med font-medium">Alertas</h2>
            </div>

            <div className="mt-3 space-y-2">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-tech-data text-slate-400">Prioridad</div>
                <div className="mt-1 text-tech-med">Baja</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-tech-data text-slate-400">Mensaje</div>
                <div className="mt-1 text-tech-reg text-slate-200">
                  Consola lista. Conectá módulos para continuar.
                </div>
              </div>
            </div>
          </aside>
        </main>
      </motion.div>
    </div>
  )
}

export default App
