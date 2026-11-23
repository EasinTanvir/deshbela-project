export default function TagHeader({ tag, total }) {
  return (
    <header className="mt-4 border-b-2 border-ink pb-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand">Topic</p>
      <h1 className="mt-1 font-serif text-4xl font-bold leading-tight text-ink md:text-5xl">{tag.name}</h1>
      <p className="mt-2 text-sm text-muted">
        {total === 1 ? "1 news story" : `${total} news stories`}
      </p>
    </header>
  );
}
