import AblaCharacter from './AblaCharacter.jsx'

export default function AblaEmptyState({ title, description, kind = 'empty', action }) {
  const config = {
    empty: { emotion: 'neutral', shape: 'stack' },
    messages: { emotion: 'chat', shape: 'pill' },
    cases: { emotion: 'calm', shape: 'blob' },
    search: { emotion: 'worried', shape: 'circle' },
  }[kind] || { emotion: 'neutral', shape: 'blob' }

  return (
    <div className="flex flex-col items-center px-5 py-10 text-center">
      <div className="grid h-36 w-36 place-items-center rounded-abla-blob bg-abla-blue-soft">
        <AblaCharacter {...config} size="lg" animate="breathe" decoration />
      </div>
      <h3 className="mt-5 text-lg font-extrabold text-abla-blue">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
