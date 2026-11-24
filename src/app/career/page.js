import Career from "@/components/pages/career/Career";
import { getPageBySlug } from "@/lib/pageData";

export async function generateMetadata() {
  const page = await getPageBySlug("career");

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: "/career" },
  };
}

export default function CareerPage() {
  return <Career />;
}
