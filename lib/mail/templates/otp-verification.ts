export const emailOTPVerificationTemplate = (otp: string, userName: string) => {
  const year = new Date().getFullYear()
  const supportUrl = 'mailto:support@dlog.live'
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
    .container { background: white; border-radius: 8px; padding: 32px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
    .header { text-align: center; margin-bottom: 24px; }
    .logo { height: 40px; }
    .otp { font-size: 32px; font-weight: bold; letter-spacing: 4px; text-align: center; margin: 24px 0; color: #1F2937; background: #f3f4f6; padding: 12px 24px; border-radius: 6px; display: inline-block; }
    .footer { margin-top: 32px; text-align: center; font-size: 12px; color: #6B7280; }
    .button { display: inline-block; padding: 10px 20px; background: #4F46E5; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; margin-top: 16px; }
    .highlight { font-weight: 600; color: #1F2937; }
    .security-note { font-size: 14px; color: #6B7280; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://dlog.live/logo.svg" alt="DLOG Logo" class="logo" />
    </div>

    <h1 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Your Login Code</h1>

    <p style="margin-bottom: 24px;">Hi ${userName},</p>

    <p style="margin-bottom: 8px;">Your one-time login code is:</p>
    <div class="otp">${otp}</div>

    <p style="margin-bottom: 24px;">Enter this code in the app to complete your login. It will <span class="highlight">expire in 5 minutes</span>.</p>

    <div class="security-note">
      <p>If you didn’t request this code, please ignore this email or <a href="${supportUrl}" style="color: #4F46E5;">contact support</a> if you suspect unauthorized access.</p>
    </div>

    <div class="footer">
      <p>© ${year} <a href="https://dlog.live" style="color: #4F46E5; text-decoration: none;">DLOG</a>. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
}
