import MediaImage from "@/components/common/MediaImage";

export default function ReporterPhoto({ name, photoUrl, sizeClass = "h-20 w-20 text-2xl md:h-28 md:w-28 md:text-4xl" }) {
  if (photoUrl) {
    return (
      <div className={`relative shrink-0 overflow-hidden border border-line bg-surface ${sizeClass}`}>
        <MediaImage file={photoUrl} alt={`Photo of ${name}`} sizes="112px" />
      </div>
    );
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center border border-line bg-surface font-serif font-bold text-muted ${sizeClass}`}
    >
      {initials}
    </div>
  );
}
