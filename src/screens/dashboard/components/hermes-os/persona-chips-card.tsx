// src/screens/dashboard/components/hermes-os/persona-chips-card.tsx
import { PANTHEON_PERSONAS } from '@/lib/hermes-os-api'
import { HermesCard } from './hermes-card'

const COLOR_CLASSES: Record<string, string> = {
  violet:    'bg-violet-900/40 text-violet-300 border-violet-700/50',
  blue:      'bg-blue-900/40   text-blue-300   border-blue-700/50',
  green:     'bg-green-900/40  text-green-300  border-green-700/50',
  amber:     'bg-amber-900/40  text-amber-300  border-amber-700/50',
  purple:    'bg-purple-900/40 text-purple-300 border-purple-700/50',
}

export function PersonaChipsCard() {
  return (
    <HermesCard title="Pantheon">
      <div className="flex flex-wrap gap-2">
        {PANTHEON_PERSONAS.map((persona) => (
          <span
            key={persona.name}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${COLOR_CLASSES[persona.color] ?? ''}`}
          >
            {persona.name}
          </span>
        ))}
      </div>
    </HermesCard>
  )
}
