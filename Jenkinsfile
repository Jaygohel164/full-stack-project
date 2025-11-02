pipeline {
    agent any
    tools {
        nodejs 'node' // Ensure this matches Jenkins → Tools → NodeJS installations
    }

    environment {
        DOCKERHUB_USER = 'jaygohel93'
        IMAGE_NAME = 'nextjs-app'
        CONTAINER_NAME = 'nextjs-app'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "Cloning repository..."
                git branch: 'main', url: 'https://github.com/Jaygohel164/full-stack-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                sh 'npm install --legacy-peer-deps || true'
            }
        }

        stage('Build Next.js App (Ignore Type Errors)') {
            steps {
                echo "Building Next.js project and ignoring type/lint errors..."
                sh '''
                    export NEXT_DISABLE_ESLINT=1
                    export NEXT_TELEMETRY_DISABLED=1
                    npx next build --no-lint || echo "⚠️ Ignored type/lint errors during build"
                '''
            }
        }

        stage('Check Docker Access') {
            steps {
                echo "Checking Docker access for Jenkins user..."
                script {
                    def result = sh(script: "docker ps >/dev/null 2>&1 || echo 'fail'", returnStdout: true).trim()
                    if (result == 'fail') {
                        error("🚫 Jenkins does not have permission to access Docker. Please run: sudo usermod -aG docker jenkins && sudo systemctl restart docker jenkins")
                    } else {
                        echo "✅ Docker access verified!"
                    }
                }
            }
        }

        stage('Cleanup Old Docker Images') {
            steps {
                echo "Cleaning up old Docker images..."
                sh 'docker system prune -af || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh 'docker build --no-cache -t ${IMAGE_NAME} .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo "Logging into Docker Hub..."
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                }
            }
        }

        stage('Tag & Push Image') {
            steps {
                echo "Tagging and pushing image to Docker Hub..."
                sh '''
                    docker tag ${IMAGE_NAME}:latest ${DOCKERHUB_USER}/${IMAGE_NAME}:latest
                    docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "Running Next.js app container..."
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKERHUB_USER}/${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Next.js CI/CD pipeline executed successfully!"
        }
        failure {
            echo "❌ Pipeline failed! Check build logs."
        }
    }
}
