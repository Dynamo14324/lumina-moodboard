$ErrorActionPreference = "Stop"

Write-Host ">>> Linking to Vercel..." -ForegroundColor Cyan
vercel link --yes

Write-Host ">>> Deploying to Production..." -ForegroundColor Cyan
vercel --prod --yes

Write-Host ">>> Deployment Complete." -ForegroundColor Green
