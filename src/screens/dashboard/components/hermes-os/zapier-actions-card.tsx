// src/screens/dashboard/components/hermes-os/zapier-actions-card.tsx
import { ZAPIER_APPS } from '@/lib/hermes-os-api'
import { HermesCard } from './hermes-card'

const APP_ICONS: Record<string, string> = {
  Gmail:            '✉️',
  'Google Calendar': '📅',
}

export function ZapierActionsCard() {
  return (
    <HermesCard title="Zapier">
      <div className="flex flex-col gap-2">
        {ZAPIER_APPS.map((app) => (
          <div
            key={app.app}
            className="flex items-center justify-between rounded-lg border border-[var(--theme-border)] bg-[var(--theme-bg,#0d0d14)] px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span>{APP_ICONS[app.app] ?? '⚡'}</span>
              <span className="text-sm text-[var(--theme-text)]">{app.app}</span>
            </div>
            <span className="rounded-full bg-[var(--theme-border)] px-2 py-0.5 text-xs text-[var(--theme-muted)]">
              {app.action_count} actions
            </span>
          </div>
        ))}
      </div>
    </HermesCard>
  )
}
