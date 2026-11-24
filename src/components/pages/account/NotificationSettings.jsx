import SectionTitle from "@/components/common/SectionTitle";
import NewsletterSettings from "@/components/pages/account/NewsletterSettings";
import PushAlertSettings from "@/components/pages/account/PushAlertSettings";
import { getNotificationSettings } from "@/lib/accountData";
import { requireUser } from "@/lib/currentUser";

export default async function NotificationSettings() {
  const user = await requireUser();
  const settings = await getNotificationSettings(user);

  return (
    <div className="max-w-2xl space-y-10">
      <section>
        <SectionTitle title="Email" />
        <NewsletterSettings email={user.email} isSubscribed={settings.newsletter} />
      </section>
      <section>
        <SectionTitle title="This device" />
        <PushAlertSettings deviceCount={settings.pushDevices} />
      </section>
    </div>
  );
}
