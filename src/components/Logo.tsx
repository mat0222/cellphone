export function Logo({ light = false, subtitle }: { light?: boolean; subtitle: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden="true">
        <circle cx="18" cy="18" r="18" fill="#2f7bff" />
        <path
          d="M24.5 11.2a9 9 0 1 0 1.6 10.8"
          fill="none"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="25.2" cy="10.2" r="2.1" fill="white" />
      </svg>
      <div className="leading-tight">
        <div className={`text-[17px] font-extrabold tracking-tight ${light ? "text-white" : "text-[#102033]"}`}>
          Cell<span className="text-brand">Zone</span>
        </div>
        <div className={`text-[10px] ${light ? "text-slate-300" : "text-slate-500"}`}>{subtitle}</div>
      </div>
    </div>
  );
}
