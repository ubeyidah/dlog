import { Resend } from 'resend';
import { emailOTPVerificationTemplate } from './templates/otp-verification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(otp: string, email: string) {
  const userName = email.split('@')[0];
  const { data, error } = await resend.emails.send({
    from: 'DLOG <noreply@dlog.live>',
    to: [email],
    subject: 'Your DLOG Login Code: ' + otp,
    html: emailOTPVerificationTemplate(otp, userName)
  });
  if (error) throw new Error(error.message);
  return data
}
