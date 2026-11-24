import GalleryDetails from "@/components/pages/galleryDetails/GalleryDetails";
import { getGalleryBySlug, getGallerySlugs } from "@/lib/galleryData";

export async function generateStaticParams() {
  const slugs = await getGallerySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const gallery = await getGalleryBySlug(slug);
  if (!gallery) return { title: "Gallery not found" };

  return {
    title: gallery.title,
    description: `${gallery.title}: ${gallery.photos.length} photos from DESHBELA photographers.`,
    alternates: { canonical: `/gallery/${gallery.slug}` },
  };
}

export default async function GalleryDetailsPage({ params }) {
  const { slug } = await params;
  return <GalleryDetails slug={slug} />;
}
