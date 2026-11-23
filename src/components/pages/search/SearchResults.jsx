import SearchForm from "@/components/pages/search/SearchForm";
import SearchResultList from "@/components/pages/search/SearchResultList";
import { hasSearchFilters, readSearchFilters, searchNews } from "@/lib/searchData";

export default async function SearchResults({ searchParams, categoryOptions, authorOptions }) {
  const filters = readSearchFilters(await searchParams);
  const showResults = hasSearchFilters(filters);
  const articles = showResults ? await searchNews(filters) : [];

  return (
    <>
      <SearchForm filters={filters} categoryOptions={categoryOptions} authorOptions={authorOptions} />
      {showResults ? (
        <SearchResultList filters={filters} articles={articles} />
      ) : (
        <p className="mt-6 text-muted">Type a word or choose a filter to search the news.</p>
      )}
    </>
  );
}
