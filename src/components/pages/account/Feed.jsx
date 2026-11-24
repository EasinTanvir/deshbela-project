import AccountShell from "@/components/pages/account/AccountShell";
import FeedNews from "@/components/pages/account/FeedNews";

export default function Feed() {
  return (
    <AccountShell title="My news feed" href="/account/feed">
      <FeedNews />
    </AccountShell>
  );
}
