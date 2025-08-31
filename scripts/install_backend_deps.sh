#!/bin/bash
# Script to install backend dependencies

echo "Installing CodeSage Backend Dependencies..."

cd backend

# Install Python dependencies
pip install -r requirements.txt

echo "Backend dependencies installed successfully!"
echo "You can now run the backend with: python ../scripts/start_backend.py"
