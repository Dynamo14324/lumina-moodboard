# ✦ Lumina
> **Stop searching. Start feeling.**

![Lumina Banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=300&section=header&text=Lumina&fontSize=90&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Cinematic%20Discovery&descAlignY=51&descAlign=62)

[![Build Status](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)](https://github.com/Dynamo14324/lumina-moodboard/actions)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

**Lumina** is an autonomous cinematic discovery engine that replaces keyword searching with emotional intuition. By mapping complex sentiment descriptors ("Ethereal", "Melancholy", "Adrenaline") to weighted TMDB query parameters, it surfaces films that match your *internal state* rather than your watch history.

## 🚀 Live Demo
[Deploy to Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDynamo14324%2Flumina-moodboard)

---

## 🏗 Architecture

```mermaid
sequenceDiagram
    participant User
    participant UI as Next.js Client
    participant API as /lib/api.ts
    participant TMDB as The Movie DB

    User->>UI: Selects "Ethereal" Mood
    UI->>UI: Show Loading State
    UI->>API: fetchMoviesByMood(params)
    API->>API: Check Cache / API Key
    alt API Key Present
        API->>TMDB: GET /discover/movie?with_genres=878,14...
        TMDB-->>API: JSON Response (Real Data)
    else API Key Missing
        API-->>API: Load Synthetic Data (God Mode Fallback)
    end
    API-->>UI: Typed Movie[]
    UI-->>User: Render Staggered Grid
```

## ⚡ Features

- **Mood-Based Discovery**: Emotional filtering over genre filtering.
- **Glassmorphism UI**: High-end aesthetic using Tailwind CSS.
- **Micro-Interactions**: Fluid animations powered by Framer Motion.
- **Resilient Data Layer**: Works with or without an API Key (God Mode Fallback).

## 🛠 Tech Stack

| Tech | Purpose |
|Data| The Movie Database (TMDB) |
|Framework| Next.js 14 (App Router) |
|Styling| Tailwind CSS + clsx |
|Animation| Framer Motion |
|Type Safety| TypeScript Strict Mode |

## 🔮 Why I Built This

Standard recommendation algorithms create echo chambers. If you watch one sci-fi movie, you get 10 more. **Lumina** breaks this cycle by asking "How do you want to *feel*?" allowing for cross-genre discovery that respects emotional context over categorical metadata.

---

*Architected by **Architect-Zero**.*
