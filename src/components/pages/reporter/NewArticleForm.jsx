import { saveNewArticle } from "@/actions/articleActions";
import ArticleForm from "@/components/pages/reporter/ArticleForm";
import { requireReporter } from "@/lib/currentUser";
import { getArticleFormOptions } from "@/lib/reporterData";

const emptyArticle = {
  title: "",
  slug: "",
  categoryId: "",
  summary: "",
  body: "",
  metaTitle: "",
  photoId: "",
  tagIds: [],
};

export default async function NewArticleForm() {
  const user = await requireReporter();
  const options = await getArticleFormOptions(user.id);

  return (
    <div className="max-w-3xl">
      <p className="mb-6 text-sm text-muted">
        Save the article as a draft while you work on it. When it is ready, send it for review. An editor will
        check it before it is published.
      </p>
      <ArticleForm action={saveNewArticle} initialValues={emptyArticle} options={options} />
    </div>
  );
}
