import { notFound } from "next/navigation";
import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import GalleryCard from "@/components/common/GalleryCard";
import SectionTitle from "@/components/common/SectionTitle";
import ShareLinks from "@/components/common/ShareLinks";
import PhotoViewer from "@/components/pages/galleryDetails/PhotoViewer";
import { getGalleryBySlug, getOtherGalleries } from "@/lib/galleryData";
import { formatDay } from "@/lib/formatDate";
import { getSiteConfig } from "@/lib/siteData";

export default async function GalleryDetails({ slug }) {
  const gallery = await getGalleryBySlug(slug);
  if (!gallery) notFound();

  const otherGalleries = await getOtherGalleries(gallery.id);
  const site = getSiteConfig();
  const galleryUrl = `${site.siteUrl}/gallery/${gallery.slug}`;

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: "Gallery", href: "/gallery" }]} />

      <header className="mt-4 border-b border-line pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">Photo Gallery</p>
        <h1 className="mt-1 font-serif text-3xl font-bold leading-tight text-ink md:text-4xl">{gallery.title}</h1>
        <p className="mt-2 text-xs text-muted">
          <time dateTime={gallery.createdAt}>{formatDay(gallery.createdAt)}</time> &middot; {gallery.photos.length}{" "}
          photos
        </p>
        <div className="mt-4">
          <ShareLinks url={galleryUrl} title={gallery.title} />
        </div>
      </header>

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="min-w-0 lg:col-span-8 lg:pr-8">
          <PhotoViewer photos={gallery.photos} />
        </div>
        <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <AdSlot size="rectangle" />
        </aside>
      </div>

      {otherGalleries.length > 0 && (
        <section className="mt-12">
          <SectionTitle title="More Galleries" href="/gallery" />
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherGalleries.map((item) => (
              <GalleryCard key={item.id} gallery={item} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
