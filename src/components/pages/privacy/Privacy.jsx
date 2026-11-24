import InfoPageLayout from "@/components/common/InfoPageLayout";
import { getPageBySlug } from "@/lib/pageData";

export default async function Privacy() {
  const page = await getPageBySlug("privacy-policy");

  return <InfoPageLayout page={page} href="/privacy-policy" showUpdated />;
}
