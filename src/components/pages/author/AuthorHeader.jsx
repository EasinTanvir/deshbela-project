import ReporterPhoto from "@/components/common/ReporterPhoto";

export default function AuthorHeader({ author, total }) {
  return (
    <header className="mt-4 flex gap-5 border-b border-line pb-6">
      <ReporterPhoto name={author.name} photoUrl={author.photoUrl} />

      <div className="min-w-0">
        <h1 className="font-serif text-3xl font-bold leading-tight text-ink md:text-5xl">{author.name}</h1>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-brand">{author.designation}</p>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{author.bio}</p>
        <p className="mt-2 text-sm text-muted">{total === 1 ? "1 news story" : `${total} news stories`}</p>
      </div>
    </header>
  );
}
