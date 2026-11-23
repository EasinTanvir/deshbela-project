import Form from "next/form";
import Link from "next/link";

const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted";
const fieldClass = "h-10 w-full border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-ink";

export default function SearchForm({ filters, categoryOptions, authorOptions }) {
  return (
    <Form action="/search" key={JSON.stringify(filters)} className="border-b border-line pb-6">
      <label htmlFor="search-q" className={labelClass}>
        Keyword
      </label>
      <div className="flex">
        <input
          id="search-q"
          type="search"
          name="q"
          defaultValue={filters.q}
          placeholder="Search news"
          className="h-11 w-full min-w-0 border border-r-0 border-line bg-paper px-3 text-base text-ink outline-none focus:border-ink"
        />
        <button
          type="submit"
          className="h-11 shrink-0 bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-dark"
        >
          Search
        </button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="search-category" className={labelClass}>
            Category
          </label>
          <select id="search-category" name="category" defaultValue={filters.category} className={fieldClass}>
            <option value="">All categories</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-author" className={labelClass}>
            Author
          </label>
          <select id="search-author" name="author" defaultValue={filters.author} className={fieldClass}>
            <option value="">All authors</option>
            {authorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-from" className={labelClass}>
            From
          </label>
          <input id="search-from" type="date" name="from" defaultValue={filters.from} className={fieldClass} />
        </div>

        <div>
          <label htmlFor="search-to" className={labelClass}>
            To
          </label>
          <input id="search-to" type="date" name="to" defaultValue={filters.to} className={fieldClass} />
        </div>
      </div>

      <Link href="/search" className="mt-3 inline-block text-sm text-muted hover:text-brand hover:underline">
        Clear filters
      </Link>
    </Form>
  );
}
