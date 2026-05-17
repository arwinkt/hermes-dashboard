// src/screens/dashboard/components/hermes-os/mcp-panel-card.tsx
import { cn } from '@/lib/utils'
import { MCP_SERVERS } from '@/lib/hermes-os-api'
import { HermesCard } from './hermes-card'

export function McpPanelCard() {
  return (
    <HermesCard title="MCP Servers">
      <div className="flex flex-col gap-2">
        {MCP_SERVERS.map((server) => (
          <div
            key={server.name}
            className="flex items-center justify-between rounded-lg border border-[var(--theme-border)] bg-[var(--theme-bg,#0d0d14)] px-3 py-2"
          >
            <span className="text-sm capitalize text-[var(--theme-text)]">
              {server.name}
            </span>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-semibold',
                'bg-green-900/40 text-green-400',
              )}
            >
              {server.tool_count} tools
            </span>
          </div>
        ))}
      </div>
    </HermesCard>
  )
}
