// src/lib/hermes-os-api.ts
//
// Gateway: aiohttp on localhost:8642 (no auth required)
// Confirmed endpoints (Task 3 probe):
//   GET /health/detailed  → platform connection status
//   GET /api/jobs         → cron job list

const GATEWAY = import.meta.env.VITE_GATEWAY_URL ?? 'http://localhost:8642'

export type PlatformInfo = {
  connected: boolean
  [key: string]: unknown
}

export type GatewayHealth = {
  status: string
  platform: string      // e.g. "hermes-agent" — the gateway platform identifier
  gateway_state: string
  platforms: Record<string, PlatformInfo>
  active_agents: number
  pid: number
  updated_at: string
}

export type CronSchedule = {
  kind: string
  expr: string
  display: string
}

export type PersonaColor = 'violet' | 'blue' | 'green' | 'amber' | 'purple'

export type CronJob = {
  id: string
  name: string
  prompt: string
  schedule: CronSchedule
  repeat: boolean
  enabled: boolean
  state: string
  next_run_at: string | null
  last_run_at: string | null
}

async function gatewayGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${GATEWAY}${path}`, {
      signal: AbortSignal.timeout(5_000),
    })
    if (!res.ok) {
      console.error(`[hermes-os] gateway ${res.status} ${res.statusText} on ${path}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    if (err instanceof Error && err.name !== 'AbortError') {
      console.error(`[hermes-os] fetch error on ${path}:`, err)
    }
    return null
  }
}

export async function getGatewayHealth(): Promise<GatewayHealth | null> {
  return gatewayGet<GatewayHealth>('/health/detailed')
}

export async function getCronJobs(): Promise<CronJob[]> {
  const data = await gatewayGet<{ jobs: CronJob[] }>('/api/jobs')
  if (!Array.isArray(data?.jobs)) return []
  return data.jobs
}

// MCP servers — static: gateway has no MCP registry endpoint.
// These match the confirmed running state (Obsidian 14 + Zapier 14).
export const MCP_SERVERS = [
  { name: 'obsidian', tool_count: 14 },
  { name: 'zapier', tool_count: 14 },
] as const

// Zapier apps — static: browser-context MCP client not available.
// Matches list_enabled_zapier_actions response for this account.
export const ZAPIER_APPS = [
  { app: 'Gmail', action_count: 6 },
  { app: 'Google Calendar', action_count: 14 },
] as const

// Pantheon personas — static config.
export const PANTHEON_PERSONAS: readonly { name: string; color: PersonaColor }[] = [
  { name: 'Labyrinth', color: 'violet' },
  { name: 'Mercury', color: 'blue' },
  { name: 'Oracle', color: 'green' },
  { name: 'Philosopher', color: 'amber' },
  { name: 'Hermes_EM', color: 'purple' },
]
