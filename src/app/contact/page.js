import Contact from "@/components/pages/contact/Contact";
import { getPageBySlug } from "@/lib/pageData";

export async function generateMetadata() {
  const page = await getPageBySlug("contact");

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: "/contact" },
  };
}

export default function ContactPage() {
  return <Contact />;
}
