import SectionTitle from "@/components/common/SectionTitle";

export default function ContactDetails({ contact }) {
  const rows = [
    { label: "Office", value: contact.address },
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, "")}` },
    { label: "News desk", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Advertising", value: contact.adsEmail, href: `mailto:${contact.adsEmail}` },
    { label: "Office hours", value: contact.officeHours },
  ];

  return (
    <section aria-label="Contact details">
      <SectionTitle title="Our Office" />
      <dl className="divide-y divide-line">
        {rows.map((row) => (
          <div key={row.label} className="py-3 first:pt-0">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{row.label}</dt>
            <dd className="mt-0.5 text-ink">
              {row.href ? (
                <a href={row.href} className="hover:text-brand hover:underline">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
