import { Suspense } from "react";
import AdSlot from "@/components/common/AdSlot";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import TagList from "@/components/common/TagList";
import SearchForm from "@/components/pages/search/SearchForm";
import SearchResults from "@/components/pages/search/SearchResults";
import { getSearchOptions } from "@/lib/searchData";
import { getPopularTags } from "@/lib/tagData";

const emptyFilters = { q: "", category: "", author: "", from: "", to: "" };

export default async function Search({ searchParams }) {
  const [{ categoryOptions, authorOptions }, popularTags] = await Promise.all([getSearchOptions(), getPopularTags()]);

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: "Search", href: "/search" }]} />
      <header className="mt-4 border-b-2 border-ink pb-3">
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">Search</h1>
      </header>

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="min-w-0 lg:col-span-8 lg:pr-8">
          <Suspense
            fallback={
              <SearchForm filters={emptyFilters} categoryOptions={categoryOptions} authorOptions={authorOptions} />
            }
          >
            <SearchResults
              searchParams={searchParams}
              categoryOptions={categoryOptions}
              authorOptions={authorOptions}
            />
          </Suspense>
        </div>

        <aside className="space-y-10 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <TagList title="Popular Topics" tags={popularTags} />
          <div className="flex justify-center">
            <AdSlot size="rectangle" />
          </div>
        </aside>
      </div>
    </Container>
  );
}
