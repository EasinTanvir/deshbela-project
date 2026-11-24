import Link from "next/link";
import ArticleTable from "@/components/pages/reporter/ArticleTable";
import StatusFilter from "@/components/pages/reporter/StatusFilter";
import { statusFromSlug } from "@/lib/articleStatus";
import { requireReporter } from "@/lib/currentUser";
import { getReporterArticles, getStatusCounts } from "@/lib/reporterData";

const notices = {
  draft: "Your draft has been saved.",
  submitted: "Your article has been sent to the editor for review.",
  deleted: "The draft has been deleted.",
};

export default async function ArticleList({ searchParams }) {
  const user = await requireReporter();
  const params = await searchParams;
  const activeStatus = statusFromSlug(params.status);
  const notice = notices[params.saved];

  const [articles, counts] = await Promise.all([getReporterArticles(user.id), getStatusCounts(user.id)]);
  const shown = activeStatus ? articles.filter((article) => article.status === activeStatus) : articles;

  return (
    <div className="space-y-6">
      {notice && (
        <p role="status" className="border border-line bg-surface px-3 py-2 text-sm text-ink">
          {notice}
        </p>
      )}

      <StatusFilter counts={counts} activeSlug={activeStatus ? params.status : null} total={articles.length} />

      {shown.length === 0 ? (
        <div className="border-y border-line py-10 text-center">
          <p className="font-serif text-xl font-semibold text-ink">No articles here</p>
          <Link href="/reporter/articles/new" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
            Write an article
          </Link>
        </div>
      ) : (
        <ArticleTable articles={shown} />
      )}
    </div>
  );
}
