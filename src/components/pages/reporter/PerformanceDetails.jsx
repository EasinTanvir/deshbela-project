import SectionTitle from "@/components/common/SectionTitle";
import PerformanceTotals from "@/components/pages/reporter/PerformanceTotals";
import SectionViewsTable from "@/components/pages/reporter/SectionViewsTable";
import TopStoriesTable from "@/components/pages/reporter/TopStoriesTable";
import { requireReporter } from "@/lib/currentUser";
import { getPerformance } from "@/lib/reporterData";

export default async function PerformanceDetails() {
  const user = await requireReporter();
  const performance = await getPerformance(user.id);

  return (
    <div className="space-y-10">
      <section>
        <SectionTitle title="Overview" />
        <PerformanceTotals performance={performance} />
        <p className="mt-2 text-xs text-muted">
          Views are counted each time a reader opens a story. The approval rate counts every editor decision on
          your articles.
        </p>
      </section>

      <section>
        <SectionTitle title="My stories by views" />
        <TopStoriesTable articles={performance.topArticles} totalViews={performance.totalViews} />
      </section>

      <section>
        <SectionTitle title="Views by section" />
        <SectionViewsTable sections={performance.sections} />
      </section>
    </div>
  );
}
