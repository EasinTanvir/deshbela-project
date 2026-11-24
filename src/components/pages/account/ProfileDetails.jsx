import SectionTitle from "@/components/common/SectionTitle";
import PasswordForm from "@/components/pages/account/PasswordForm";
import ProfileForm from "@/components/pages/account/ProfileForm";
import { requireUser } from "@/lib/currentUser";
import { formatDay } from "@/lib/formatDate";

export default async function ProfileDetails() {
  const user = await requireUser();
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="space-y-10">
      <section className="flex items-center gap-4 border-b border-line pb-6">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center border border-line bg-surface font-serif text-2xl font-bold text-ink">
          {initials}
        </span>
        <div>
          <p className="font-serif text-2xl font-bold text-ink">{user.name}</p>
          <p className="text-sm text-muted">
            {user.roleName} &middot; member since{" "}
            <time dateTime={user.createdAt}>{formatDay(user.createdAt)}</time>
          </p>
        </div>
      </section>

      <section className="max-w-2xl">
        <SectionTitle title="Your details" />
        <ProfileForm name={user.name} email={user.email} />
      </section>

      <section className="max-w-2xl">
        <SectionTitle title="Change password" />
        <PasswordForm />
      </section>
    </div>
  );
}
