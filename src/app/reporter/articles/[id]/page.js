import EditArticle from "@/components/pages/reporter/EditArticle";
import { getAllArticleIds } from "@/lib/reporterData";

export const metadata = {
  title: "My article",
  robots: { index: false },
};

export async function generateStaticParams() {
  return getAllArticleIds();
}

export default function EditArticlePage({ params }) {
  return <EditArticle params={params} />;
}
