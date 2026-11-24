import EditorialPolicy from "@/components/pages/editorialPolicy/EditorialPolicy";
import { getPageBySlug } from "@/lib/pageData";

export async function generateMetadata() {
  const page = await getPageBySlug("editorial-policy");

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: "/editorial-policy" },
  };
}

export default function EditorialPolicyPage() {
  return <EditorialPolicy />;
}
