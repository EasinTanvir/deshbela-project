import AccountShell from "@/components/pages/account/AccountShell";
import MembershipDetails from "@/components/pages/account/MembershipDetails";

export default function MyMembership() {
  return (
    <AccountShell title="My membership" href="/account/membership">
      <MembershipDetails />
    </AccountShell>
  );
}
