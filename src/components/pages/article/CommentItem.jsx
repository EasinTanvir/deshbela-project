import PublishedDate from "@/components/common/PublishedDate";

export default function CommentItem({ comment }) {
  return (
    <article>
      <div className="flex flex-wrap items-baseline gap-x-2">
        <p className="text-sm font-semibold text-ink">{comment.userName}</p>
        <PublishedDate date={comment.createdAt} />
      </div>
      <p className="mt-1 text-sm leading-relaxed text-ink">{comment.body}</p>
    </article>
  );
}
