import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import CommentItem from "@/components/pages/article/CommentItem";

export default function CommentSection({ comments }) {
  return (
    <section id="comments" aria-label="Comments">
      <SectionTitle title={`Comments (${comments.total})`} />

      <div className="border border-line bg-surface p-4 text-sm text-ink">
        <Link href="/login" className="font-semibold text-brand hover:underline">
          Log in
        </Link>{" "}
        or{" "}
        <Link href="/register" className="font-semibold text-brand hover:underline">
          create an account
        </Link>{" "}
        to write a comment. Comments are checked before they are shown.
      </div>

      {comments.threads.length === 0 ? (
        <p className="mt-4 text-sm text-muted">No comments yet.</p>
      ) : (
        <ul className="mt-2 divide-y divide-line">
          {comments.threads.map((comment) => (
            <li key={comment.id} className="py-4">
              <CommentItem comment={comment} />
              {comment.replies.length > 0 && (
                <ul className="mt-3 space-y-3 border-l-2 border-line pl-4">
                  {comment.replies.map((reply) => (
                    <li key={reply.id}>
                      <CommentItem comment={reply} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
