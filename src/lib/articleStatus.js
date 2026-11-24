export const ARTICLE_STATUSES = [
  { value: "DRAFT", label: "Draft", slug: "draft" },
  { value: "IN_REVIEW", label: "In review", slug: "in-review" },
  { value: "REJECTED", label: "Rejected", slug: "rejected" },
  { value: "SCHEDULED", label: "Scheduled", slug: "scheduled" },
  { value: "PUBLISHED", label: "Published", slug: "published" },
];

export function statusLabel(value) {
  const status = ARTICLE_STATUSES.find((item) => item.value === value);
  return status ? status.label : value;
}

export function statusFromSlug(slug) {
  const status = ARTICLE_STATUSES.find((item) => item.slug === slug);
  return status ? status.value : null;
}

export function canReporterEdit(status) {
  return status === "DRAFT" || status === "REJECTED";
}
