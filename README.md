# Task Management App (TypeScript)

A production-style task management application built with React, TypeScript, Vite, and Auth0 authentication. The project demonstrates typed state management, route protection, validation, and responsive UI patterns.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=flat&logo=auth0&logoColor=white)

## Recruiter Snapshot

- Built an authenticated React + TypeScript app with protected routes and user sessions via Auth0.
- Implemented complete task lifecycle flows: create, edit, delete, filter, sort, and status tracking.
- Applied type-safe patterns using interfaces, union types, custom hooks, and Context-based state.
- Designed a responsive dashboard UI for desktop, tablet, and mobile layouts.

## Features

- Task CRUD with title, description, due date, priority, and tags.
- Status workflow: pending, in-progress, on-hold, completed.
- Dashboard with task statistics, search, filtering, and sorting.
- Protected routes and authenticated user context.
- Form validation and user-friendly error states.

## Tech Stack

- Frontend: React, TypeScript, Vite
- Auth: Auth0 React SDK
- State: React Context API + custom hooks
- Styling: CSS3 (responsive with Grid/Flexbox)
- Quality: ESLint + TypeScript strict configuration

## Project Structure

```text
Task-Management-App-with-TypeScript/
├── App.tsx
├── main.tsx
├── AuthContext.tsx
├── TaskContext.tsx
├── Dashboard.tsx
├── CreateEditTask.tsx
├── TaskCard.tsx
├── TaskDetails.tsx
├── TaskFilter.tsx
├── TaskForm.tsx
├── TaskStats.tsx
├── useTasks.ts
├── validation.ts
├── index.html
├── package.json
└── README.md
```

## Local Setup

1. Clone the repository.
2. Install dependencies.
3. Configure Auth0 environment variables.
4. Run the app.

```bash
git clone https://github.com/yousafzeb-byte/Task-Management-App-with-TypeScript.git
cd Task-Management-App-with-TypeScript
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-audience
```

In your Auth0 application settings, include:

- Allowed Callback URLs: `http://localhost:5173`
- Allowed Logout URLs: `http://localhost:5173`
- Allowed Web Origins: `http://localhost:5173`

## Scripts

```bash
npm run dev         # Start development server
npm run build       # Build production bundle
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript checks
```

## Roadmap

- Add backend persistence (API + database) for multi-device sync.
- Add test coverage (unit and integration) for critical flows.
- Add drag-and-drop task reordering.

## Author

Yousaf Zeb

- GitHub: https://github.com/yousafzeb-byte
