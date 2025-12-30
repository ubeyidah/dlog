<div align="center">
  <img src="./public/logo.svg" alt="DLOG Logo" width="200"/>
  
  # DLOG - Daily Journaling Made Simple
  
  [![CI](https://github.com/ubeyidah/dlog/actions/workflows/ci.yml/badge.svg)](https://github.com/ubeyidah/dlog/actions/workflows/ci.yml)
  [![CodeQL](https://github.com/ubeyidah/dlog/actions/workflows/codeql.yml/badge.svg)](https://github.com/ubeyidah/dlog/actions/workflows/codeql.yml)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  
  **Capture your day, effortlessly. A minimalist journal for daily reflections, thoughts, and progress—no distractions, just focus.**
  
  [Live Demo](#) • [Report Bug](https://github.com/ubeyidah/dlog/issues) • [Request Feature](https://github.com/ubeyidah/dlog/issues)
</div>

---

## 📖 About DLOG

DLOG is a modern, privacy-focused daily journaling application designed to help you reflect, grow, and own your journey. Built with the latest web technologies, it provides a seamless experience for capturing your thoughts, tracking habits, and gaining insights from your daily reflections.

### ✨ Key Features

- **⚡ Quick Logs** - Capture your thoughts in seconds with a distraction-free interface
- **📊 Powerful Insights** - Track habits, moods, and progress with smart analytics
- **🔒 Private & Secure** - Your reflections stay yours with robust authentication and data encryption
- **🎨 Customizable** - Tailor DLOG to your workflow with themes, tags, and prompts
- **✨ AI-Assisted** - Get gentle nudges and summaries to deepen your reflection
- **⚙️ Full Control** - Export, sync, or share—your data, your rules

---

## 🛠️ Tech Stack

DLOG is built with modern, production-ready technologies:

### Frontend
- **[Next.js 16](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - UI library
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Shadcn UI](https://ui.shadcn.com)** - Beautiful, accessible component library
- **[Motion](https://motion.dev)** - Smooth animations and transitions

### Backend & Database
- **[tRPC](https://trpc.io)** - End-to-end typesafe APIs
- **[Prisma](https://www.prisma.io)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org)** - Reliable relational database
- **[Better Auth](https://www.better-auth.com)** - Modern authentication solution

### State Management & Data Fetching
- **[TanStack Query](https://tanstack.com/query)** - Powerful async state management
- **[Zod](https://zod.dev)** - TypeScript-first schema validation

### Developer Experience
- **[Bun](https://bun.sh)** - Fast all-in-one JavaScript runtime
- **[ESLint](https://eslint.org)** - Code quality and consistency
- **[Prettier](https://prettier.io)** (via ESLint) - Code formatting

---

## 🚀 Getting Started

### Prerequisites

- **[Bun](https://bun.sh)** (v1.0 or higher)
- **PostgreSQL** database (local or cloud)
- **Node.js** (v18 or higher) - optional, for compatibility

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
   
   Then edit `.env` and configure your database and authentication settings:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/dlog"
   
   # Authentication
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   
   # Email (Optional - for email verification)
   RESEND_API_KEY="your-resend-api-key"
   ```

4. **Initialize the database**
   ```bash
   bun run db:push
   ```

5. **Start the development server**
   ```bash
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start the development server with hot reload |
| `bun run build` | Build the application for production |
| `bun start` | Start the production server |
| `bun run lint` | Run ESLint to check for code issues |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run db:push` | Push Prisma schema changes to database (dev) |
| `bun run db:migrate` | Create and apply database migrations (prod) |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:studio` | Open Prisma Studio for database management |

---

## 🌍 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/dlog"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Email Service (Resend - Optional)
RESEND_API_KEY="re_xxxxxxxxxxxxx"

# Node Environment
NODE_ENV="development"
```

> **Note:** Never commit your `.env` file to version control. Use `.env.example` as a template.

---

## 📁 Project Structure

```
dlog/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (marketing)/       # Marketing pages
│   ├── dashboard/         # Dashboard and main app
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── shared/           # Shared components
├── lib/                   # Utility functions and configurations
│   ├── auth.ts           # Better Auth configuration
│   └── validation/       # Zod schemas
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── trpc/                 # tRPC router and configuration
└── hooks/                # Custom React hooks
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### Quick Start for Contributors

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
4. **Make your changes** and test thoroughly
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to your fork** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request** against the `main` branch

### Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests if applicable
- Update documentation as needed
- Ensure all checks pass before submitting

For detailed contribution guidelines, please see [AGENTS.md](./AGENTS.md).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ubeyidah**

- GitHub: [@ubeyidah](https://github.com/ubeyidah)
- Project: [DLOG](https://github.com/ubeyidah/dlog)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org) and [React](https://react.dev)
- UI components from [Shadcn UI](https://ui.shadcn.com)
- Icons from [Hugeicons](https://hugeicons.com)
- Inspired by the minimalist journaling movement

---

<div align="center">
  
  **⭐ Star this repository if you find it helpful!**
  
  Made with ❤️ by [ubeyidah](https://github.com/ubeyidah)
  
</div>
