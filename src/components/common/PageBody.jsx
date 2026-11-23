export default function PageBody({ blocks }) {
  return (
    <div className="max-w-2xl text-lg leading-relaxed text-ink">
      {blocks.map((block, index) =>
        block.type === "heading" ? (
          <h2 key={index} className="mt-8 font-serif text-2xl font-bold text-ink">
            {block.text}
          </h2>
        ) : (
          <p key={index} className="mt-4 first:mt-0">
            {block.text}
          </p>
        )
      )}
    </div>
  );
}
