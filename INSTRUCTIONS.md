# God Mode Activation Instructions

Your autonomous agent **Architect-Zero** has successfully constructed the **Lumina** system. 

## 1. Environment Requirements
To execute the final deployment phases, your local environment requires the following authentication tools:

- **GitHub CLI (`gh`)**: Required for autonomous repository creation.
  - *Install*: `winget install GitHub.cli`
  - *Auth*: `gh auth login`
- **Vercel CLI**: Required for production deployment.
  - *Auth*: `npx vercel login`

## 2. Execution

### Phase 1: GitHub Synchronization
Run the following command in PowerShell to create the remote repository and push the code:
```powershell
.\setup_and_push.ps1
```

### Phase 2: Production Deployment
Run the deployment agent to ship to Vercel:
```powershell
.\deploy.ps1
```

## 3. System Architecture
- **Cognitive Layer**: `src/app/components/MoodSelector.tsx` handles emotional-to-query mapping.
- **Data Layer**: `src/lib/api.ts` transparently switches between TMDB API and Synthetic Data based on environment variables.
- **Presentation**: `src/app/page.tsx` features a "God Mode" responsive layout with glassmorphism.

*System ready for launch.*
