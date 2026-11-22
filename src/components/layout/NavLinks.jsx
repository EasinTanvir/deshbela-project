import Link from "next/link";

export default function NavLinks({ categories, extraLinks, activePath = "" }) {
  const linkClass = (href) =>
    `block px-3 py-2.5 hover:text-brand ${activePath === href ? "text-brand" : "text-ink"}`;

  return (
    <ul className="flex items-center justify-center text-[13px] font-semibold uppercase tracking-wide">
      <li>
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <Link href={`/category/${category.slug}`} className={linkClass(`/category/${category.slug}`)}>
            {category.name}
          </Link>
        </li>
      ))}
      {extraLinks.map((link) => (
        <li key={link.href} className="border-l border-line">
          <Link href={link.href} className={linkClass(link.href)}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
