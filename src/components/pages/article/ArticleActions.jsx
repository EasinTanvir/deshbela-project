"use client";

import Link from "next/link";
import { useState } from "react";

export default function ArticleActions({ reactions }) {
  const [showLoginNote, setShowLoginNote] = useState(false);

  return (
    <div className="mt-6 border-y border-line py-4">
      <p className="text-sm font-semibold text-ink">What do you think about this news?</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {reactions.map((reaction) => (
          <button
            key={reaction.type}
            type="button"
            onClick={() => setShowLoginNote(true)}
            className="border border-line px-3 py-1.5 text-sm text-ink hover:border-ink"
          >
            {reaction.label} <span className="ml-1 text-muted">{reaction.count}</span>
          </button>
        ))}
      </div>
      {showLoginNote && (
        <p role="status" className="mt-3 text-sm text-muted">
          <Link href="/login" className="font-semibold text-brand hover:underline">
            Log in
          </Link>{" "}
          to react to news.
        </p>
      )}
    </div>
  );
}
