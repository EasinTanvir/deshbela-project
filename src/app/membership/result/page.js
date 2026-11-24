import MembershipResult from "@/components/pages/membershipResult/MembershipResult";

export const metadata = {
  title: "Membership Payment Result",
  robots: { index: false },
};

export default function MembershipResultPage({ searchParams }) {
  return <MembershipResult searchParams={searchParams} />;
}
