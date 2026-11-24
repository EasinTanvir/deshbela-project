import Link from "next/link";
import { Suspense } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import Container from "@/components/common/Container";
import PaymentResult from "@/components/pages/membershipResult/PaymentResult";

export default function MembershipResult({ searchParams }) {
  return (
    <Container className="mt-6">
      <Breadcrumb
        items={[
          { label: "Membership", href: "/membership" },
          { label: "Payment result", href: "/membership/result" },
        ]}
      />
      <div className="mx-auto mt-6 max-w-2xl">
        <h1 className="sr-only">Membership payment result</h1>
        <Suspense fallback={<p className="border-y border-line py-10 text-center text-muted">Checking your payment...</p>}>
          <PaymentResult searchParams={searchParams} />
        </Suspense>
        <p className="mt-6 text-center text-sm text-muted">
          Need help with a payment?{" "}
          <Link href="/contact" className="font-semibold text-ink hover:text-brand hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
