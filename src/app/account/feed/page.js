import Feed from "@/components/pages/account/Feed";

export const metadata = {
  title: "My news feed",
  robots: { index: false },
};

export default function FeedPage() {
  return <Feed />;
}
