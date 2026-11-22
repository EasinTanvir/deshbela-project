"use client";

import { usePathname } from "next/navigation";
import NavLinks from "@/components/layout/NavLinks";

export default function ActiveNavLinks({ categories, extraLinks }) {
  const pathname = usePathname();

  return <NavLinks categories={categories} extraLinks={extraLinks} activePath={pathname} />;
}
