import Link from "next/link";
import { notFound } from "next/navigation";
import ReporterPhoto from "@/components/common/ReporterPhoto";
import SectionTitle from "@/components/common/SectionTitle";
import ReporterProfileForm from "@/components/pages/reporter/ReporterProfileForm";
import { nameToSlug } from "@/lib/articleHelpers";
import { requireReporter } from "@/lib/currentUser";
import { getReporterProfile } from "@/lib/reporterData";

export default async function ReporterProfileDetails() {
  const user = await requireReporter();
  const profile = await getReporterProfile(user.id);
  if (!profile) notFound();

  return (
    <div className="space-y-10">
      <section className="flex items-center gap-4 border-b border-line pb-6">
        <ReporterPhoto name={profile.name} photoUrl={profile.photoUrl} sizeClass="h-20 w-20 text-2xl" />
        <div className="min-w-0">
          <p className="font-serif text-2xl font-bold text-ink">{profile.name}</p>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">{profile.designation}</p>
          <Link href={`/author/${nameToSlug(profile.name)}`} className="text-sm text-muted hover:text-ink hover:underline">
            See my public reporter page
          </Link>
        </div>
      </section>

      <section className="max-w-2xl">
        <SectionTitle title="My reporter profile" />
        <ReporterProfileForm bio={profile.bio} />
      </section>

      <section className="max-w-2xl text-sm text-muted">
        <SectionTitle title="Name, email and password" />
        <p>
          Your job title is set by the editor. To change your name, email or password, go to{" "}
          <Link href="/account" className="font-semibold text-brand hover:underline">
            My account
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
