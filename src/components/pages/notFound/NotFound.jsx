import Form from "next/form";
import Link from "next/link";
import Container from "@/components/common/Container";
import NewsCard from "@/components/common/NewsCard";
import SectionTitle from "@/components/common/SectionTitle";
import { getLatestForNotFound } from "@/lib/notFoundData";
import { getMainCategories } from "@/lib/siteData";

export default async function NotFound() {
  const categories = getMainCategories();
  const latest = await getLatestForNotFound();

  return (
    <Container className="mt-10">
      <section className="mx-auto max-w-2xl pb-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Error 404</p>
        <h1 className="mt-2 font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">Page not found</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          The page you are looking for may have been moved or removed, or the link may be wrong. Try searching
          for the news, or go back to the front page.
        </p>

        <Form action="/search" className="mx-auto mt-6 flex max-w-md">
          <label htmlFor="not-found-search" className="sr-only">
            Search news
          </label>
          <input
            id="not-found-search"
            type="search"
            name="q"
            placeholder="Search news"
            className="h-11 w-full min-w-0 border border-r-0 border-line bg-paper px-3 text-base text-ink outline-none focus:border-ink"
          />
          <button
            type="submit"
            className="h-11 shrink-0 bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-dark"
          >
            Search
          </button>
        </Form>

        <nav aria-label="Sections" className="mt-6">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold">
            <li>
              <Link href="/" className="text-brand hover:underline">
                Front page
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/category/${category.slug}`} className="text-ink hover:text-brand hover:underline">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section aria-label="Latest news" className="mt-10">
        <SectionTitle title="Latest News" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
          {latest.map((article) => (
            <li key={article.id} className="lg:px-5 lg:first:pl-0 lg:last:pr-0">
              <NewsCard article={article} />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
