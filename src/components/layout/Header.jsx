import Link from "next/link";
import { Suspense } from "react";
import Container from "@/components/common/Container";
import TodayDate from "@/components/common/TodayDate";
import ActiveNavLinks from "@/components/layout/ActiveNavLinks";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLinks from "@/components/layout/NavLinks";
import { getMainCategories, getSiteConfig } from "@/lib/siteData";

export default function Header() {
  const site = getSiteConfig();
  const categories = getMainCategories();

  return (
    <>
      <header className="bg-paper">
        <div className="border-b border-line text-xs text-muted">
          <Container className="flex h-8 items-center justify-between">
            <TodayDate />
            <Link href="/login" className="font-semibold text-ink hover:underline">
              Log in
            </Link>
          </Container>
        </div>

        <Container className="relative flex items-center justify-between py-4 lg:justify-center lg:py-6">
          <Link href="/" className="lg:text-center">
            <span className="block font-serif text-4xl font-bold leading-none tracking-tight text-ink md:text-5xl lg:text-6xl">
              {site.name}
            </span>
            <span className="mt-1 hidden font-serif text-sm italic text-muted sm:block">{site.tagline}</span>
          </Link>

          <div className="flex items-center gap-1 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2">
            <Link
              href="/search"
              aria-label="Search news"
              className="flex h-10 items-center gap-2 px-2 text-sm font-semibold text-ink hover:text-brand"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" strokeLinecap="round" />
              </svg>
              <span className="hidden lg:inline">Search</span>
            </Link>
            <MobileMenu categories={categories} extraLinks={site.extraNavLinks} />
          </div>
        </Container>
      </header>

      <nav aria-label="Main menu" className="sticky top-0 z-40 hidden border-y border-ink bg-paper lg:block">
        <Container>
          <Suspense fallback={<NavLinks categories={categories} extraLinks={site.extraNavLinks} />}>
            <ActiveNavLinks categories={categories} extraLinks={site.extraNavLinks} />
          </Suspense>
        </Container>
      </nav>
    </>
  );
}
