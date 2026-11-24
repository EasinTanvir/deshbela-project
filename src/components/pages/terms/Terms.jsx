import InfoPageLayout from "@/components/common/InfoPageLayout";
import { getPageBySlug } from "@/lib/pageData";

export default async function Terms() {
  const page = await getPageBySlug("terms");

  return <InfoPageLayout page={page} href="/terms" showUpdated />;
}
