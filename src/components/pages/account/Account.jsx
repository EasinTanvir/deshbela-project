import AccountShell from "@/components/pages/account/AccountShell";
import ProfileDetails from "@/components/pages/account/ProfileDetails";

export default function Account() {
  return (
    <AccountShell title="My profile" href="/account">
      <ProfileDetails />
    </AccountShell>
  );
}
