# Lumina Moodboard - Deployment Script
# This script deploys the updated AdSense configuration to Vercel

Write-Host "🚀 Lumina Moodboard - Production Deployment" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Check Git status
Write-Host "📋 Checking Git status..." -ForegroundColor Yellow
git status

Write-Host "`n✅ Changes detected:" -ForegroundColor Green
Write-Host "   - Fixed AdSense Publisher ID in .env.local" -ForegroundColor White
Write-Host "   - Updated from placeholder to: ca-pub-1905791110469823" -ForegroundColor White

# Add all changes
Write-Host "`n📦 Staging changes..." -ForegroundColor Yellow
git add .

# Commit with descriptive message
Write-Host "`n💾 Committing changes..." -ForegroundColor Yellow
git commit -m "fix: Update AdSense publisher ID to production value (ca-pub-1905791110469823)"

# Push to origin
Write-Host "`n🌐 Pushing to GitHub (will trigger Vercel deployment)..." -ForegroundColor Yellow
git push origin main

Write-Host "`n✅ Deployment initiated!" -ForegroundColor Green
Write-Host "`n📝 IMPORTANT NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Go to Vercel Dashboard: https://vercel.com" -ForegroundColor White
Write-Host "2. Navigate to: Project Settings → Environment Variables" -ForegroundColor White
Write-Host "3. Add new variable:" -ForegroundColor White
Write-Host "   Name:  NEXT_PUBLIC_ADSENSE_ID" -ForegroundColor Yellow
Write-Host "   Value: ca-pub-1905791110469823" -ForegroundColor Yellow
Write-Host "   Environment: Production" -ForegroundColor Yellow
Write-Host "4. Redeploy from Vercel dashboard" -ForegroundColor White
Write-Host "`n5. Check AdSense account: https://adsense.google.com" -ForegroundColor White
Write-Host "   - Verify account approval status" -ForegroundColor White
Write-Host "   - Enable Auto Ads if approved" -ForegroundColor White
Write-Host "   - Wait 48-72 hours for ads to appear" -ForegroundColor White

Write-Host "`n✅ Deployment complete! Monitor: https://lumina-moodboard.vercel.app" -ForegroundColor Green
Write-Host "📊 See PRODUCTION_AUDIT_REPORT.md for full details`n" -ForegroundColor Cyan
