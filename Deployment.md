# Deployment Guide

## Vercel (Recommended – Fastest)
1. Push this repository to GitHub.
2. Go to vercel.com → Import Git Repository.
3. Deploy – Vercel auto-detects index.html and gives you a live URL instantly.

## Custom Domain
In Vercel settings → Domains → Add your domain.

## Full Stack (Backend + Database)
Use Railway or Render for backend + Neon/Supabase for PostgreSQL.

## Docker
Run `docker-compose up --build` for local full-stack testing.
