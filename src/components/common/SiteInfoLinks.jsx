import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";

export default function SiteInfoLinks({ links, activeHref }) {
  return (
    <nav aria-label="About DESHBELA">
      <SectionTitle title="About DESHBELA" />
      <ul className="divide-y divide-line">
        {links.map((link) => (
          <li key={link.href} className="py-2 first:pt-0">
            <Link
              href={link.href}
              aria-current={link.href === activeHref ? "page" : undefined}
              className={
                link.href === activeHref
                  ? "font-semibold text-brand"
                  : "text-ink hover:text-brand hover:underline"
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
