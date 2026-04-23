#!/bin/bash

# Lost & Found Platform - Automated Setup Script
# Installs all dependencies for backend and frontend

echo "🚀 Starting Lost & Found Platform Setup..."

# Backend Setup
echo ""
echo "📦 Setting up Backend..."
cd backend
echo "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend setup complete!"
else
    echo "❌ Backend setup failed"
    exit 1
fi

# Frontend Setup
echo ""
echo "📦 Setting up Frontend..."
cd ../frontend
echo "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend setup complete!"
else
    echo "❌ Frontend setup failed"
    exit 1
fi

echo ""
echo "✅ All setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Backend: cd backend && npm run dev"
echo "2. Frontend: cd frontend && npm start"
echo ""
echo "📚 Documentation:"
echo "- Backend: backend/SETUP.md"
echo "- Frontend: frontend/SETUP.md"
