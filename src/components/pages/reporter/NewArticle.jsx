import NewArticleForm from "@/components/pages/reporter/NewArticleForm";
import ReporterShell from "@/components/pages/reporter/ReporterShell";

export default function NewArticle() {
  return (
    <ReporterShell title="Write an article" href="/reporter/articles/new">
      <NewArticleForm />
    </ReporterShell>
  );
}
