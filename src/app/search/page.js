import Search from "@/components/pages/search/Search";

export const metadata = {
  title: "Search",
  description: "Search DESHBELA news by keyword, category, author and date.",
  alternates: { canonical: "/search" },
};

export default function SearchPage({ searchParams }) {
  return <Search searchParams={searchParams} />;
}
