import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import GalleryCard from "@/components/common/GalleryCard";
import SectionTitle from "@/components/common/SectionTitle";
import { getAllGalleries } from "@/lib/galleryData";

export default async function Gallery() {
  const galleries = await getAllGalleries();
  const [lead, second, ...rest] = galleries;

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: "Gallery", href: "/gallery" }]} />
      <header className="mt-4 border-b-2 border-ink pb-3">
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">Photo Gallery</h1>
        <p className="mt-2 text-muted">The news in pictures, by DESHBELA photographers.</p>
      </header>

      {lead ? (
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-0">
          <div className="min-w-0 lg:col-span-8 lg:pr-8">
            <GalleryCard gallery={lead} large />
          </div>
          <aside className="space-y-10 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
            {second && <GalleryCard gallery={second} />}
            <AdSlot size="rectangle" />
          </aside>
        </div>
      ) : (
        <p className="mt-8 text-muted">No photo galleries have been published yet.</p>
      )}

      {rest.length > 0 && (
        <section className="mt-12">
          <SectionTitle title="More Galleries" />
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((gallery) => (
              <GalleryCard key={gallery.id} gallery={gallery} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
