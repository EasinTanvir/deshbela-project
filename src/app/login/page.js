import Login from "@/components/pages/login/Login";

export const metadata = {
  title: "Log in",
  description: "Log in to your DESHBELA account.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return <Login />;
}
