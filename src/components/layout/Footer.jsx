import Link from "next/link";
import Container from "@/components/common/Container";
import TodayDate from "@/components/common/TodayDate";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { getMainCategories, getSiteConfig } from "@/lib/siteData";

export default function Footer() {
  const site = getSiteConfig();
  const categories = getMainCategories();

  return (
    <footer className="mt-14 border-t-4 border-ink bg-surface text-sm text-muted">
      <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="font-serif text-3xl font-bold text-ink">
            {site.name}
          </Link>
          <p className="mt-3 leading-relaxed">{site.description}</p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {site.socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="font-semibold text-ink hover:text-brand hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-serif text-lg font-bold text-ink">Sections</h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/category/${category.slug}`} className="hover:text-ink hover:underline">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-serif text-lg font-bold text-ink">About</h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {site.footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-serif text-lg font-bold text-ink">Newsletter</h2>
          <p className="mb-3">Get the morning headlines in your inbox.</p>
          <NewsletterForm />
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-1 py-4 text-xs sm:flex-row">
          <p>
            &copy; <TodayDate format="year" /> {site.name}. All rights reserved.
          </p>
          <p>A Real Capita Group publication</p>
        </Container>
      </div>
    </footer>
  );
}
