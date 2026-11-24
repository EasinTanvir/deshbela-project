import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import ArticleTable from "@/components/pages/reporter/ArticleTable";
import NeedsAttention from "@/components/pages/reporter/NeedsAttention";
import StatusCounts from "@/components/pages/reporter/StatusCounts";
import { requireReporter } from "@/lib/currentUser";
import { getRejectedWithFeedback, getReporterArticles, getStatusCounts } from "@/lib/reporterData";

export default async function DashboardSummary() {
  const user = await requireReporter();
  const [counts, rejected, articles] = await Promise.all([
    getStatusCounts(user.id),
    getRejectedWithFeedback(user.id),
    getReporterArticles(user.id),
  ]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg text-ink">
          Welcome back, <span className="font-semibold">{user.name.split(" ")[0]}</span>.
        </p>
        <Link
          href="/reporter/articles/new"
          className="self-start bg-brand px-5 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
        >
          Write an article
        </Link>
      </div>

      <section>
        <SectionTitle title="My articles at a glance" />
        <StatusCounts counts={counts} />
      </section>

      <NeedsAttention articles={rejected} />

      <section>
        <SectionTitle title="Recent articles" href="/reporter/articles" />
        {articles.length === 0 ? (
          <p className="text-muted">You have not written any articles yet.</p>
        ) : (
          <ArticleTable articles={articles.slice(0, 5)} />
        )}
      </section>
    </div>
  );
}
