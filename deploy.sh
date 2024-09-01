#!/bin/bash

# Define the project directories
PROJECT_DIR_CLIENT="app/client"
PROJECT_DIR_SERVER="app/server"

# ---------------- FRONTEND ----------------

# Navigate to the project directory
cd ~
cd $PROJECT_DIR_CLIENT

# Install dependencies
npm install

# Build the project
npm run build

# ---------------- BACKEND ----------------

cd ~
cd $PROJECT_DIR_SERVER

# Install dependencies
npm install

# Restart the server
pm2 restart ecosystem.config.cjs
