import pages from "@/data/pages";

function toBlocks(body) {
  return body.split("\n\n").map((text) =>
    text.startsWith("## ") ? { type: "heading", text: text.slice(3) } : { type: "paragraph", text }
  );
}

export async function getPageBySlug(slug) {
  const page = pages.find((item) => item.slug === slug);
  if (!page) return null;

  return { ...page, blocks: toBlocks(page.body) };
}
