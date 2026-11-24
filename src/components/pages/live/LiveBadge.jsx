export default function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-live-badge px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-paper">
      <span className="h-2 w-2 bg-paper animate-live-blink motion-reduce:animate-none" aria-hidden="true" />
      Live
    </span>
  );
}
