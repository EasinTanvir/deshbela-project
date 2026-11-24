import Privacy from "@/components/pages/privacy/Privacy";
import { getPageBySlug } from "@/lib/pageData";

export async function generateMetadata() {
  const page = await getPageBySlug("privacy-policy");

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: "/privacy-policy" },
  };
}

export default function PrivacyPolicyPage() {
  return <Privacy />;
}
