import CurrentPlan from "@/components/pages/account/CurrentPlan";
import PaymentHistory from "@/components/pages/account/PaymentHistory";
import { getMembershipSummary } from "@/lib/accountData";
import { requireUser } from "@/lib/currentUser";

export default async function MembershipDetails() {
  const user = await requireUser();
  const summary = await getMembershipSummary(user.id);

  return (
    <div className="space-y-10">
      <CurrentPlan current={summary.current} last={summary.last} />
      <PaymentHistory payments={summary.payments} />
    </div>
  );
}
