import SectionTitle from "@/components/common/SectionTitle";
import { formatDay } from "@/lib/formatDate";

const decisionLabels = { APPROVED: "Approved", REJECTED: "Sent back" };

export default function EditorFeedback({ reviews }) {
  if (reviews.length === 0) return null;

  return (
    <section>
      <SectionTitle title="Editor feedback" />
      <ol className="divide-y divide-line border-y border-line">
        {reviews.map((review) => (
          <li key={review.id} className="py-3">
            <p className="text-sm">
              <span className={`font-semibold ${review.decision === "REJECTED" ? "text-brand" : "text-ink"}`}>
                {decisionLabels[review.decision] || review.decision}
              </span>
              <span className="text-muted">
                {" "}
                by {review.editorName} on <time dateTime={review.reviewedAt}>{formatDay(review.reviewedAt)}</time>
              </span>
            </p>
            {review.comment && <p className="mt-1 leading-relaxed text-ink">{review.comment}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
