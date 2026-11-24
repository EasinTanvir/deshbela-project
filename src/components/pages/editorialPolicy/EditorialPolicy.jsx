import InfoPageLayout from "@/components/common/InfoPageLayout";
import { getPageBySlug } from "@/lib/pageData";

export default async function EditorialPolicy() {
  const page = await getPageBySlug("editorial-policy");

  return <InfoPageLayout page={page} href="/editorial-policy" showUpdated />;
}
