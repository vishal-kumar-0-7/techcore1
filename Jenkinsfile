pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = credentials('DOCKERHUB_USERNAME')
        CLIENT_IMAGE       = "${DOCKERHUB_USERNAME}/techcore-client"
        SERVER_IMAGE       = "${DOCKERHUB_USERNAME}/techcore-server"
        IMAGE_TAG          = "${env.BUILD_NUMBER}"
        EC2_HOST           = credentials('EC2_HOST')
        EC2_USER           = 'ubuntu'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Lint & Basic Checks') {
            parallel {
                stage('Client') {
                    steps {
                        dir('client') {
                            sh 'npm ci --legacy-peer-deps'
                            sh 'npm run lint'
                            sh 'npm run build'
                        }
                    }
                }
                stage('Server') {
                    steps {
                        dir('server') {
                            sh 'npm ci'
                            sh 'node --check server.js'
                        }
                    }
                }
            }
        }

        stage('Build & Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'DOCKERHUB_CREDENTIALS',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_PASS'
                )]) {
                    sh '''
                        echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin

                        docker build \
                          --build-arg VITE_API_URL=/api \
                          -t ${CLIENT_IMAGE}:${IMAGE_TAG} \
                          -t ${CLIENT_IMAGE}:latest \
                          ./client

                        docker build \
                          -t ${SERVER_IMAGE}:${IMAGE_TAG} \
                          -t ${SERVER_IMAGE}:latest \
                          ./server

                        docker push ${CLIENT_IMAGE}:${IMAGE_TAG}
                        docker push ${CLIENT_IMAGE}:latest
                        docker push ${SERVER_IMAGE}:${IMAGE_TAG}
                        docker push ${SERVER_IMAGE}:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'DOCKERHUB_CREDENTIALS',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_PASS'
                )]) {
                    sshagent(credentials: ['EC2_SSH_KEY']) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                                set -e
                                cd ~/techcore

                                git pull origin main

                                echo '${DH_PASS}' | docker login -u '${DH_USER}' --password-stdin

                                docker pull ${CLIENT_IMAGE}:latest
                                docker pull ${SERVER_IMAGE}:latest

                                DOCKERHUB_USERNAME='${DOCKERHUB_USERNAME}' docker compose up -d --remove-orphans

                                docker image prune -f
                                docker logout

                                echo 'Deployed build #${IMAGE_TAG} at ' \$(date)
                            "
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            sh '''
                docker rmi ${CLIENT_IMAGE}:${IMAGE_TAG} || true
                docker rmi ${SERVER_IMAGE}:${IMAGE_TAG} || true
            '''
        }
        success {
            echo "Build #${IMAGE_TAG} deployed successfully."
        }
        failure {
            echo "Build #${IMAGE_TAG} failed."
        }
    }
}
