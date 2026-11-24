import Advertise from "@/components/pages/advertise/Advertise";
import { getPageBySlug } from "@/lib/pageData";

export async function generateMetadata() {
  const page = await getPageBySlug("advertise");

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: "/advertise" },
  };
}

export default function AdvertisePage() {
  return <Advertise />;
}
