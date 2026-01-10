param([string]$ProjectName = "lumina-moodboard")

$ErrorActionPreference = "Stop"

Write-Host ">>> Initializing God Mode Project: $ProjectName" -ForegroundColor Cyan

# 1. Initialize Git
if (-not (Test-Path ".git")) {
    git init -b main
}

# 2. Stage and Commit
git add .
git commit -m "feat: initial scaffolding of $ProjectName v1.0"

# 3. Create Remote and Push
Write-Host ">>> Creating GitHub Repo..." -ForegroundColor Yellow
try {
    gh repo create "$ProjectName" --public --source=. --remote=origin --push
} catch {
    Write-Host "Error creating repo. Ensure 'gh' is installed and authenticated." -ForegroundColor Red
}

Write-Host ">>> Repository setup complete." -ForegroundColor Green
