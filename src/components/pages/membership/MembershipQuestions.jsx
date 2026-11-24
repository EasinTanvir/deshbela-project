import SectionTitle from "@/components/common/SectionTitle";

const questions = [
  {
    question: "How do I pay?",
    answer: "You can pay with mobile banking or a bank card. Payments are handled by our payment partner, and we never see your card details.",
  },
  {
    question: "Does my membership renew by itself?",
    answer: "No. Your membership ends when the plan ends. We send you an email a few days before, so you can renew if you want.",
  },
  {
    question: "Can I change my plan?",
    answer: "Yes. You can choose a new plan from your account when your current plan ends.",
  },
  {
    question: "I paid, but I cannot read members-only stories.",
    answer: "Log out and log in again. If it still does not work, write to us from the Contact Us page with your payment number.",
  },
];

export default function MembershipQuestions() {
  return (
    <section>
      <SectionTitle title="Common questions" />
      <div className="divide-y divide-line border-b border-line">
        {questions.map((item) => (
          <details key={item.question} className="group py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg font-semibold text-ink">
              {item.question}
              <span className="text-muted group-open:hidden" aria-hidden="true">+</span>
              <span className="hidden text-muted group-open:inline" aria-hidden="true">&minus;</span>
            </summary>
            <p className="mt-2 text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
