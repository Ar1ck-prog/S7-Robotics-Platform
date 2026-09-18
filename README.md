# S7 Robotics Platform MVP

Frontend MVP for the core hackathon scenario:

1. A student opens the Arduino course and completes the HC-SR04 lesson.
2. The student runs a pedagogical code pre-check and submits evidence.
3. A mentor reviews the work, leaves feedback, and approves or requests changes.
4. Approval grants 50 XP exactly once and unlocks the next lesson.

## Run

Serve the directory with any static HTTP server and open `index.html`. Demo accounts:

- Student: `student@s7.kz` / `1234`
- Mentor: `mentor@s7.kz` / `1234`

## Verify

Requires Node.js 18 or newer. No package installation is needed.

```bash
npm test
npm run check
```

## Architecture

- `index.html` contains accessible screens and view templates.
- `styles.css` contains the responsive visual system.
- `core.js` is a UI-independent domain layer for validation, submissions, reviews, XP, progress, and the local AI pre-check.
- `app.js` binds the domain layer to the browser UI and local storage.
- `tests/core.test.js` protects the critical student-to-mentor workflow.

## MVP boundary

Authentication and persistence use `localStorage` only and are suitable for a hackathon demo, not production. A production version should move identities, authorization, submissions, uploads, audit logs, and AI calls to an authenticated backend. Never put an AI provider key in browser code.
