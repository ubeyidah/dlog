import { Suspense } from "react"
import VerifyOTPForm from "./_components/verify-otp-form"

const VerifyOTP = () => {
  return (
    <Suspense>
      <VerifyOTPForm />
    </Suspense>
  )
}

export default VerifyOTP
