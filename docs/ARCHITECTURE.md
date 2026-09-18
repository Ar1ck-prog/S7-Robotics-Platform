# S7 Robotics Platform Architecture

## Target Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: NestJS, TypeScript
- Database: PostgreSQL
- Cache: Redis
- Reverse proxy: Nginx
- Auth: JWT with role-based access
- API: REST
- Deployment: Docker Compose
- Version control: Git and GitHub

## Monorepo Layout

```text
apps/
  web/   React student and mentor LMS interface
  api/   NestJS REST API, JWT auth, course/project domain
infra/
  nginx.conf
docker-compose.yml
```

The legacy hackathon MVP remains in the repository root so the demo can still run instantly without dependency installation. The new `apps/web` and `apps/api` folders define the production direction.

## Core Domains

- Auth: registration, mentor invite code, login, JWT issuing, role guard.
- Users: student and mentor profiles.
- Courses: tracks, lessons, components, schema, code samples, challenges.
- Progress: current lesson, XP, levels, streaks, achievements.
- Submissions: code/video/description, review state, feedback, XP award.
- Mentor Workspace: review queue, student health, group analytics, feedback templates.
- Competition: teams, tasks, schedule, leaderboard.

## API Shape

- `POST /auth/register`
- `POST /auth/login`
- `GET /courses`
- `GET /courses/:id/lessons/:lessonNumber`
- `POST /submissions`
- `POST /compiler/run`
- `GET /mentor/overview`
- `PATCH /mentor/submissions/:id/review`

## Data Model

PostgreSQL stores users, courses, lessons, progress and submissions. Redis is reserved for JWT denylist, short-lived mentor dashboard cache, rate limits and future realtime notifications.

## Compiler Sandbox

The compiler UI posts to `POST /compiler/run`. The API is designed for Vercel Sandbox execution: every run should use an isolated short-lived environment with no student file access, disabled outbound network by default, timeout and memory limits. The current hackathon MVP also has a local syntax-check fallback so the demo works offline.

## Deployment

`docker compose up --build` starts PostgreSQL, Redis, Nest API, Vite web app and Nginx. Nginx exposes the product at `http://localhost` and proxies API requests under `/api`.
