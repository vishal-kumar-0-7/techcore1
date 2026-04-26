#!/bin/bash
# Run this once on a fresh EC2 Ubuntu 22.04 instance
# Usage: bash setup-ec2.sh

set -e

echo "=== Installing Docker ==="
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
sudo systemctl enable docker
sudo systemctl start docker

echo "=== Installing Docker Compose plugin ==="
sudo apt-get install -y docker-compose-plugin

echo "=== Creating project directory ==="
mkdir -p ~/techcore
mkdir -p ~/jenkins

echo "=== Starting Jenkins ==="
cp ~/techcore/jenkins/docker-compose.jenkins.yml ~/jenkins/docker-compose.yml
cd ~/jenkins
docker compose up -d

echo ""
echo "=== Done! ==="
echo "Jenkins is starting at http://$(curl -s ifconfig.me):8080"
echo ""
echo "Get the initial admin password with:"
echo "  docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword"
echo ""
echo "Next steps:"
echo "  1. Open Jenkins in browser"
echo "  2. Install suggested plugins"
echo "  3. Add credentials (EC2_HOST, EC2_SSH_KEY)"
echo "  4. Create a Pipeline job pointing to your GitHub repo"
