# Agent & Contributor Guidelines

This document serves as the primary source of truth for AI agents and human contributors working on this repository. Adherence to these guidelines is mandatory to maintain code quality, consistency, and system stability.

## 1. Environment & Runtime

**Primary Runtime:** [Bun](https://bun.sh)
**Package Manager:** [Bun](https://bun.sh)

All development scripts, dependency installations, and package management operations must be executed using Bun.
**Do not** use `npm`, `yarn`, or `pnpm` unless explicitly instructed for specific compatibility debugging.

### Core Commands

| Action          | Command               | Description                                       |
| --------------- | --------------------- | ------------------------------------------------- |
| **Install**     | `bun install`         | Install project dependencies                      |
| **Dev Server**  | `bun run dev`         | Start the Next.js development server              |
| **Build**       | `bun run build`       | Build the application for production              |
| **Start**       | `bun run start`       | Start the production server                       |
| **Lint**        | `bun run lint`        | Run ESLint to catch errors and enforce rules      |
| **DB Push**     | `bun run db:push`     | Push schema changes to the database (prototyping) |
| **DB Migrate**  | `bun run db:migrate`  | Create and apply migrations (production-ready)    |
| **DB Generate** | `bun run db:generate` | Generate Prisma client artifacts                  |
| **DB Studio**   | `bun run db:studio`   | Open Prisma Studio GUI for data management        |

_Note: There are currently no testing commands configured. Do not run `bun test` or look for test files unless instructed to create them._

## 2. Tech Stack Overview

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + `clsx` + `tailwind-merge`
- **UI Components:** Shadcn UI (Baseui Primitives)
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** Better Auth
- **API/Data Fetching:** TRPC + TanStack Query

## 3. Project Structure & Architecture

This project uses the Next.js App Router with specific conventions:

- **Route Groups:** Used for layout organization (e.g., `(auth)`, `(marketing)`). These folders do not affect the URL path.
- **Colocation:** Components specific to a page or layout should be located in a `_components` folder within that route directory (e.g., `app/(auth)/sign-in/_components/`).
- **Shared Components:** Reusable UI components live in `@/components/ui`, while shared functional components live in `@/components/shared`.
- **API Routes:** Located in `app/api`.
- **TRPC:** Routers and server configuration are in `trpc/`.

## 4. Code Style & Conventions

### Naming Conventions

- **Directories:** Always use `kebab-case` (e.g., `components/ui`, `app/api/auth`).
- **Files:**
  - Components, Hooks, Utilities: `kebab-case` (e.g., `button.tsx`, `use-mobile.tsx`, `auth-client.ts`).
  - _Exception:_ Special Next.js files (`page.tsx`, `layout.tsx`, `route.ts`) follow framework rules.
- **React Components:** PascalCase (e.g., `export function Button() {}`, `export const Header = () => {}`).
- **Hooks:** camelCase, prefixed with `use` (e.g., `useIsMobile`).
- **Variables & Functions:** camelCase (e.g., `isLoading`, `handleSubmit`).
- **Types & Interfaces:** PascalCase (e.g., `interface UserProps`).
- **Constants:** UPPER_SNAKE_CASE for global constants (e.g., `MAX_RETRIES = 3`).

### TypeScript & Typing

- **Strict Mode:** Enabled. Do not use `any` types. Find the correct type or create an interface.
- **Explicit Returns:** Define explicit return types for exported functions, especially API handlers and hooks.
- **Props Interfaces:** Define props using an interface, typically named `{ComponentName}Props`.
- **Type Definitions:** Prefer `interface` for extendable object shapes and `type` for unions/intersections.

### Imports & Exports

- **Absolute Imports:** Use the `@/` alias for all internal project imports.

  ```tsx
  // ✅ Correct
  import { Button } from "@/components/ui/button";
  import { auth } from "@/lib/auth";

  // ❌ Incorrect
  import { Button } from "../../components/ui/button";
  ```

- **Import Order:**
  1. Built-in Node.js modules
  2. External dependencies (React, Next.js, third-party libs)
  3. Internal aliases (`@/components`, `@/lib`, `@/hooks`)
  4. Relative imports (only for closely related sibling files)
  5. Styles
- **Exports:** Named exports are preferred for components and utilities to ensure consistent naming on import.

### Formatting & Syntax

- **Indentation:** 2 spaces.
- **Semicolons:** Always use semicolons.
- **Quotes:** Consistent use of double quotes `"` for JSX attributes. JS strings typically follow existing file patterns (often double quotes).
- **Trailing Commas:** Use trailing commas in objects and arrays for cleaner git diffs.
- **JSX:**
  - Avoid complex logic inside JSX return. Extract to helper functions or variables.
  - Use self-closing tags when no children are present.
  - Use fragments `<>` instead of `<div>` when wrapping multiple elements without semantic meaning.

### Error Handling

- **Async Operations:** Always wrap async database or API calls in `try/catch` blocks.
- **Validation:** Use Zod schemas (located in `lib/validation`) to validate incoming data at API boundaries.
- **UI Feedback:** Use `sonner` toasts for user-facing success/error messages.
- **Console:** Remove `console.log` debugging statements before committing. Use `console.error` for actual error logging.

## 5. Development Workflows

### UI Component Development (Shadcn)

- When adding new UI primitives, follow the established pattern in `components/ui`.
- Utilize `cn()` from `@/lib/utils` for conditional class merging.
- Use `cva` (class-variance-authority) for managing component variants.

### Database Changes (Prisma)

1. Modify `prisma/schema.prisma`.
2. Run `bun run db:generate` to update the client.
3. Run `bun run db:migrate` (or `db:push` for local proto) to update the DB.
4. **Never** import Prisma Client directly in Client Components.

### TRPC & Data Fetching

- Define new procedures in `trpc/routers`.
- Use the TRPC React hooks (e.g., `trpc.example.hello.useQuery`) in components.
- Ensure all inputs are validated with Zod.

## 6. Agent Rules of Engagement

1.  **Context is King:** Always read the relevant files before proposing changes. Do not guess.
2.  **Bun First:** Always use `bun` commands.
3.  **No Hallucinations:** Do not use libraries that are not listed in `package.json`. If you need a new library, ask for permission.
4.  **Linting:** Run `bun run lint` after making significant changes to ensure code compliance.
5.  **Safety:** Never commit secrets or `.env` files.

## 7. External Rules

_(No specific .cursorrules or Copilot instructions were found at the time of writing. If added, they take precedence over general rules here.)_
