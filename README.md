<div align="center">
  <img src="public/logo.svg" alt="DLOG Logo" width="120" height="120">
  
  # DLOG - Daily Log Journal
  
  **Capture Your Day, Effortlessly**
  
  A minimalist daily journaling application for reflections, thoughts, and progress—no distractions, just focus.
  
  [![CI](https://github.com/ubeyidah/dlog/actions/workflows/ci.yml/badge.svg)](https://github.com/ubeyidah/dlog/actions/workflows/ci.yml)
  [![CodeQL](https://github.com/ubeyidah/dlog/actions/workflows/codeql.yml/badge.svg)](https://github.com/ubeyidah/dlog/actions/workflows/codeql.yml)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
  
  [Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](./CONTRIBUTING.md)
</div>

---

## ✨ Features

- **⚡ Quick Logs** - Capture your thoughts in seconds—no distractions, just focus
- **📊 Powerful Insights** - Track habits, moods, and progress with smart analytics
- **🔒 Private & Secure** - Your reflections stay yours—encrypted and ad-free
- **🎨 Customizable** - Tailor DLOG to your workflow with themes, tags, and prompts
- **🤖 AI-Assisted** - Get gentle nudges and summaries to deepen your reflection
- **⚙️ Full Control** - Export, sync, or share—your data, your rules

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- PostgreSQL database
- Node.js 20+ (for compatibility)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ubeyidah/dlog.git
   cd dlog
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and configure your database and authentication credentials.

4. **Initialize the database**
   ```bash
   bun run db:push
   ```

5. **Start the development server**
   ```bash
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com)
- **Database:** [PostgreSQL](https://www.postgresql.org) with [Prisma ORM](https://www.prisma.io)
- **Authentication:** [Better Auth](https://www.better-auth.com)
- **API:** [tRPC](https://trpc.io) + [TanStack Query](https://tanstack.com/query)
- **Runtime:** [Bun](https://bun.sh)

## 📖 Documentation

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start the development server |
| `bun run build` | Build for production |
| `bun start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run db:push` | Push schema changes to database |
| `bun run db:migrate` | Create and apply migrations |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:studio` | Open Prisma Studio |

### Project Structure

```
dlog/
├── app/                  # Next.js app directory
│   ├── (auth)/          # Authentication routes
│   ├── (marketing)/     # Marketing pages
│   ├── dashboard/       # Dashboard routes
│   └── api/             # API routes
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   └── shared/         # Shared components
├── lib/                # Utility functions
├── prisma/             # Database schema
├── trpc/               # tRPC routers
└── public/             # Static assets
```

### Environment Variables

Required environment variables (see `.env.example`):

- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secret for authentication
- `BETTER_AUTH_URL` - Base URL of your app
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `RESEND_API_KEY` - Resend API key for emails

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔒 Security

If you discover a security vulnerability, please follow our [Security Policy](./SECURITY.md).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [Shadcn UI](https://ui.shadcn.com)
- Icons from [Hugeicons](https://hugeicons.com)

## 📧 Contact

- **GitHub Issues:** [Report a bug or request a feature](https://github.com/ubeyidah/dlog/issues)
- **Repository:** [github.com/ubeyidah/dlog](https://github.com/ubeyidah/dlog)

---

<div align="center">
  Made with ❤️ by the DLOG community
</div>
