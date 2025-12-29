# CI/CD Documentation

This document provides detailed information about the Continuous Integration (CI) setup for the dlog project.

## Overview

The dlog project uses GitHub Actions for automated CI workflows. Since deployment is handled by Vercel (CD - Continuous Deployment), we focus on CI automation including linting, type checking, building, security scanning, and dependency management.

## Package Manager

All workflows use **Bun** as the package manager and runtime, as specified in the project requirements.

## Workflows

### 1. Main CI Pipeline (`ci.yml`)

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

**Steps:**
1. **Checkout code** - Gets the repository code
2. **Setup Bun** - Installs the latest version of Bun
3. **Cache dependencies** - Caches Bun dependencies for faster builds
4. **Cache Next.js build** - Caches Next.js build artifacts
5. **Install dependencies** - Runs `bun install --frozen-lockfile`
6. **Run linter** - Executes `bun run lint` using ESLint
7. **Run type check** - Executes `bun run typecheck` using TypeScript compiler
8. **Build application** - Runs `bun run build` to verify production build

**Environment Variables:**
The build step includes dummy environment variables that are only needed for Next.js build-time validation. These are not real credentials and are clearly marked as CI-only values.

### 2. CodeQL Security Scanning (`codeql.yml`)

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch
- Scheduled weekly (Sundays at 00:00 UTC)

**Purpose:**
Analyzes JavaScript/TypeScript code for security vulnerabilities and code quality issues using GitHub's CodeQL engine.

**Steps:**
1. Initialize CodeQL with security and quality queries
2. Autobuild the project
3. Perform analysis and upload results to GitHub Security tab

### 3. Dependency Review (`dependency-review.yml`)

**Triggers:**
- Pull requests to `main` or `master` branch

**Purpose:**
Reviews dependency changes in pull requests to identify known security vulnerabilities.

**Configuration:**
- Fails on moderate or higher severity vulnerabilities
- Adds summary comments to pull requests
- Requires `contents: read` and `pull-requests: write` permissions

### 4. PR Labeler (`labeler.yml`)

**Triggers:**
- Pull request opened, synchronized, or reopened

**Purpose:**
Automatically labels pull requests based on which files are changed.

**Labels:**
- `database` - Changes to Prisma schema or database files
- `ui` - Changes to components or UI-related TSX files
- `api` - Changes to API routes or tRPC
- `dependencies` - Changes to package.json or bun.lock
- `config` - Changes to configuration files
- `documentation` - Changes to markdown files
- `ci-cd` - Changes to GitHub workflows

**Configuration:**
Labels are defined in `.github/labeler.yml`

## Local Development

To run the same checks locally before pushing:

```bash
# Run linter
bun run lint

# Run type check
bun run typecheck

# Build the application
bun run build
```

## Caching Strategy

The CI pipeline uses two levels of caching to improve build speed:

1. **Dependency Cache** - Caches Bun's install cache directory
   - Key: `${{ runner.os }}-bun-${{ hashFiles('**/bun.lock') }}`
   - Invalidates when `bun.lock` changes

2. **Next.js Build Cache** - Caches Next.js build artifacts
   - Key: Includes both `bun.lock` hash and source file hashes
   - Invalidates when dependencies or source files change

## Required Permissions

The workflows require the following GitHub Actions permissions:

- **ci.yml**: Default permissions (read repository)
- **codeql.yml**: 
  - `actions: read`
  - `contents: read`
  - `security-events: write`
- **dependency-review.yml**:
  - `contents: read`
  - `pull-requests: write`
- **labeler.yml**:
  - `contents: read`
  - `pull-requests: write`

## Status Badges

The README includes status badges that show the current state of:
- Main CI pipeline
- CodeQL security scanning

## Troubleshooting

### Build Failures

If the build fails in CI but works locally:
1. Ensure all environment variables are properly set
2. Check if there are any local-only dependencies
3. Verify `bun.lock` is committed and up to date

### Type Check Failures

If type checking fails:
1. Run `bun run typecheck` locally to see errors
2. Fix type errors in your code
3. Ensure `tsconfig.json` is consistent

### Lint Failures

If linting fails:
1. Run `bun run lint` locally
2. Fix linting errors or update ESLint configuration if needed

## Adding New Workflows

To add a new workflow:

1. Create a new YAML file in `.github/workflows/`
2. Define appropriate triggers and permissions
3. Use Bun for any package management operations
4. Add documentation to this file

## Security Considerations

- Never commit real credentials or secrets to workflow files
- Use GitHub Secrets for sensitive values if needed
- Dummy environment variables in CI are clearly marked and non-functional
- CodeQL runs regularly to catch security issues
- Dependency review prevents vulnerable dependencies from being merged
