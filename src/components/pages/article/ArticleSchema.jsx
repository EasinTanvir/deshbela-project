export default function ArticleSchema({ article, articleUrl, site }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.metaDescription,
    image: [`${site.siteUrl}${article.image.src}`],
    datePublished: article.publishedAt,
    articleSection: article.category.name,
    isAccessibleForFree: !article.isMembersOnly,
    mainEntityOfPage: articleUrl,
    author: article.authors.map((author) => ({ "@type": "Person", name: author.name })),
    publisher: { "@type": "Organization", name: site.name, url: site.siteUrl },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
