"use client";

import Link from "next/link";
import { useState } from "react";

export default function BookmarkButton() {
  const [showLoginNote, setShowLoginNote] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => setShowLoginNote(true)}
        className="border border-ink px-2 py-1 text-xs font-semibold text-ink hover:bg-surface"
      >
        Save article
      </button>
      {showLoginNote && (
        <p role="status" className="text-xs text-muted">
          <Link href="/login" className="font-semibold text-brand hover:underline">
            Log in
          </Link>{" "}
          to save articles.
        </p>
      )}
    </div>
  );
}
