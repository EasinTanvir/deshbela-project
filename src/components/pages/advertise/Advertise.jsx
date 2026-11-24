import InfoPageLayout from "@/components/common/InfoPageLayout";
import SectionTitle from "@/components/common/SectionTitle";
import AdOptions from "@/components/pages/advertise/AdOptions";
import AdvertiseForm from "@/components/pages/advertise/AdvertiseForm";
import { getAdPlacements } from "@/lib/advertiseData";
import { getPageBySlug } from "@/lib/pageData";

export default async function Advertise() {
  const [page, placements] = await Promise.all([getPageBySlug("advertise"), getAdPlacements()]);

  return (
    <InfoPageLayout page={page} href="/advertise">
      <AdOptions placements={placements} />
      <section className="mt-10 max-w-2xl">
        <SectionTitle title="Send us an inquiry" />
        <AdvertiseForm />
      </section>
    </InfoPageLayout>
  );
}
