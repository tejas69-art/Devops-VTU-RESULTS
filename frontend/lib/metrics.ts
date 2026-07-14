/**
 * Prometheus Metrics Registry
 *
 * Singleton registry for all application-level metrics.
 * Exposes counters and histograms that are scraped by Prometheus
 * via the /api/metrics endpoint.
 *
 * Usage:
 *   import { httpRequestCounter, httpRequestDuration } from '@/lib/metrics'
 *   httpRequestCounter.inc({ method: 'GET', route: '/vtu-results', status: '200' })
 */

import { Registry, Counter, Histogram, Gauge, collectDefaultMetrics } from 'prom-client'

// Use a global singleton to avoid re-registering metrics on hot-reload (Next.js dev)
const globalForMetrics = globalThis as unknown as {
  prometheusRegistry: Registry | undefined
}

function createRegistry(): Registry {
  const register = new Registry()

  // ─── Default Node.js metrics (memory, CPU, event loop, GC) ───────────────
  collectDefaultMetrics({
    register,
    prefix: 'nodejs_',
    labels: {
      app: 'vtu-results',
      env: process.env.NEXT_PUBLIC_APP_ENV ?? 'development',
    },
  })

  // ─── HTTP Request Counter ─────────────────────────────────────────────────
  new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register],
  })

  // ─── HTTP Request Duration Histogram ─────────────────────────────────────
  new Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    registers: [register],
  })

  // ─── VTU Results Lookup Counter ───────────────────────────────────────────
  new Counter({
    name: 'vtu_result_lookups_total',
    help: 'Total number of VTU result lookups performed',
    labelNames: ['semester', 'status'],
    registers: [register],
  })

  // ─── External API Calls Counter ───────────────────────────────────────────
  new Counter({
    name: 'external_api_calls_total',
    help: 'Total external API calls (VTU upstream)',
    labelNames: ['endpoint', 'status'],
    registers: [register],
  })

  // ─── External API Call Duration ───────────────────────────────────────────
  new Histogram({
    name: 'external_api_call_duration_seconds',
    help: 'Duration of calls to external VTU API in seconds',
    labelNames: ['endpoint'],
    buckets: [0.1, 0.5, 1, 2, 5, 10, 30],
    registers: [register],
  })

  // ─── Active Connections Gauge ─────────────────────────────────────────────
  new Gauge({
    name: 'active_connections',
    help: 'Number of currently active connections',
    registers: [register],
  })

  // ─── App Build Info ───────────────────────────────────────────────────────
  new Gauge({
    name: 'app_info',
    help: 'Application build information',
    labelNames: ['version', 'commit_sha', 'node_version'],
    registers: [register],
  })

  // Set app info once
  const appInfoGauge = register.getSingleMetric('app_info') as Gauge
  appInfoGauge?.labels({
    version: process.env.npm_package_version ?? '1.0.0',
    commit_sha: process.env.BUILD_SHA ?? 'unknown',
    node_version: process.version,
  }).set(1)

  return register
}

// Singleton: reuse across hot-reloads in development
if (!globalForMetrics.prometheusRegistry) {
  globalForMetrics.prometheusRegistry = createRegistry()
}

export const metricsRegistry = globalForMetrics.prometheusRegistry!

// ─── Typed metric accessors ───────────────────────────────────────────────────

export function getCounter(name: string): Counter {
  return metricsRegistry.getSingleMetric(name) as Counter
}

export function getHistogram(name: string): Histogram {
  return metricsRegistry.getSingleMetric(name) as Histogram
}

export function getGauge(name: string): Gauge {
  return metricsRegistry.getSingleMetric(name) as Gauge
}

// ─── Convenience: record an HTTP request ─────────────────────────────────────

export function recordHttpRequest(
  method: string,
  route: string,
  statusCode: number,
  durationSeconds: number
): void {
  const counter = getCounter('http_requests_total')
  const histogram = getHistogram('http_request_duration_seconds')

  const labels = {
    method: method.toUpperCase(),
    route,
    status_code: String(statusCode),
  }

  counter?.inc(labels)
  histogram?.observe(labels, durationSeconds)
}

// ─── Convenience: record a VTU result lookup ─────────────────────────────────

export function recordVtuLookup(semester: string, success: boolean): void {
  const counter = getCounter('vtu_result_lookups_total')
  counter?.inc({
    semester,
    status: success ? 'success' : 'error',
  })
}

// ─── Convenience: record an external API call ────────────────────────────────

export function recordExternalApiCall(
  endpoint: string,
  durationSeconds: number,
  status: 'success' | 'error' | 'timeout'
): void {
  const counter = getCounter('external_api_calls_total')
  const histogram = getHistogram('external_api_call_duration_seconds')

  counter?.inc({ endpoint, status })
  histogram?.observe({ endpoint }, durationSeconds)
}
