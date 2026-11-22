"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({ categories, extraLinks }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span className="h-0.5 w-6 bg-ink" />
        <span className="h-0.5 w-6 bg-ink" />
        <span className="h-0.5 w-6 bg-ink" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Close menu" onClick={close} className="absolute inset-0 h-full w-full bg-ink/40" />

          <nav
            id="mobile-menu"
            aria-label="Mobile menu"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-line bg-paper"
          >
            <div className="flex items-center justify-between border-b-2 border-ink px-4 py-3">
              <span className="font-serif text-2xl font-bold text-ink">DESHBELA</span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center text-3xl leading-none text-ink"
              >
                &times;
              </button>
            </div>

            <ul className="divide-y divide-line text-base">
              <li>
                <Link href="/" onClick={close} className="block px-4 py-3 font-semibold text-brand">
                  Home
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`} onClick={close} className="block px-4 py-3 text-ink hover:text-brand">
                    {category.name}
                  </Link>
                </li>
              ))}
              {extraLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={close} className="block px-4 py-3 text-ink hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
