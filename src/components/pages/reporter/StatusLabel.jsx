import { statusLabel } from "@/lib/articleStatus";

export default function StatusLabel({ status }) {
  const colour = status === "REJECTED" ? "border-brand text-brand" : status === "PUBLISHED" ? "border-ink text-ink" : "border-line text-muted";

  return (
    <span className={`inline-block whitespace-nowrap border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${colour}`}>
      {statusLabel(status)}
    </span>
  );
}
