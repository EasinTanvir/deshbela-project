import Link from "next/link";
import { logOut } from "@/actions/logoutActions";
import LoginLinks from "@/components/layout/LoginLinks";
import { getCurrentUser } from "@/lib/currentUser";

export default async function AccountLinks() {
  const user = await getCurrentUser();
  if (!user) return <LoginLinks />;

  return (
    <div className="flex items-center gap-4">
      <Link href="/account" className="font-semibold text-ink hover:underline">
        <span className="sr-only">Logged in as </span>
        {user.name.split(" ")[0]}
      </Link>
      <form action={logOut}>
        <button type="submit" className="font-semibold text-muted hover:text-ink hover:underline">
          Log out
        </button>
      </form>
    </div>
  );
}
