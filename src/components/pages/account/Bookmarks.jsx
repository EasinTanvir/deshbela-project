import AccountShell from "@/components/pages/account/AccountShell";
import SavedNewsList from "@/components/pages/account/SavedNewsList";

export default function Bookmarks() {
  return (
    <AccountShell title="Saved news" href="/account/bookmarks">
      <SavedNewsList />
    </AccountShell>
  );
}
