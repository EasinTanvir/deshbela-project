import Link from "next/link";

const links = [
  { label: "My profile", href: "/account" },
  { label: "Saved news", href: "/account/bookmarks" },
  { label: "My news feed", href: "/account/feed" },
  { label: "Notifications", href: "/account/notifications" },
  { label: "My membership", href: "/account/membership" },
];

export default function AccountMenu({ activeHref }) {
  return (
    <nav aria-label="My account">
      <ul className="flex gap-1 overflow-x-auto border-b border-line lg:block lg:border-0">
        {links.map((link) => {
          const isActive = link.href === activeHref;

          return (
            <li key={link.href} className="shrink-0 lg:border-b lg:border-line">
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`block whitespace-nowrap px-3 py-2.5 text-sm lg:px-0 ${
                  isActive
                    ? "border-b-2 border-brand font-semibold text-brand lg:border-0"
                    : "text-ink hover:text-brand hover:underline"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
