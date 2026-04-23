#!/bin/bash

# Quick Git Push Script for Deployment

echo "📤 Pushing code to GitHub..."
echo ""

git add .
git commit -m "Lost & Found Platform - Ready for Render Deployment"
git branch -M main
git remote add origin https://github.com/AditiSingh-05/AIFSDMSETWO.git 2>/dev/null || true
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Code pushed to GitHub successfully!"
    echo ""
    echo "🚀 Next: Go to https://dashboard.render.com"
    echo "   1. Deploy backend (Node service)"
    echo "   2. Deploy frontend (Static site)"
    echo ""
else
    echo "❌ Push failed. Check GitHub connection."
fi
