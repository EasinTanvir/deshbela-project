import SectionTitle from "@/components/common/SectionTitle";
import formatDate from "@/lib/formatDate";

const statusLabels = {
  PAID: "Paid",
  FAILED: "Failed",
  PENDING: "Pending",
  REFUNDED: "Refunded",
};

export default function PaymentHistory({ payments }) {
  return (
    <section>
      <SectionTitle title="Payment history" />
      {payments.length === 0 ? (
        <p className="text-muted">You have not made any payments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink text-xs uppercase tracking-wider text-muted">
                <th scope="col" className="py-2 pr-4 font-semibold">Date</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Plan</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Amount</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Payment number</th>
                <th scope="col" className="py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="whitespace-nowrap py-3 pr-4 text-ink">
                    <time dateTime={payment.paidAt}>{formatDate(payment.paidAt)}</time>
                  </td>
                  <td className="py-3 pr-4 text-ink">{payment.planName}</td>
                  <td className="py-3 pr-4 text-ink">Tk {payment.amount}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-muted">{payment.gatewayRef}</td>
                  <td
                    className={`py-3 font-semibold ${payment.status === "PAID" ? "text-ink" : "text-brand"}`}
                  >
                    {statusLabels[payment.status] || payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
