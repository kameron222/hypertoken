#!/bin/bash

# HyperToken Deployment Script
echo "🚀 Starting HyperToken deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the frontend directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "🌐 Your app should be live at: https://your-app-name.vercel.app"
echo ""
echo "📋 Next steps:"
echo "1. Set environment variables in Vercel dashboard:"
echo "   - NEXT_PUBLIC_PROGRAM_ID=GhcYkFTMaRGPDbij2ok3fM33T4QhCYUWKNocWfVwZx4S"
echo "   - NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com"
echo "2. Test your app functionality"
echo "3. Share your app URL!"
