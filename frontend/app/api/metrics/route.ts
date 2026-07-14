/**
 * GET /api/metrics
 *
 * Prometheus-compatible metrics endpoint.
 * Scraped by Prometheus every 15s via the ServiceMonitor CRD.
 *
 * Security: In production, protect this endpoint with network policy
 * (only Prometheus pods in 'monitoring' namespace can reach it).
 */

import { NextResponse } from 'next/server'
import { metricsRegistry } from '@/lib/metrics'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(): Promise<NextResponse> {
  try {
    const metrics = await metricsRegistry.metrics()

    return new NextResponse(metrics, {
      status: 200,
      headers: {
        'Content-Type': metricsRegistry.contentType,
        // Prevent caching — metrics should always be fresh
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('[metrics] Failed to collect metrics:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
