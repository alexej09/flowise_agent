#!/bin/bash

# Installation script for Flowise AI Agent (Local Installation)
# This script installs Flowise and required dependencies locally in your repository.
# It does not install Flowise globally.

echo "==================================================="
echo "Flowise AI Agent - Installation Script (Local)"
echo "==================================================="
echo ""

# Function to install Node.js if not present
install_nodejs() {
    echo "Installing Node.js..."
    
    # Check if we're on a Debian/Ubuntu system
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y nodejs npm
    # Check if we're on a RHEL/CentOS/Fedora system
    elif command -v dnf &> /dev/null; then
        sudo dnf install -y nodejs npm
    elif command -v yum &> /dev/null; then
        sudo yum install -y nodejs npm
    # Otherwise, try to use NVM
    else
        echo "Using NVM to install Node.js..."
        if [ ! -d "$HOME/.nvm" ]; then
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        fi
        nvm install --lts
        nvm use --lts
    fi
    
    # Verify installation
    node --version
    npm --version
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing now..."
    install_nodejs
else
    echo "Node.js found: $(node --version)"
fi

echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Installing Node.js again to get npm..."
    install_nodejs
else
    echo "npm found: $(npm --version)"
fi

echo ""

# Optional: If this script is located in a subdirectory (e.g. scripts/),
# change to the repository root. Uncomment the following line if needed.
# cd "$(dirname "$0")/.."

# Initialize package.json if it does not exist
if [ ! -f package.json ]; then
    echo "Initializing a new npm project..."
    npm init -y
    echo ""
else
    echo "package.json already exists."
    echo ""
fi

# Install Flowise and required dependencies locally
echo "Installing Flowise and required dependencies locally..."
npm install flowise langchainhub @opentelemetry/exporter-trace-otlp-grpc @opentelemetry/sdk-node @opentelemetry/sdk-trace-node @opentelemetry/semantic-conventions
if [ $? -ne 0 ]; then
    echo "Error: Installation of dependencies failed."
    exit 1
fi

echo ""
echo "Installation completed!"
echo ""
echo "To start the AI Agent, run: npx flowise start"
echo ""
