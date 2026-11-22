"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PublishedDate from "@/components/common/PublishedDate";

const SLIDE_TIME = 6000;

export default function BreakingSlider({ items }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = items.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setInterval(() => {
      setCurrent((index) => (index + 1) % total);
    }, SLIDE_TIME);
    return () => clearInterval(timer);
  }, [paused, total]);

  if (total === 0) return null;

  const goTo = (index) => setCurrent((index + total) % total);
  const article = items[current];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Breaking news"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-surface sm:aspect-[16/9]">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={`/news/${item.slug}`}
            aria-hidden={index !== current}
            tabIndex={index === current ? undefined : -1}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              preload={index === 0}
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Link>
        ))}

        {total > 1 && (
          <div className="absolute bottom-0 right-0 flex items-stretch border-l border-t border-line bg-paper text-sm text-ink">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Previous news"
              className="px-3 py-1.5 hover:bg-surface"
            >
              &larr;
            </button>
            <span className="flex items-center border-x border-line px-3 text-xs tabular-nums text-muted">
              {current + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Next news"
              className="px-3 py-1.5 hover:bg-surface"
            >
              &rarr;
            </button>
          </div>
        )}
      </div>

      <div aria-live={paused ? "polite" : "off"} className="mt-3 min-h-[9rem] md:min-h-[10.5rem]">
        <p className="text-xs font-bold uppercase tracking-wider">
          <span className="text-home-breaking">Breaking</span>
          {article.category && <span className="text-muted"> &middot; {article.category.name}</span>}
        </p>
        <h2 className="mt-1 line-clamp-3 font-serif text-2xl font-bold leading-tight md:text-3xl">
          <Link href={`/news/${article.slug}`} className="text-ink decoration-2 underline-offset-4 hover:underline">
            {article.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-base leading-relaxed text-muted">{article.metaDescription}</p>
        <div className="mt-1.5">
          <PublishedDate date={article.publishedAt} />
        </div>
      </div>
    </section>
  );
}
