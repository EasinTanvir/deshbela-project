import membershipPlans from "@/data/membershipPlans";

const PAYMENT_STATUSES = ["success", "failed", "cancelled"];

function withMonthlyPrice(plan) {
  const months = Math.round(plan.durationDays / 30);
  return { ...plan, months, pricePerMonth: Math.round(plan.price / months) };
}

export async function getMembershipPlans() {
  return membershipPlans.map(withMonthlyPrice);
}

export async function getBestValuePlanId() {
  const plans = membershipPlans.map(withMonthlyPrice);
  const cheapest = plans.reduce((best, plan) => (plan.pricePerMonth < best.pricePerMonth ? plan : best));
  return cheapest.id;
}

export async function readPaymentResult(searchParams) {
  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : "";
  const planId = typeof params.plan === "string" ? params.plan : "";

  const plan = membershipPlans.find((item) => item.id === planId) || null;

  return {
    status: PAYMENT_STATUSES.includes(status) ? status : "unknown",
    plan: plan ? withMonthlyPrice(plan) : null,
  };
}
