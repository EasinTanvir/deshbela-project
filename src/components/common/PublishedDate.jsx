import formatDate from "@/lib/formatDate";

export default function PublishedDate({ date }) {
  if (!date) return null;

  return (
    <time dateTime={date} className="text-xs text-muted">
      {formatDate(date)}
    </time>
  );
}
