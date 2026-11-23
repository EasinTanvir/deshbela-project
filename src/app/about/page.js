import About from "@/components/pages/about/About";
import { getPageBySlug } from "@/lib/pageData";

export async function generateMetadata() {
  const page = await getPageBySlug("about");

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: "/about" },
  };
}

export default function AboutPage() {
  return <About />;
}
