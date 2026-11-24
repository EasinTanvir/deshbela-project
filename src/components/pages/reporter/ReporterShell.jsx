import { Suspense } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import SideMenu from "@/components/common/SideMenu";

const reporterLinks = [
  { label: "Dashboard", href: "/reporter" },
  { label: "My articles", href: "/reporter/articles" },
  { label: "Write an article", href: "/reporter/articles/new" },
  { label: "My media", href: "/reporter/media" },
  { label: "My profile", href: "/reporter/profile" },
  { label: "Performance", href: "/reporter/performance" },
];

export default function ReporterShell({ title, href, menuHref = href, parent, children }) {
  const breadcrumbItems = [{ label: "Reporter desk", href: "/reporter" }];
  if (parent) breadcrumbItems.push(parent);
  if (href && href !== "/reporter") breadcrumbItems.push({ label: title, href });

  return (
    <Container className="mt-6">
      <Breadcrumb items={breadcrumbItems} />
      <header className="mt-4 border-b-2 border-ink pb-3">
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink">{title}</h1>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0">
        <aside className="lg:col-span-3 lg:border-r lg:border-line lg:pr-8">
          <SideMenu label="Reporter desk" links={reporterLinks} activeHref={menuHref} />
        </aside>
        <div className="min-w-0 lg:col-span-9 lg:pl-8">
          <Suspense fallback={<p className="text-muted">Loading...</p>}>{children}</Suspense>
        </div>
      </div>
    </Container>
  );
}
