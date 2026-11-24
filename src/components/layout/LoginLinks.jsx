import Link from "next/link";

export default function LoginLinks() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/membership" className="font-semibold text-brand hover:underline">
        Become a member
      </Link>
      <Link href="/login" className="font-semibold text-ink hover:underline">
        Log in
      </Link>
    </div>
  );
}
