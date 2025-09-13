#!/bin/bash

echo "========================================"
echo "   MedAI Assistant - Project Setup"
echo "========================================"
echo

echo "Installing Python dependencies..."
cd backend
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Error installing Python dependencies!"
    exit 1
fi

echo
echo "Installing Node.js dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing Node.js dependencies!"
    exit 1
fi

echo
echo "========================================"
echo "    Setup Complete!"
echo "========================================"
echo
echo "Run './start-project.sh' to start both servers"
echo
