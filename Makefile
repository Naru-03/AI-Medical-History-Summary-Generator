# AI Medical History Summary Generator - Makefile
.PHONY: help setup start stop clean install-backend install-frontend start-backend start-frontend

# Default target
help:
	@echo "========================================"
	@echo "   AI Medical History Summary Generator - Available Commands"
	@echo "========================================"
	@echo ""
	@echo "  make setup          - Install all dependencies"
	@echo "  make start          - Start both servers"
	@echo "  make stop           - Stop all servers"
	@echo "  make clean          - Clean up dependencies"
	@echo "  make install-backend - Install Python dependencies"
	@echo "  make install-frontend - Install Node.js dependencies"
	@echo "  make start-backend  - Start backend server only"
	@echo "  make start-frontend - Start frontend server only"
	@echo ""

# Install all dependencies
setup: install-backend install-frontend
	@echo "Setup complete! Run 'make start' to begin."

# Install Python dependencies
install-backend:
	@echo "Installing Python dependencies..."
	cd backend && pip install -r requirements.txt

# Install Node.js dependencies
install-frontend:
	@echo "Installing Node.js dependencies..."
	cd frontend && npm install

# Start both servers
start:
	@echo "Starting AI Medical History Summary Generator..."
	@echo "Backend:  http://localhost:5000"
	@echo "Frontend: http://localhost:3000"
	@echo ""
	cd frontend && npm run start:full

# Start backend only
start-backend:
	@echo "Starting backend server..."
	cd backend && python app.py

# Start frontend only
start-frontend:
	@echo "Starting frontend server..."
	cd frontend && npm start

# Stop all servers (Ctrl+C)
stop:
	@echo "Stopping servers..."
	@pkill -f "python app.py" || true
	@pkill -f "npm start" || true
	@pkill -f "react-scripts" || true

# Clean up dependencies
clean:
	@echo "Cleaning up dependencies..."
	cd frontend && rm -rf node_modules package-lock.json
	cd backend && pip freeze > requirements_backup.txt && pip uninstall -r requirements.txt -y

# Development mode with auto-reload
dev: start

# Production build
build:
	@echo "Building for production..."
	cd frontend && npm run build

# Serve production build
serve: build
	@echo "Serving production build..."
	cd frontend && npm run serve:prod
