import ArticleList from "@/components/pages/reporter/ArticleList";
import ReporterShell from "@/components/pages/reporter/ReporterShell";

export default function MyArticles({ searchParams }) {
  return (
    <ReporterShell title="My articles" href="/reporter/articles">
      <ArticleList searchParams={searchParams} />
    </ReporterShell>
  );
}
