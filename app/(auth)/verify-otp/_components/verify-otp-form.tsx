"use client"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ButtonLoader } from "@/components/shared/button-loader"
import { useState, useTransition } from "react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

const VerifyOTPForm = () => {
  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [pending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  if (!email) {
    return notFound()
  }


  const handleVerifyOTP = () => {
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            router.push("/dashboard")
          },
          onError: ({ error }) => {
            if (error.code === "INVALID_OTP") {
              toast.error("Invalid OTP. Please double-check and try again.")
              return
            }
            toast.error(error.message || "This OTP has expired. Please request a new code.")
          }
        }
      });
    })
  }

  const validOTP = otp.length === 6
  return (
    <div className="mx-auto space-y-4 sm:w-sm">

      <div>
        <Image src={"/logo-icon.svg"} width={20} height={10} alt='dlog logo' className='h-8 w-full' />
      </div>

      <div className="flex flex-col text-center space-y-1">
        <h1 className="font-bold text-2xl tracking-wide">
          verify Your Email
        </h1>
        <p className="text-base text-muted-foreground">
          We’ve sent a 6-digit code to <span className="font-medium">{email}</span>.
          Enter it below to complete your DLOG account setup.
        </p>
      </div>
      <div className="flex flex-col gap-5 mt-6 items-center">
        <InputOTP maxLength={6} onChange={(value) => setOtp(value)} value={otp} pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup className="flex gap-3">
            <InputOTPSlot index={0} className="border size-10 rounded-lg border-primary/50 bg-input/40" />
            <InputOTPSlot index={1} className="border size-10 rounded-lg border-primary/50 bg-input/40" />
            <InputOTPSlot index={2} className="border size-10 rounded-lg border-primary/50 bg-input/40" />
            <InputOTPSlot index={3} className="border size-10 rounded-lg border-primary/50 bg-input/40" />
            <InputOTPSlot index={4} className="border size-10 rounded-lg border-primary/50 bg-input/40" />
            <InputOTPSlot index={5} className="border size-10 rounded-lg border-primary/50 bg-input/40" />
          </InputOTPGroup>
        </InputOTP>

      </div>
      <p className="text-sm text-muted-foreground text-center">Didn’t receive the code? Check your spam folder or request a new one. (expires in 5 minutes).</p>

      <ButtonLoader className="w-full h-10" disabled={!validOTP || pending} isLoading={pending} onClick={handleVerifyOTP}>Verify OTP</ButtonLoader>
      <p className="mt-5 text-muted-foreground text-sm text-center">

        By clicking continue, you agree to our{" "}
        <Link
          className="underline underline-offset-4 hover:text-primary"
          href="#"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          className="underline underline-offset-4 hover:text-primary"
          href="#"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}

export default VerifyOTPForm
