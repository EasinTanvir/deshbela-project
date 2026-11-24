"use client";

import { useState } from "react";

export default function CopyLinkButton({ url }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="border border-line px-2 py-1 text-xs font-semibold text-ink hover:border-ink"
    >
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
