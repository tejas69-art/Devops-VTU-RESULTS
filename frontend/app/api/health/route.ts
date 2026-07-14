/**
 * GET /api/health
 *
 * Kubernetes liveness and readiness probe endpoint.
 * Returns 200 when the app is healthy and ready to serve traffic.
 * Used by the Dockerfile HEALTHCHECK and K8s probes.
 */

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(): Promise<NextResponse> {
  const startTime = Date.now()

  try {
    // Basic health checks
    const checks = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version ?? '1.0.0',
      commit: process.env.BUILD_SHA ?? 'unknown',
      environment: process.env.NEXT_PUBLIC_APP_ENV ?? 'development',
      node: process.version,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB',
      },
      responseTimeMs: Date.now() - startTime,
    }

    return NextResponse.json(checks, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}
