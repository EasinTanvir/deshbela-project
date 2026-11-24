import Gallery from "@/components/pages/gallery/Gallery";

export const metadata = {
  title: "Photo Gallery",
  description: "The news in pictures: photo galleries from DESHBELA photographers.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <Gallery />;
}
