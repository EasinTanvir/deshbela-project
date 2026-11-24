import Link from "next/link";
import { removeSavedNews } from "@/actions/bookmarkActions";
import NewsCard from "@/components/common/NewsCard";
import { requireUser } from "@/lib/currentUser";
import { getBookmarkedNews } from "@/lib/accountData";
import { formatDay } from "@/lib/formatDate";

export default async function SavedNewsList() {
  const user = await requireUser();
  const savedNews = await getBookmarkedNews(user.id);

  if (savedNews.length === 0) {
    return (
      <div className="border-y border-line py-10 text-center">
        <p className="font-serif text-xl font-semibold text-ink">You have not saved any news yet</p>
        <p className="mt-2 text-muted">Press the Save button on any story to read it later from here.</p>
        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
          Go to the front page
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        {savedNews.length} saved {savedNews.length === 1 ? "story" : "stories"}
      </p>
      <ul className="divide-y divide-line border-y border-line">
        {savedNews.map((article) => (
          <li key={article.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <NewsCard article={article} variant="horizontal" />
              <p className="mt-2 text-xs text-muted">
                Saved on <time dateTime={article.savedAt}>{formatDay(article.savedAt)}</time>
              </p>
            </div>
            <form action={removeSavedNews} className="shrink-0">
              <input type="hidden" name="articleId" value={article.id} />
              <button
                type="submit"
                aria-label={`Remove "${article.title}" from saved news`}
                className="border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink"
              >
                Remove
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
