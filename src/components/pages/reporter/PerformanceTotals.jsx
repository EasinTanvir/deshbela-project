export default function PerformanceTotals({ performance }) {
  const approval =
    performance.approvalRate === null
      ? { value: "-", note: "No reviews yet" }
      : {
          value: `${performance.approvalRate}%`,
          note: `${performance.approvedCount} of ${performance.reviewCount} reviews approved`,
        };

  const totals = [
    { label: "Published stories", value: performance.publishedCount, note: "On the site now" },
    { label: "Total views", value: performance.totalViews.toLocaleString("en-US"), note: "All published stories" },
    { label: "Average views", value: performance.averageViews.toLocaleString("en-US"), note: "Per story" },
    { label: "Approval rate", value: approval.value, note: approval.note },
  ];

  return (
    <dl className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
      {totals.map((total) => (
        <div key={total.label} className="border-b border-r border-line px-4 py-4">
          <dt className="text-sm text-muted">{total.label}</dt>
          <dd className="font-serif text-3xl font-bold text-ink">{total.value}</dd>
          <dd className="text-xs text-muted">{total.note}</dd>
        </div>
      ))}
    </dl>
  );
}
