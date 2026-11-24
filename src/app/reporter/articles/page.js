import MyArticles from "@/components/pages/reporter/MyArticles";

export const metadata = {
  title: "My articles",
  robots: { index: false },
};

export default function MyArticlesPage({ searchParams }) {
  return <MyArticles searchParams={searchParams} />;
}
