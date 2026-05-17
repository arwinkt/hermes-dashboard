// src/screens/dashboard/components/hermes-os/cron-panel-card.tsx
import { useQuery } from '@tanstack/react-query'
import { getCronJobs } from '@/lib/hermes-os-api'
import { HermesCard } from './hermes-card'

const CRON_FALLBACK = [
  { id: '1', name: 'Dream Reflection', schedule: { display: '02:00 AEST' }, last_run_at: null },
  { id: '2', name: 'Session Rotate',   schedule: { display: '03:00 AEST' }, last_run_at: null },
  { id: '3', name: 'Morning Brief',    schedule: { display: '08:00 AEST' }, last_run_at: null },
  { id: '4', name: 'Standup Nudge',    schedule: { display: '09:00 AEST' }, last_run_at: null },
  { id: '5', name: 'GitHub Backup',    schedule: { display: '23:00 AEST' }, last_run_at: null },
]

function formatLastRun(ts: string | null): string {
  if (!ts) return '—'
  const diff = Date.now() - new Date(ts).getTime()
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function CronPanelCard() {
  const { data: jobs } = useQuery({
    queryKey: ['hermes-os', 'cron-jobs'],
    queryFn: getCronJobs,
    staleTime: 60_000,
  })

  const list = jobs?.length ? jobs : CRON_FALLBACK

  return (
    <HermesCard title="Cron Jobs">
      <div className="flex flex-col gap-1.5">
        {list.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between rounded-lg border border-[var(--theme-border)] bg-[var(--theme-bg,#0d0d14)] px-3 py-2"
          >
            <span className="text-sm text-[var(--theme-text)]">{job.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--theme-muted)]">
                {formatLastRun(job.last_run_at)}
              </span>
              <span className="text-xs text-[var(--theme-muted)]">
                {job.schedule.display}
              </span>
            </div>
          </div>
        ))}
      </div>
    </HermesCard>
  )
}
