import { notFound } from "next/navigation";
import { deleteDraft, saveArticleChanges } from "@/actions/articleActions";
import ArticleForm from "@/components/pages/reporter/ArticleForm";
import ArticlePreview from "@/components/pages/reporter/ArticlePreview";
import EditorFeedback from "@/components/pages/reporter/EditorFeedback";
import StatusLabel from "@/components/pages/reporter/StatusLabel";
import { canReporterEdit } from "@/lib/articleStatus";
import { requireReporter } from "@/lib/currentUser";
import { formatDay } from "@/lib/formatDate";
import { getArticleFormOptions, getReporterArticle } from "@/lib/reporterData";

export default async function ArticleEditor({ params }) {
  const user = await requireReporter();
  const { id } = await params;
  const article = await getReporterArticle(user.id, id);
  if (!article) notFound();

  const isEditable = canReporterEdit(article.status);
  const options = isEditable ? await getArticleFormOptions(user.id) : null;
  const lastChanged = article.updatedAt || article.publishedAt;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
        <StatusLabel status={article.status} />
        {lastChanged && (
          <span>
            Last changed on <time dateTime={lastChanged}>{formatDay(lastChanged)}</time>
          </span>
        )}
      </div>

      <EditorFeedback reviews={article.reviews} />

      {isEditable ? (
        <section className="max-w-3xl">
          <ArticleForm
            action={saveArticleChanges}
            articleId={article.id}
            options={options}
            draftLabel="Save changes"
            initialValues={{
              title: article.title,
              slug: article.slug,
              categoryId: article.categoryId || "",
              summary: article.metaDescription,
              body: article.body,
              metaTitle: article.metaTitle === article.title ? "" : article.metaTitle || "",
              photoId: article.featuredImageId || "",
              tagIds: article.tagIds,
            }}
          />

          {article.status === "DRAFT" && (
            <form action={deleteDraft} className="mt-8 border-t border-line pt-5">
              <input type="hidden" name="articleId" value={article.id} />
              <p className="mb-2 text-sm text-muted">Don&apos;t need this draft any more?</p>
              <button type="submit" className="text-sm font-semibold text-brand hover:underline">
                Delete this draft
              </button>
            </form>
          )}
        </section>
      ) : (
        <ArticlePreview article={article} />
      )}
    </div>
  );
}
