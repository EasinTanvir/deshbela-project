import { Suspense } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import SideMenu from "@/components/common/SideMenu";

const accountLinks = [
  { label: "My profile", href: "/account" },
  { label: "Saved news", href: "/account/bookmarks" },
  { label: "My news feed", href: "/account/feed" },
  { label: "Notifications", href: "/account/notifications" },
  { label: "My membership", href: "/account/membership" },
];

export default function AccountShell({ title, href, children }) {
  const breadcrumbItems = [{ label: "My account", href: "/account" }];
  if (href !== "/account") breadcrumbItems.push({ label: title, href });

  return (
    <Container className="mt-6">
      <Breadcrumb items={breadcrumbItems} />
      <header className="mt-4 border-b-2 border-ink pb-3">
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink">{title}</h1>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0">
        <aside className="lg:col-span-3 lg:border-r lg:border-line lg:pr-8">
          <SideMenu label="My account" links={accountLinks} activeHref={href} />
        </aside>
        <div className="min-w-0 lg:col-span-9 lg:pl-8">
          <Suspense fallback={<p className="text-muted">Loading your account...</p>}>{children}</Suspense>
        </div>
      </div>
    </Container>
  );
}
