# Daily Log (dlog)

[![CI](https://github.com/ubeyidah/dlog/actions/workflows/ci.yml/badge.svg)](https://github.com/ubeyidah/dlog/actions/workflows/ci.yml)
[![CodeQL](https://github.com/ubeyidah/dlog/actions/workflows/codeql.yml/badge.svg)](https://github.com/ubeyidah/dlog/actions/workflows/codeql.yml)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This project uses [Bun](https://bun.sh) as the package manager and runtime. Make sure you have Bun installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

First, install dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Available Scripts

- `bun dev` - Start the development server
- `bun run build` - Build the application for production
- `bun start` - Start the production server
- `bun run lint` - Run ESLint to check for code issues
- `bun run typecheck` - Run TypeScript type checking
- `bun run db:push` - Push Prisma schema changes to the database
- `bun run db:generate` - Generate Prisma client
- `bun run db:studio` - Open Prisma Studio for database management
- `bun run db:migrate` - Create and apply database migrations

## CI/CD

This project uses GitHub Actions for continuous integration. The following checks run automatically on every push and pull request:

- **Linting** - ESLint checks for code quality and style
- **Type Checking** - TypeScript compiler checks for type errors
- **Build** - Verifies the application builds successfully
- **Security Scanning** - CodeQL analyzes code for security vulnerabilities

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
