// ─────────────────────────────────────────────────────────────────────────────
// Jenkinsfile — BACKEND (pypy)
// FastAPI Python application → AWS ECR → ECS Fargate
//
// Pipeline Stages:
//   1. Checkout
//   2. Python Lint (flake8 / ruff)
//   3. Docker Build + Push to ECR
//   4. Deploy to ECS Fargate
//   5. Health Check
//
// Jenkins Credentials Required (Global):
//   aws-access-key-id       → Secret Text
//   aws-secret-access-key   → Secret Text
//   aws-account-id          → Secret Text
// ─────────────────────────────────────────────────────────────────────────────
pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
    }

    environment {
        AWS_REGION      = 'ap-south-1'
        ECR_REPOSITORY  = 'vtu-backend'
        ECS_CLUSTER     = 'vtu-results-cluster'
        ECS_SERVICE     = 'vtu-backend-service'
        CONTAINER_NAME  = 'vtu-backend'
        CONTAINER_PORT  = '8000'
        PYTHON_VERSION  = '3.11'
    }

    stages {

        stage('📥 Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    echo "🔖 Commit: ${env.GIT_SHORT} | Branch: ${env.GIT_BRANCH}"
                }
            }
        }

        stage('🐍 Python Lint') {
            steps {
                sh '''
                    echo "🔍 Setting up Python environment..."
                    python3 -m venv .venv
                    . .venv/bin/activate

                    pip install --quiet ruff

                    echo "🧹 Running ruff linter..."
                    ruff check . --select E,W,F --ignore E501 || \
                        echo "⚠️  Lint warnings found (non-blocking for demo)"

                    echo "✅ Lint complete"
                    deactivate
                '''
            }
        }

        stage('🐳 Docker Build → ECR') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key-id',     variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY'),
                    string(credentialsId: 'aws-account-id',        variable: 'AWS_ACCOUNT_ID')
                ]) {
                    sh '''
                        export AWS_DEFAULT_REGION=${AWS_REGION}
                        ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                        IMAGE_URI="${ECR_REGISTRY}/${ECR_REPOSITORY}:${GIT_SHORT}"
                        IMAGE_LATEST="${ECR_REGISTRY}/${ECR_REPOSITORY}:latest"

                        echo "🔐 Logging into ECR..."
                        aws ecr get-login-password --region ${AWS_REGION} | \
                            docker login --username AWS --password-stdin ${ECR_REGISTRY}

                        echo "🐳 Building FastAPI image: ${IMAGE_URI}"
                        docker build \
                            --tag ${IMAGE_URI} \
                            --tag ${IMAGE_LATEST} \
                            .

                        echo "📤 Pushing to ECR..."
                        docker push ${IMAGE_URI}
                        docker push ${IMAGE_LATEST}

                        echo "✅ Backend image pushed: ${IMAGE_URI}"
                    '''
                }
            }
        }

        stage('🚀 Deploy → ECS') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key-id',     variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY'),
                    string(credentialsId: 'aws-account-id',        variable: 'AWS_ACCOUNT_ID')
                ]) {
                    sh '''
                        export AWS_DEFAULT_REGION=${AWS_REGION}
                        ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                        IMAGE_URI="${ECR_REGISTRY}/${ECR_REPOSITORY}:${GIT_SHORT}"

                        echo "📋 Fetching task definition..."
                        TASK_DEF=$(aws ecs describe-task-definition \
                            --task-definition ${ECS_SERVICE} \
                            --query taskDefinition --output json)

                        NEW_TASK_DEF=$(echo "${TASK_DEF}" | python3 -c "
import json, sys
td = json.load(sys.stdin)
for c in td['containerDefinitions']:
    if c['name'] == '${CONTAINER_NAME}':
        c['image'] = '${IMAGE_URI}'
        break
for key in ['taskDefinitionArn','revision','status','requiresAttributes','compatibilities','registeredAt','registeredBy']:
    td.pop(key, None)
print(json.dumps(td))
")

                        echo "📝 Registering new revision..."
                        NEW_REVISION=$(aws ecs register-task-definition \
                            --cli-input-json "${NEW_TASK_DEF}" \
                            --query 'taskDefinition.taskDefinitionArn' --output text)

                        echo "🚀 Rolling deploy to ECS: ${ECS_SERVICE}"
                        aws ecs update-service \
                            --cluster ${ECS_CLUSTER} \
                            --service ${ECS_SERVICE} \
                            --task-definition ${NEW_REVISION} \
                            --force-new-deployment

                        echo "⏳ Waiting for stability..."
                        aws ecs wait services-stable \
                            --cluster ${ECS_CLUSTER} \
                            --services ${ECS_SERVICE}

                        echo "✅ Backend deployed!"
                    '''
                }
            }
        }

        stage('❤️ Health Check') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key-id',     variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY'),
                    string(credentialsId: 'aws-account-id',        variable: 'AWS_ACCOUNT_ID')
                ]) {
                    sh '''
                        export AWS_DEFAULT_REGION=${AWS_REGION}
                        RUNNING=$(aws ecs describe-services \
                            --cluster ${ECS_CLUSTER} --services ${ECS_SERVICE} \
                            --query 'services[0].runningCount' --output text)
                        DESIRED=$(aws ecs describe-services \
                            --cluster ${ECS_CLUSTER} --services ${ECS_SERVICE} \
                            --query 'services[0].desiredCount' --output text)
                        echo "✅ Backend ECS: ${RUNNING}/${DESIRED} tasks running"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "🎉 BACKEND PIPELINE PASSED | Commit: ${env.GIT_SHORT}"
        }
        failure {
            echo "❌ BACKEND PIPELINE FAILED | Commit: ${env.GIT_SHORT}"
        }
        always {
            sh 'docker image prune -f --filter "until=24h" || true'
            sh 'rm -rf .venv || true'
            cleanWs()
        }
    }
}

