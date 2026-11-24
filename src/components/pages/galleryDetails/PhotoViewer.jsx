"use client";

import Image from "next/image";
import { useState } from "react";

export default function PhotoViewer({ photos }) {
  const [current, setCurrent] = useState(0);
  const photo = photos[current];
  const lastIndex = photos.length - 1;

  function showPrevious() {
    setCurrent((index) => (index === 0 ? lastIndex : index - 1));
  }

  function showNext() {
    setCurrent((index) => (index === lastIndex ? 0 : index + 1));
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") showPrevious();
    if (event.key === "ArrowRight") showNext();
  }

  return (
    <section aria-label="Photos" aria-roledescription="carousel" onKeyDown={handleKeyDown}>
      <figure>
        <div className="relative aspect-[3/2] overflow-hidden bg-surface">
          <Image
            key={photo.id}
            src={photo.file}
            alt={photo.altText}
            fill
            preload={current === 0}
            placeholder="blur"
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-3 flex items-start justify-between gap-4 border-b border-line pb-3">
          <figcaption className="text-sm text-ink" aria-live="polite">
            {photo.caption}
            {photo.photographer && <span className="block text-xs text-muted">Photo: {photo.photographer}</span>}
          </figcaption>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous photo"
              className="h-9 w-9 border border-line text-ink hover:border-ink"
            >
              &larr;
            </button>
            <span className="min-w-12 text-center text-sm text-muted">
              {current + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="h-9 w-9 border border-line text-ink hover:border-ink"
            >
              &rarr;
            </button>
          </div>
        </div>
      </figure>

      <ul className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {photos.map((item, index) => (
          <li key={item.id} className="shrink-0">
            <button
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
              className={`relative block h-14 w-20 overflow-hidden border-2 ${
                index === current ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={item.file} alt="" fill sizes="80px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
