import Register from "@/components/pages/register/Register";

export const metadata = {
  title: "Create an account",
  description: "Create a free DESHBELA account to save news, react to stories and post comments.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return <Register />;
}
