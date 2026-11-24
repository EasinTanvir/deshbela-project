import Link from "next/link";
import AuthCard from "@/components/common/AuthCard";
import VerifyForm from "@/components/pages/loginVerify/VerifyForm";
import { LOGIN_CODE_MINUTES } from "@/lib/loginCode";

export default function LoginVerify() {
  return (
    <AuthCard
      title="Check your email"
      intro={`For your safety, staff accounts need a second step. We have sent a 6-digit code to your email. The code works for ${LOGIN_CODE_MINUTES} minutes.`}
      footer={
        <>
          Did not get the code?{" "}
          <Link href="/login" className="font-semibold text-ink hover:text-brand hover:underline">
            Log in again
          </Link>{" "}
          to get a new one.
        </>
      }
    >
      <VerifyForm />
    </AuthCard>
  );
}
