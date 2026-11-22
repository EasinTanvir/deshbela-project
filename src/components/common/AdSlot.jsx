const sizes = {
  leaderboard: "h-[100px] max-w-[320px] md:h-[90px] md:max-w-[728px] lg:max-w-[970px]",
  rectangle: "h-[250px] max-w-[300px]",
};

export default function AdSlot({ size = "leaderboard" }) {
  return (
    <div role="complementary" aria-label="Advertisement" className="w-full text-center">
      <p className="mb-1 text-[11px] uppercase tracking-widest text-muted">Advertisement</p>
      <div className={`mx-auto flex w-full items-center justify-center border border-line bg-surface ${sizes[size]}`}>
        <span className="text-sm text-muted">Ad space</span>
      </div>
    </div>
  );
}
