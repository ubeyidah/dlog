# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

The DLOG team takes security seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

1. **GitHub Security Advisories** (Preferred)
   - Go to the [Security tab](https://github.com/ubeyidah/dlog/security/advisories)
   - Click "Report a vulnerability"
   - Fill out the advisory details

2. **Email**
   - Send details to the repository maintainer
   - Use the email associated with the repository owner's GitHub account

### What to Include

Please include the following information in your report:

- **Type of vulnerability** (e.g., SQL injection, XSS, authentication bypass)
- **Affected component(s)** (file paths, URLs, or specific functionality)
- **Step-by-step instructions** to reproduce the issue
- **Proof of concept** or exploit code (if possible)
- **Impact assessment** - how an attacker could exploit this vulnerability
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up questions

### What to Expect

After submitting a vulnerability report:

1. **Acknowledgment** - We'll acknowledge receipt within 48 hours
2. **Assessment** - We'll assess the vulnerability and determine severity
3. **Timeline** - We'll provide an estimated timeline for a fix
4. **Updates** - We'll keep you informed of progress
5. **Disclosure** - We'll coordinate public disclosure after a fix is available

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Varies by severity
  - Critical: 1-7 days
  - High: 7-14 days
  - Medium: 14-30 days
  - Low: 30-90 days

## Security Best Practices

### For Users

1. **Keep Updated** - Always use the latest version
2. **Environment Variables** - Never commit `.env` files
3. **Strong Secrets** - Use strong, unique values for `BETTER_AUTH_SECRET`
4. **HTTPS Only** - Always use HTTPS in production
5. **Database Security** - Secure your PostgreSQL instance
6. **OAuth Credentials** - Keep OAuth client secrets secure

### For Contributors

1. **Never commit secrets** or credentials
2. **Validate all inputs** using Zod schemas
3. **Use parameterized queries** (Prisma handles this)
4. **Sanitize user-generated content**
5. **Follow authentication best practices**
6. **Review dependencies** for known vulnerabilities
7. **Enable security features** in production

## Security Features

DLOG implements several security measures:

- ✅ **Authentication** - Better Auth with OAuth2 support
- ✅ **Session Management** - Secure session handling
- ✅ **Input Validation** - Zod schema validation
- ✅ **SQL Injection Protection** - Prisma ORM with parameterized queries
- ✅ **CSRF Protection** - Built into Next.js
- ✅ **XSS Protection** - React's built-in XSS prevention
- ✅ **Environment Variables** - Secure configuration management
- ✅ **HTTPS Enforcement** - Recommended for production
- ✅ **Dependency Scanning** - Automated via GitHub Actions

## Known Security Considerations

### Database Access

- Database credentials must be kept secure
- Use connection pooling for production
- Implement rate limiting for API endpoints

### Authentication

- OAuth credentials must be kept secure
- Session tokens are stored securely
- Email verification is implemented

### User Data

- User data is stored in PostgreSQL
- Passwords are never stored (OAuth only)
- Personal data should be handled according to privacy regulations

## Security Updates

Security updates are released as soon as possible after a vulnerability is confirmed. Updates will be:

1. Published as a new version
2. Documented in release notes
3. Announced via GitHub Security Advisories
4. Listed in the changelog

## Acknowledgments

We would like to thank the following for responsibly disclosing security vulnerabilities:

<!-- This section will be updated as researchers report vulnerabilities -->

_No vulnerabilities have been reported yet._

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/deploying#security)
- [Better Auth Security](https://www.better-auth.com/docs/concepts/security)
- [Prisma Security](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#security)

## Questions?

If you have questions about this security policy, please open a discussion in the repository.

---

**Thank you for helping keep DLOG and its users safe!**
