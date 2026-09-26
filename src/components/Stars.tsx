export function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="mt-1.5 flex items-center gap-1 text-[12px] text-slate-500">
      <div className="flex text-[#f5a524]">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < Math.round(rating) ? "★" : "☆"}</span>
        ))}
      </div>
      <span>
        {rating.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ({reviews})
      </span>
    </div>
  );
}
