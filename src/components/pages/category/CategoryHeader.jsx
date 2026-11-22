import Link from "next/link";

export default function CategoryHeader({ category }) {
  const { mainCategory, subCategories } = category;
  const sectionLinks = [mainCategory, ...subCategories];

  return (
    <header className="mt-4 border-b-2 border-ink pb-3">
      <h1 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">{category.name}</h1>

      {subCategories.length > 0 && (
        <nav aria-label={`${mainCategory.name} sections`} className="mt-3">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {sectionLinks.map((item) => {
              const isActive = item.id === category.id;
              const label = item.id === mainCategory.id ? `All ${mainCategory.name}` : item.name;

              return (
                <li key={item.id}>
                  <Link
                    href={`/category/${item.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "text-brand underline decoration-2 underline-offset-4"
                        : "text-ink hover:text-brand hover:underline"
                    }
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
