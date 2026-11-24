import Terms from "@/components/pages/terms/Terms";
import { getPageBySlug } from "@/lib/pageData";

export async function generateMetadata() {
  const page = await getPageBySlug("terms");

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: "/terms" },
  };
}

export default function TermsPage() {
  return <Terms />;
}
