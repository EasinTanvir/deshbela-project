import SectionTitle from "@/components/common/SectionTitle";

export default function AdOptions({ placements }) {
  return (
    <section className="mt-10 max-w-2xl">
      <SectionTitle title="Where your ad can appear" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink text-xs uppercase tracking-wider text-muted">
              <th scope="col" className="py-2 pr-4 font-semibold">Option</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Size</th>
              <th scope="col" className="py-2 font-semibold">Where it shows</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {placements.map((placement) => (
              <tr key={placement.id}>
                <th scope="row" className="py-3 pr-4 font-serif font-semibold text-ink">
                  {placement.name}
                </th>
                <td className="whitespace-nowrap py-3 pr-4 text-muted">{placement.size}</td>
                <td className="py-3 text-ink">{placement.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
