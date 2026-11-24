import Link from "next/link";
import AuthCard from "@/components/common/AuthCard";
import RegisterForm from "@/components/pages/register/RegisterForm";

export default function Register() {
  return (
    <AuthCard
      title="Create an account"
      intro="Save news for later, react to stories and join the conversation. It is free."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-ink hover:text-brand hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
