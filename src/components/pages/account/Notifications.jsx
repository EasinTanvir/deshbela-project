import AccountShell from "@/components/pages/account/AccountShell";
import NotificationSettings from "@/components/pages/account/NotificationSettings";

export default function Notifications() {
  return (
    <AccountShell title="Notifications" href="/account/notifications">
      <NotificationSettings />
    </AccountShell>
  );
}
