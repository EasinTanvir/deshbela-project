import SectionTitle from "@/components/common/SectionTitle";
import MediaGrid from "@/components/pages/reporter/MediaGrid";
import MediaUploadForm from "@/components/pages/reporter/MediaUploadForm";
import { requireReporter } from "@/lib/currentUser";
import { getReporterMedia } from "@/lib/reporterData";

export default async function MediaLibrary() {
  const user = await requireReporter();
  const items = await getReporterMedia(user.id);

  return (
    <div className="space-y-10">
      <section className="max-w-2xl">
        <SectionTitle title="Upload a photo" />
        <MediaUploadForm />
      </section>

      <section>
        <SectionTitle title={`My photos (${items.length})`} />
        <MediaGrid items={items} />
      </section>
    </div>
  );
}
