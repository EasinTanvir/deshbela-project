import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import MembershipBenefits from "@/components/pages/membership/MembershipBenefits";
import MembershipQuestions from "@/components/pages/membership/MembershipQuestions";
import PlanCard from "@/components/pages/membership/PlanCard";
import { getBestValuePlanId, getMembershipPlans } from "@/lib/membershipData";

export default async function Membership() {
  const [plans, bestValueId] = await Promise.all([getMembershipPlans(), getBestValuePlanId()]);

  return (
    <Container className="mt-6">
      <Breadcrumb items={[{ label: "Membership", href: "/membership" }]} />
      <header className="mt-4 border-b-2 border-ink pb-4 text-center">
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">Become a member</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted">
          Support independent journalism and get full access to DESHBELA, including members-only stories.
        </p>
      </header>

      <section aria-label="Membership plans" className="mx-auto mt-8 max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isBestValue={plan.id === bestValueId} />
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-muted">
          You need a free DESHBELA account to become a member.
        </p>
      </section>

      <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-2">
        <MembershipBenefits />
        <MembershipQuestions />
      </div>
    </Container>
  );
}
