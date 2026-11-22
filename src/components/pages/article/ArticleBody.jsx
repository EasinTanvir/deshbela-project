import Link from "next/link";

export default function ArticleBody({ paragraphs, isMembersOnly }) {
  const visibleParagraphs = isMembersOnly ? paragraphs.slice(0, 1) : paragraphs;

  return (
    <div className="mt-6">
      <div className="space-y-5 text-[17px] leading-8 text-ink">
        {visibleParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {isMembersOnly && (
        <div className="mt-6 border-t-2 border-brand bg-article-members-bg p-5">
          <p className="font-serif text-xl font-bold text-ink">This story is for members</p>
          <p className="mt-1 text-sm text-muted">Become a member to read the full story and all members-only news.</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <Link href="/membership" className="bg-brand px-4 py-2 font-semibold text-paper hover:bg-brand-dark">
              See membership plans
            </Link>
            <Link href="/login" className="font-semibold text-ink hover:underline">
              Already a member? Log in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
