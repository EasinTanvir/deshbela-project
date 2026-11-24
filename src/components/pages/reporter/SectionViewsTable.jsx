export default function SectionViewsTable({ sections }) {
  if (sections.length === 0) return null;

  return (
    <table className="w-full max-w-xl border-y border-line text-left text-sm">
      <thead>
        <tr className="border-b border-ink text-xs uppercase tracking-wide text-muted">
          <th scope="col" className="py-2 pr-3 font-semibold">Section</th>
          <th scope="col" className="py-2 pr-3 text-right font-semibold">Stories</th>
          <th scope="col" className="py-2 text-right font-semibold">Views</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {sections.map((section) => (
          <tr key={section.name}>
            <td className="py-2.5 pr-3 text-ink">{section.name}</td>
            <td className="py-2.5 pr-3 text-right tabular-nums text-ink">{section.stories}</td>
            <td className="py-2.5 text-right tabular-nums text-ink">{section.views.toLocaleString("en-US")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
