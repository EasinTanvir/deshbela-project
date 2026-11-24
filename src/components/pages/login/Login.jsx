import Link from "next/link";
import AuthCard from "@/components/common/AuthCard";
import LoginForm from "@/components/pages/login/LoginForm";

export default function Login() {
  return (
    <AuthCard
      title="Log in"
      intro="Readers and staff log in here. Staff accounts also need a code sent by email."
      footer={
        <>
          New to DESHBELA?{" "}
          <Link href="/register" className="font-semibold text-ink hover:text-brand hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
