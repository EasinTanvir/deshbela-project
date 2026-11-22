import Link from "next/link";
import Container from "@/components/common/Container";

export default function NewsTicker({ headlines }) {
  if (headlines.length === 0) return null;

  return (
    <div className="border-y border-line bg-paper lg:border-t-0">
      <Container className="flex items-stretch">
        <span className="flex shrink-0 items-center border-r border-line pr-3 text-xs font-bold uppercase tracking-wider text-home-ticker-label">
          Latest
        </span>

        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-home-ticker hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...headlines, ...headlines].map((article, index) => {
              const isCopy = index >= headlines.length;
              return (
                <Link
                  key={`${article.id}-${index}`}
                  href={`/news/${article.slug}`}
                  aria-hidden={isCopy}
                  tabIndex={isCopy ? -1 : undefined}
                  className="flex items-center gap-3 whitespace-nowrap px-4 py-2 text-sm text-ink hover:underline"
                >
                  <span className="h-1.5 w-1.5 bg-home-ticker-label" />
                  {article.title}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
