pipeline {
    agent any
    tools {
        nodejs 'node'  // Make sure this matches Jenkins → Tools → NodeJS installations
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

        stage('Check Files') {
            steps {
                script {
                    if (!fileExists('tsconfig.json')) {
                        error("❌ tsconfig.json is missing!")
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                sh 'npm install'
            }
        }

        stage('Build Next.js App') {
            steps {
                echo "Building Next.js project..."
                sh 'npm run build'
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
