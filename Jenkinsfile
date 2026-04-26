pipeline {
    agent any

    environment {
        // Docker image names
        CLIENT_IMAGE = "techcore-client"
        SERVER_IMAGE = "techcore-server"
        IMAGE_TAG    = "${env.BUILD_NUMBER}"

        // Loaded from Jenkins credentials
        EC2_HOST     = credentials('EC2_HOST')
        EC2_USER     = 'ubuntu'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out code from branch: ${env.BRANCH_NAME}"
                checkout scm
            }
        }

        stage('Lint & Validate') {
            parallel {
        stage('Client Lint') {
                    steps {
                        dir('client') {
                            sh 'npm install'
                            sh 'npm run lint || true'
                        }
                    }
                }
                stage('Server Validate') {
                    steps {
                        dir('server') {
                            sh 'npm install'
                            sh 'node --check server.js'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Client') {
                    steps {
                        sh """
                            docker build \
                                --build-arg VITE_API_URL=/api \
                                -t ${CLIENT_IMAGE}:${IMAGE_TAG} \
                                -t ${CLIENT_IMAGE}:latest \
                                ./client
                        """
                    }
                }
                stage('Build Server') {
                    steps {
                        sh """
                            docker build \
                                -t ${SERVER_IMAGE}:${IMAGE_TAG} \
                                -t ${SERVER_IMAGE}:latest \
                                ./server
                        """
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['EC2_SSH_KEY']) {
                    sh """
                        # Copy docker-compose and .env to EC2
                        scp -o StrictHostKeyChecking=no \
                            docker-compose.yml \
                            ${EC2_USER}@${EC2_HOST}:~/techcore/docker-compose.yml

                        # Save Docker images as tarballs and transfer
                        docker save ${CLIENT_IMAGE}:latest | gzip | \
                            ssh -o StrictHostKeyChecking=no \
                            ${EC2_USER}@${EC2_HOST} \
                            'gunzip | docker load'

                        docker save ${SERVER_IMAGE}:latest | gzip | \
                            ssh -o StrictHostKeyChecking=no \
                            ${EC2_USER}@${EC2_HOST} \
                            'gunzip | docker load'

                        # Restart containers on EC2
                        ssh -o StrictHostKeyChecking=no \
                            ${EC2_USER}@${EC2_HOST} '
                                cd ~/techcore
                                docker compose down
                                docker compose up -d
                                docker image prune -f
                                echo "Deployed at \$(date)"
                            '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Build #${IMAGE_TAG} deployed successfully."
        }
        failure {
            echo "Build #${IMAGE_TAG} failed. Check the logs above."
        }
        always {
            // Clean up local Docker images to save disk space on Jenkins
            sh "docker rmi ${CLIENT_IMAGE}:${IMAGE_TAG} || true"
            sh "docker rmi ${SERVER_IMAGE}:${IMAGE_TAG} || true"
        }
    }
}
