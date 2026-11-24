import ArticleEditor from "@/components/pages/reporter/ArticleEditor";
import ReporterShell from "@/components/pages/reporter/ReporterShell";

export default function EditArticle({ params }) {
  return (
    <ReporterShell
      title="My article"
      menuHref="/reporter/articles"
      parent={{ label: "My articles", href: "/reporter/articles" }}
    >
      <ArticleEditor params={params} />
    </ReporterShell>
  );
}
