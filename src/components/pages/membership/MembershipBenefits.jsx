import SectionTitle from "@/components/common/SectionTitle";

const benefits = [
  { title: "Members-only stories", text: "Read our in-depth reports, analysis and interviews that are only for members." },
  { title: "Save news for later", text: "Bookmark any story and read it later from your account." },
  { title: "Join the conversation", text: "React to stories and post comments under the news." },
  { title: "Breaking news alerts", text: "Get the most important news on your phone or in your inbox." },
];

export default function MembershipBenefits() {
  return (
    <section>
      <SectionTitle title="What members get" />
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="border-b border-line py-4">
            <h3 className="font-serif text-lg font-semibold text-ink">{benefit.title}</h3>
            <p className="mt-1 text-muted">{benefit.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
