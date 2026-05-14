#!/bin/bash

echo "🔍 Testing build output..."
echo ""

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "✅ Build successful!"
echo ""

# Check output directories
echo "📁 Checking output directories..."

if [ -d ".output/public" ]; then
  echo "✅ .output/public exists"
  echo "   Files:"
  ls -lh .output/public | head -10
else
  echo "❌ .output/public NOT found!"
fi

echo ""

if [ -d ".output/server" ]; then
  echo "✅ .output/server exists"
  echo "   Files:"
  ls -lh .output/server | head -10
else
  echo "❌ .output/server NOT found!"
fi

echo ""

# Check API function
if [ -f "api/index.js" ]; then
  echo "✅ api/index.js exists"
else
  echo "❌ api/index.js NOT found!"
fi

echo ""

# Check config files
echo "📋 Checking config files..."

if [ -f "vercel.json" ]; then
  echo "✅ vercel.json exists"
else
  echo "❌ vercel.json NOT found!"
fi

if [ -f "public/_routes.json" ]; then
  echo "✅ public/_routes.json exists (for Cloudflare)"
else
  echo "⚠️  public/_routes.json NOT found"
fi

echo ""
echo "═══════════════════════════════════════"
echo "📊 Build Summary"
echo "═══════════════════════════════════════"

PUBLIC_SIZE=$(du -sh .output/public 2>/dev/null | cut -f1)
SERVER_SIZE=$(du -sh .output/server 2>/dev/null | cut -f1)

echo "Public folder size: $PUBLIC_SIZE"
echo "Server folder size: $SERVER_SIZE"

echo ""
echo "✅ Build test complete!"
echo ""
echo "🚀 Next steps:"
echo "   1. For Cloudflare Pages: Push to Git and deploy"
echo "   2. For Vercel: Run 'vercel --prod'"
echo ""
