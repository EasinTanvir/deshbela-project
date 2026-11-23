import Breadcrumb from "@/components/common/Breadcrumb";
import ContactDetails from "@/components/common/ContactDetails";
import Container from "@/components/common/Container";
import PageBody from "@/components/common/PageBody";
import SiteInfoLinks from "@/components/common/SiteInfoLinks";
import Newsroom from "@/components/pages/about/Newsroom";
import { getAllAuthors } from "@/lib/authorData";
import { getPageBySlug } from "@/lib/pageData";
import { getSiteConfig } from "@/lib/siteData";

export default async function About() {
  const [page, authors] = await Promise.all([getPageBySlug("about"), getAllAuthors()]);
  const site = getSiteConfig();

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: page.title, href: "/about" }]} />
      <header className="mt-4 border-b-2 border-ink pb-3">
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">{page.title}</h1>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="min-w-0 lg:col-span-8 lg:pr-8">
          <PageBody blocks={page.blocks} />
          <Newsroom authors={authors} />
        </div>

        <aside className="space-y-10 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <SiteInfoLinks links={site.footerLinks} activeHref="/about" />
          <ContactDetails contact={site.contact} />
        </aside>
      </div>
    </Container>
  );
}
