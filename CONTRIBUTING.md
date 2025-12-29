# Contributing to DLOG

Thank you for your interest in contributing to DLOG! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project adheres to a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dlog.git
   cd dlog
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ubeyidah/dlog.git
   ```

## Development Setup

### Prerequisites

- [Bun](https://bun.sh) v1.0+
- PostgreSQL database
- Node.js 20+ (for compatibility)

### Installation

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Configure your `.env` file with the required values.

3. Initialize the database:
   ```bash
   bun run db:push
   ```

4. Start the development server:
   ```bash
   bun dev
   ```

## How to Contribute

### Types of Contributions

- 🐛 **Bug fixes**
- ✨ **New features**
- 📝 **Documentation improvements**
- 🎨 **UI/UX enhancements**
- ⚡ **Performance improvements**
- ✅ **Tests**

### Workflow

1. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our [coding standards](#coding-standards)

3. **Test your changes**:
   ```bash
   bun run lint
   bun run typecheck
   bun run build
   ```

4. **Commit your changes** using [conventional commits](#commit-guidelines)

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** against the `main` branch

## Coding Standards

This project follows strict coding standards. Please read [AGENTS.md](./AGENTS.md) for detailed guidelines.

### Key Conventions

- **Runtime:** Always use Bun for package management and script execution
- **TypeScript:** Strict mode enabled, no `any` types
- **Naming:**
  - Directories: `kebab-case`
  - Files: `kebab-case` (except Next.js special files)
  - Components: `PascalCase`
  - Functions/Variables: `camelCase`
- **Formatting:** 2 spaces indentation, always use semicolons
- **Imports:** Use `@/` alias for internal imports

### Code Quality

Before submitting:

```bash
# Run linter
bun run lint

# Run type checking
bun run typecheck

# Verify build
bun run build
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(auth): add Google OAuth integration
fix(dashboard): resolve chart rendering issue
docs(readme): update installation instructions
```

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all checks pass** (CI, linting, type checking)
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Squash commits** if requested

### PR Title Format

Use conventional commit format:
```
feat: add user profile page
fix: resolve authentication bug
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

## Reporting Bugs

### Before Submitting

- Check existing [issues](https://github.com/ubeyidah/dlog/issues)
- Verify you're using the latest version
- Collect relevant information

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Bun version: [e.g., 1.0.0]
- Node version: [e.g., 20.10.0]

**Additional context**
Any other relevant information
```

## Suggesting Enhancements

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want to happen

**Describe alternatives you've considered**
Alternative solutions or features

**Additional context**
Mockups, examples, or other context
```

## Questions?

- Open a [discussion](https://github.com/ubeyidah/dlog/discussions)
- Review existing [documentation](./README.md)
- Check [AGENTS.md](./AGENTS.md) for technical guidelines

---

Thank you for contributing to DLOG! 🎉
