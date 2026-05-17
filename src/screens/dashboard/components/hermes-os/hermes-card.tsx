// src/screens/dashboard/components/hermes-os/hermes-card.tsx
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function HermesCard({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4',
        className,
      )}
    >
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--theme-muted)]">
        {title}
      </h4>
      {children}
    </div>
  )
}
