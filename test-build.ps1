# PowerShell script to test build output

Write-Host "🔍 Testing build output..." -ForegroundColor Cyan
Write-Host ""

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Check output directories
Write-Host "📁 Checking output directories..." -ForegroundColor Yellow

if (Test-Path ".output/public") {
    Write-Host "✅ .output/public exists" -ForegroundColor Green
    Write-Host "   Files:"
    Get-ChildItem ".output/public" | Select-Object -First 10 | Format-Table Name, Length
} else {
    Write-Host "❌ .output/public NOT found!" -ForegroundColor Red
}

Write-Host ""

if (Test-Path ".output/server") {
    Write-Host "✅ .output/server exists" -ForegroundColor Green
    Write-Host "   Files:"
    Get-ChildItem ".output/server" | Select-Object -First 10 | Format-Table Name, Length
} else {
    Write-Host "❌ .output/server NOT found!" -ForegroundColor Red
}

Write-Host ""

# Check API function
if (Test-Path "api/index.js") {
    Write-Host "✅ api/index.js exists" -ForegroundColor Green
} else {
    Write-Host "❌ api/index.js NOT found!" -ForegroundColor Red
}

Write-Host ""

# Check config files
Write-Host "📋 Checking config files..." -ForegroundColor Yellow

if (Test-Path "vercel.json") {
    Write-Host "✅ vercel.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ vercel.json NOT found!" -ForegroundColor Red
}

if (Test-Path "public/_routes.json") {
    Write-Host "✅ public/_routes.json exists (for Cloudflare)" -ForegroundColor Green
} else {
    Write-Host "⚠️  public/_routes.json NOT found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 Build Summary" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan

if (Test-Path ".output/public") {
    $publicSize = (Get-ChildItem ".output/public" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "Public folder size: $([math]::Round($publicSize, 2)) MB"
}

if (Test-Path ".output/server") {
    $serverSize = (Get-ChildItem ".output/server" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "Server folder size: $([math]::Round($serverSize, 2)) MB"
}

Write-Host ""
Write-Host "✅ Build test complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "   1. For Cloudflare Pages: Push to Git and deploy"
Write-Host "   2. For Vercel: Run 'vercel --prod'"
Write-Host ""
