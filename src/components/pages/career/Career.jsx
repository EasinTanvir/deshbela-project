import InfoPageLayout from "@/components/common/InfoPageLayout";
import HowToApply from "@/components/pages/career/HowToApply";
import { getPageBySlug } from "@/lib/pageData";
import { getSiteConfig } from "@/lib/siteData";

export default async function Career() {
  const page = await getPageBySlug("career");
  const site = getSiteConfig();

  return (
    <InfoPageLayout page={page} href="/career">
      <HowToApply email={site.contact.careersEmail} />
    </InfoPageLayout>
  );
}
