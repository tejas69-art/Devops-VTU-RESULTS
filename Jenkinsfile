// =============================================================================
// Jenkinsfile — ROOT MONOREPO ORCHESTRATOR
// Location: devops-vtu/Jenkinsfile
//
// This is the SINGLE entry point for Jenkins.
// Configure ONE Jenkins Multibranch Pipeline pointing at the root of devops-vtu/.
//
// What it does:
//   1. Detects which directory changed (backend/ or frontend/)
//   2. If backend changed  → runs backend pipeline first (waits for completion)
//   3. If frontend changed → runs frontend pipeline (after backend, if backend ran)
//   4. Passes BACKEND_API_URL from credential → frontend build arg
//   5. Sends Gmail alerts on success / failure
//
// Jenkins Credentials Required (Manage Jenkins → Credentials → Global):
//   aws-access-key-id       → Secret Text
//   aws-secret-access-key   → Secret Text
//   aws-account-id          → Secret Text
//   backend-api-url         → Secret Text  (e.g. https://api.vtu-results.com)
//   gmail-app-password      → Username+Password (Gmail + App Password)
//
// Jenkins Plugins Required:
//   - Pipeline
//   - Pipeline: Build Step (for `build job:`)
//   - Email Extension Plugin  (for Gmail SMTP alerts)
//   - AnsiColor
// =============================================================================

pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
        disableConcurrentBuilds()          // Never run two monorepo builds at once
    }

    // ── Who to notify ──────────────────────────────────────────────────────────
    environment {
        NOTIFY_TO    = 'your-email@gmail.com'   // ← change to your email
        PIPELINE_URL = "${env.BUILD_URL}"
    }

    stages {

        // ─── Stage 1: Checkout + Detect Changes ────────────────────────────────
        stage('📥 Checkout & Detect Changes') {
            steps {
                checkout scm
                script {
                    env.GIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    // Detect which directories changed compared to previous commit
                    def changedFiles = sh(
                        script: 'git diff --name-only HEAD~1 HEAD 2>/dev/null || git diff --name-only $(git rev-list --max-parents=0 HEAD) HEAD',
                        returnStdout: true
                    ).trim()

                    echo "📝 Changed files:\n${changedFiles}"

                    env.BACKEND_CHANGED  = changedFiles.contains('backend/')  ? 'true' : 'false'
                    env.FRONTEND_CHANGED = changedFiles.contains('frontend/') ? 'true' : 'false'

                    echo "🔍 Backend changed : ${env.BACKEND_CHANGED}"
                    echo "🔍 Frontend changed: ${env.FRONTEND_CHANGED}"

                    if (env.BACKEND_CHANGED == 'false' && env.FRONTEND_CHANGED == 'false') {
                        echo "⚠️  No backend or frontend changes detected. Marking build as skipped."
                        currentBuild.result = 'NOT_BUILT'
                    }
                }
            }
        }

        // ─── Stage 2: Backend CI/CD (runs first, always before frontend) ────────
        stage('🐍 Backend Pipeline') {
            when {
                expression { env.BACKEND_CHANGED == 'true' }
            }
            steps {
                script {
                    echo "🚀 Triggering Backend pipeline..."
                    // 'backend-pipeline' = Jenkins job name for backend/Jenkinsfile
                    // Configure this as a separate Multibranch or Pipeline job in Jenkins
                    def backendBuild = build(
                        job: 'backend-pipeline',
                        parameters: [],
                        wait: true,              // BLOCK until backend is done
                        propagate: true          // Fail this pipeline if backend fails
                    )
                    echo "✅ Backend pipeline completed: ${backendBuild.result}"
                    env.BACKEND_BUILD_NUM = "${backendBuild.number}"
                }
            }
        }

        // ─── Stage 3: Frontend CI/CD (runs after backend) ───────────────────────
        stage('⚡ Frontend Pipeline') {
            when {
                expression { env.FRONTEND_CHANGED == 'true' }
            }
            steps {
                withCredentials([
                    string(credentialsId: 'backend-api-url', variable: 'BACKEND_API_URL')
                ]) {
                    script {
                        echo "🚀 Triggering Frontend pipeline with BACKEND_API_URL..."
                        def frontendBuild = build(
                            job: 'frontend-pipeline',
                            parameters: [
                                string(name: 'BACKEND_API_URL', value: "${BACKEND_API_URL}")
                            ],
                            wait: true,
                            propagate: true
                        )
                        echo "✅ Frontend pipeline completed: ${frontendBuild.result}"
                        env.FRONTEND_BUILD_NUM = "${frontendBuild.number}"
                    }
                }
            }
        }

        // ─── Stage 4: Deployment Summary ────────────────────────────────────────
        stage('📋 Deployment Summary') {
            when {
                not { expression { currentBuild.result == 'NOT_BUILT' } }
            }
            steps {
                script {
                    def summary = """
╔══════════════════════════════════════════════╗
║       MONOREPO DEPLOYMENT COMPLETE           ║
╠══════════════════════════════════════════════╣
║  Commit  : ${env.GIT_SHORT}
║  Branch  : ${env.GIT_BRANCH}
║  Backend : ${env.BACKEND_CHANGED == 'true' ? '✅ Deployed (build #' + env.BACKEND_BUILD_NUM + ')' : '⏭️  Skipped (no changes)'}
║  Frontend: ${env.FRONTEND_CHANGED == 'true' ? '✅ Deployed (build #' + env.FRONTEND_BUILD_NUM + ')' : '⏭️  Skipped (no changes)'}
╚══════════════════════════════════════════════╝
                    """
                    echo summary
                }
            }
        }
    }

    // ── Post: Gmail Alerts ──────────────────────────────────────────────────────
    post {
        success {
            emailext(
                to:       "${env.NOTIFY_TO}",
                subject:  "✅ [VTU Results] Monorepo Deploy SUCCESS — ${env.GIT_BRANCH} #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                body:     """
<html><body style="font-family:Arial,sans-serif;background:#f4f6f9;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
  <div style="background:#27ae60;padding:20px;text-align:center;">
    <h1 style="color:#fff;margin:0;">✅ Deploy Succeeded</h1>
  </div>
  <div style="padding:24px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px;color:#666;font-weight:bold;">Project</td><td style="padding:8px;">VTU Results (Monorepo)</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;font-weight:bold;">Branch</td><td style="padding:8px;">${env.GIT_BRANCH}</td></tr>
      <tr><td style="padding:8px;color:#666;font-weight:bold;">Commit</td><td style="padding:8px;">${env.GIT_SHORT}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;font-weight:bold;">Build #</td><td style="padding:8px;">${env.BUILD_NUMBER}</td></tr>
      <tr><td style="padding:8px;color:#666;font-weight:bold;">Backend</td><td style="padding:8px;">${env.BACKEND_CHANGED == 'true' ? '✅ Deployed' : '⏭️ Skipped'}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;font-weight:bold;">Frontend</td><td style="padding:8px;">${env.FRONTEND_CHANGED == 'true' ? '✅ Deployed' : '⏭️ Skipped'}</td></tr>
      <tr><td style="padding:8px;color:#666;font-weight:bold;">Duration</td><td style="padding:8px;">${currentBuild.durationString}</td></tr>
    </table>
    <div style="text-align:center;margin-top:20px;">
      <a href="${env.BUILD_URL}" style="background:#27ae60;color:#fff;padding:10px 24px;border-radius:4px;text-decoration:none;font-weight:bold;">View Build Logs</a>
    </div>
  </div>
</div>
</body></html>
                """
            )
        }

        failure {
            emailext(
                to:       "${env.NOTIFY_TO}",
                subject:  "❌ [VTU Results] Monorepo Deploy FAILED — ${env.GIT_BRANCH} #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                body:     """
<html><body style="font-family:Arial,sans-serif;background:#f4f6f9;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
  <div style="background:#e74c3c;padding:20px;text-align:center;">
    <h1 style="color:#fff;margin:0;">❌ Deploy Failed</h1>
  </div>
  <div style="padding:24px;">
    <p style="color:#c0392b;font-weight:bold;">⚠️ Action Required: The deployment pipeline failed. Please review the logs immediately.</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px;color:#666;font-weight:bold;">Project</td><td style="padding:8px;">VTU Results (Monorepo)</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;font-weight:bold;">Branch</td><td style="padding:8px;">${env.GIT_BRANCH}</td></tr>
      <tr><td style="padding:8px;color:#666;font-weight:bold;">Commit</td><td style="padding:8px;">${env.GIT_SHORT}</td></tr>
      <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;font-weight:bold;">Build #</td><td style="padding:8px;">${env.BUILD_NUMBER}</td></tr>
      <tr><td style="padding:8px;color:#666;font-weight:bold;">Duration</td><td style="padding:8px;">${currentBuild.durationString}</td></tr>
    </table>
    <div style="text-align:center;margin-top:20px;">
      <a href="${env.BUILD_URL}console" style="background:#e74c3c;color:#fff;padding:10px 24px;border-radius:4px;text-decoration:none;font-weight:bold;">🔍 View Console Output</a>
    </div>
  </div>
</div>
</body></html>
                """
            )
        }

        fixed {
            emailext(
                to:       "${env.NOTIFY_TO}",
                subject:  "💚 [VTU Results] Pipeline FIXED — ${env.GIT_BRANCH} #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                body:     "<p>The pipeline is back to <strong>green</strong> after a failure.<br>Build: <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>"
            )
        }

        always {
            sh 'docker image prune -f --filter "until=24h" || true'
            cleanWs()
        }
    }
}
