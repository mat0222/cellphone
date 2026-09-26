type Tone = "silver" | "purple" | "blue" | "black" | "gold" | "green";

const screens: Record<Tone, string> = {
  silver: "from-slate-200 via-sky-100 to-blue-400",
  purple: "from-fuchsia-500 via-violet-600 to-indigo-950",
  blue: "from-sky-300 via-blue-500 to-blue-800",
  black: "from-slate-600 via-slate-800 to-black",
  gold: "from-amber-100 via-emerald-300 to-teal-700",
  green: "from-lime-200 via-emerald-400 to-green-800",
};

const backs: Record<Tone, string> = {
  silver: "bg-gradient-to-b from-slate-200 to-slate-400",
  purple: "bg-gradient-to-b from-slate-700 to-slate-950",
  blue: "bg-gradient-to-b from-slate-500 to-slate-800",
  black: "bg-gradient-to-b from-neutral-700 to-black",
  gold: "bg-gradient-to-b from-stone-300 to-stone-500",
  green: "bg-gradient-to-b from-stone-200 to-stone-400",
};

export function Device({ tone, className = "h-28" }: { tone: Tone; className?: string }) {
  return (
    <div className={`flex items-end justify-center gap-1.5 ${className}`}>
      <div className={`relative h-[78%] w-[34%] rounded-[10px] shadow-md ${backs[tone]}`}>
        <div className="absolute left-1.5 top-1.5 h-4 w-4 rounded-md bg-black/80">
          <div className="absolute left-0.5 top-0.5 h-1 w-1 rounded-full bg-sky-300" />
          <div className="absolute bottom-0.5 right-0.5 h-1 w-1 rounded-full bg-sky-200" />
        </div>
      </div>
      <div className={`relative h-full w-[38%] overflow-hidden rounded-[12px] border border-white/40 shadow-md bg-gradient-to-b ${screens[tone]}`}>
        <div className="mx-auto mt-1 h-1.5 w-6 rounded-full bg-black/70" />
      </div>
    </div>
  );
}

export function HeroPhones() {
  return (
    <div className="relative h-[280px] w-full max-w-[460px]">
      <div className="absolute right-[18%] top-6 h-[230px] w-[150px] rotate-[-8deg] rounded-[28px] bg-gradient-to-b from-slate-500 to-slate-900 shadow-2xl">
        <div className="absolute left-3 top-3 h-14 w-14 rounded-2xl bg-black/80 ring-1 ring-white/10">
          <div className="absolute left-2 top-2 h-3.5 w-3.5 rounded-full bg-slate-700 ring-2 ring-slate-500" />
          <div className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-slate-600" />
          <div className="absolute bottom-2 left-2 h-3 w-3 rounded-full bg-slate-600" />
        </div>
      </div>
      <div className="absolute right-0 top-10 h-[210px] w-[132px] rotate-[8deg] overflow-hidden rounded-[26px] border border-white/20 bg-gradient-to-b from-indigo-400 via-violet-700 to-slate-950 shadow-2xl">
        <div className="mx-auto mt-2 h-3 w-10 rounded-full bg-black/70" />
        <div className="absolute inset-x-3 bottom-0 top-8 rounded-t-2xl bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </div>
  );
}
