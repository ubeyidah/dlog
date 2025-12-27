import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { emailOTP } from "better-auth/plugins";
import { sendOtpEmail } from "./mail/resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        if (process.env.NODE_ENV === "development") {
          console.log(`[DEV] OTP for ${email}: ${otp}`);
          return; // skip sending real email
        }
        await sendOtpEmail(otp, email)
      }
    })
  ]
});
