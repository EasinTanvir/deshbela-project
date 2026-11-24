import Bookmarks from "@/components/pages/account/Bookmarks";

export const metadata = {
  title: "Saved news",
  robots: { index: false },
};

export default function BookmarksPage() {
  return <Bookmarks />;
}
