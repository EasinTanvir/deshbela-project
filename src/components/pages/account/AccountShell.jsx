import { Suspense } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import AccountMenu from "@/components/pages/account/AccountMenu";

export default function AccountShell({ title, href, children }) {
  const breadcrumbItems = [{ label: "My account", href: "/account" }];
  if (href !== "/account") breadcrumbItems.push({ label: title, href });

  return (
    <Container className="mt-6">
      <Breadcrumb items={breadcrumbItems} />
      <header className="mt-4 border-b-2 border-ink pb-3">
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink">{title}</h1>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-0">
        <aside className="lg:col-span-3 lg:border-r lg:border-line lg:pr-8">
          <AccountMenu activeHref={href} />
        </aside>
        <div className="min-w-0 lg:col-span-9 lg:pl-8">
          <Suspense fallback={<p className="text-muted">Loading your account...</p>}>{children}</Suspense>
        </div>
      </div>
    </Container>
  );
}
