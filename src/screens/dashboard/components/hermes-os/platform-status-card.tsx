// src/screens/dashboard/components/hermes-os/platform-status-card.tsx
import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { getGatewayHealth } from '@/lib/hermes-os-api'
import { HermesCard } from './hermes-card'

const PLATFORMS = ['whatsapp', 'email', 'telegram'] as const

const PLATFORM_LABELS: Record<string, string> = {
  whatsapp: 'WhatsApp',
  email: 'Email',
  telegram: 'Telegram',
}

export function PlatformStatusCard() {
  const { data: health, isPending, isError } = useQuery({
    queryKey: ['hermes-os', 'gateway-health'],
    queryFn: getGatewayHealth,
    refetchInterval: 30_000,
    staleTime: 25_000,
  })

  return (
    <HermesCard title="Platforms">
      <div className="flex flex-col gap-2">
        {PLATFORMS.map((key) => {
          const platform = health?.platforms?.[key]
          const connected = platform?.connected ?? false
          return (
            <div
              key={key}
              className="flex items-center justify-between rounded-lg border border-[var(--theme-border)] bg-[var(--theme-bg,#0d0d14)] px-3 py-2"
            >
              <span className="text-sm text-[var(--theme-text)]">
                {PLATFORM_LABELS[key]}
              </span>
              <span
                className={cn(
                  'text-xs font-semibold',
                  isPending
                    ? 'text-[var(--theme-muted)]'
                    : isError || health === null
                      ? 'text-[var(--theme-muted)]'
                      : connected
                        ? 'text-green-400'
                        : 'text-[var(--theme-muted)]',
                )}
              >
                {isPending ? '…' : isError || health === null ? '—' : connected ? '● LIVE' : '○ OFF'}
              </span>
            </div>
          )
        })}
      </div>
    </HermesCard>
  )
}
