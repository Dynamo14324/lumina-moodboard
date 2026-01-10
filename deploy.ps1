$ErrorActionPreference = "Stop"

Write-Host ">>> Linking to Vercel..." -ForegroundColor Cyan
# Using npx to bypass local execution policy restrictions
npx vercel link --yes

Write-Host ">>> Deploying to Production..." -ForegroundColor Cyan
npx vercel --prod --yes

Write-Host ">>> Deployment Complete." -ForegroundColor Green
