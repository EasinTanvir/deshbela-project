import NewsCard from "@/components/common/NewsCard";
import SectionTitle from "@/components/common/SectionTitle";
import FavouriteSections from "@/components/pages/account/FavouriteSections";
import {
  getFavouriteCategoryIds,
  getFeedNews,
  getMainCategoryOptions,
} from "@/lib/accountData";
import { requireUser } from "@/lib/currentUser";

export default async function FeedNews() {
  const user = await requireUser();
  const [categories, favouriteIds] = await Promise.all([
    getMainCategoryOptions(),
    getFavouriteCategoryIds(user.id),
  ]);

  const hasFavourites = favouriteIds.length > 0;
  const feedIds = hasFavourites ? favouriteIds : categories.map((category) => category.id);
  const news = await getFeedNews(feedIds);
  const favouriteNames = categories
    .filter((category) => favouriteIds.includes(category.id))
    .map((category) => category.name)
    .join(", ");

  return (
    <div className="space-y-8">
      <FavouriteSections categories={categories} selectedIds={favouriteIds} />

      <section>
        <SectionTitle title={hasFavourites ? "Picked for you" : "Latest news"} />
        <p className="-mt-2 mb-4 text-sm text-muted">
          {hasFavourites
            ? `News from ${favouriteNames}.`
            : "Choose some sections above to make this feed your own."}
        </p>
        {news.length === 0 ? (
          <p className="text-muted">There is no news in these sections yet.</p>
        ) : (
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {news.map((article) => (
              <li key={article.id} className="border-b border-line py-4">
                <NewsCard article={article} variant="horizontal" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
