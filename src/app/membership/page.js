import Membership from "@/components/pages/membership/Membership";

export const metadata = {
  title: "Membership",
  description: "Become a DESHBELA member and read members-only stories. Monthly, six-month and yearly plans.",
  alternates: { canonical: "/membership" },
};

export default function MembershipPage() {
  return <Membership />;
}
