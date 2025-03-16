#!/bin/bash

# Start script for Flowise AI Agent

echo "==================================================="
echo "Flowise AI Agent - Start Script"
echo "==================================================="
echo ""

# Check if npx is available
if ! command -v npx &> /dev/null; then
    echo "npx is not available!"
    echo "Please run install.sh first."
    exit 1
fi

echo "Starting Flowise AI Agent..."
echo ""
echo "The server is starting. Please wait a moment..."
echo "Once the server is ready, open http://localhost:3000 in your browser."
echo ""
echo "Press Ctrl+C to stop the server."
echo ""

npx flowise start
