export function BrandBar({ onBrand }: { onBrand: (brand: string) => void }) {
  const brands = [
    { id: "Apple", label: "Apple", node: <AppleMark /> },
    { id: "Samsung", label: "Samsung", node: <img src="/assets/brands/samsung.svg" alt="" className="h-[14px] w-auto" /> },
    { id: "Xiaomi", label: "Xiaomi", node: <XiaomiMark /> },
    { id: "Motorola", label: "Motorola", node: <img src="/assets/brands/motorola.svg" alt="" className="h-[30px] w-auto" /> },
    { id: "Realme", label: "realme", node: <img src="/assets/brands/realme.svg" alt="" className="h-[22px] w-auto" /> },
    { id: "TCL", label: "TCL", node: <img src="/assets/brands/tcl2.svg" alt="" className="h-[20px] w-auto" /> },
  ];

  return (
    <div id="marcas" className="bg-[#071426] text-white">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-8 overflow-x-auto px-6 py-3.5">
        {brands.map((brand) => (
          <button key={brand.id} type="button" aria-label={brand.label} onClick={() => onBrand(brand.id)} className="shrink-0 opacity-95 transition hover:opacity-100">
            {brand.node}
          </button>
        ))}
      </div>
    </div>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 18 22" className="h-[26px] w-[22px] fill-white" aria-hidden="true">
      <path d="M14.7 11.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.3 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.7-2.2c.9-1.2 1.2-2.4 1.3-2.5-.1 0-2.4-.9-2.4-3.9ZM12.2 4.8c.6-.8 1.1-1.8.9-2.8-1 .1-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.8 1 .1 2.1-.5 2.9-1.4Z" />
    </svg>
  );
}

function XiaomiMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-[30px] w-[30px]" aria-hidden="true">
      <rect x="1.6" y="1.6" width="44.8" height="44.8" rx="12" fill="none" stroke="white" strokeWidth="1.7" />
      <g transform="translate(7.4 17.2) scale(0.385)" fill="white">
        <path d="M1 36V16.2C1 7.4 7.2 2 15 2c4.6 0 7.8 2.4 9.2 6.2C25.6 4.4 29 2 33.8 2 41.8 2 47.6 7.6 47.6 16.6V36H37.4V17.6c0-3.8-2-6-5-6s-5 2.2-5 6V36H17.8V17.6c0-3.8-2-6-4.8-6s-4.8 2.2-4.8 6V36H1Z" />
        <path d="M54.2 36V16.4h10.2V36H54.2Z" />
        <circle cx="59.3" cy="7.6" r="5.1" />
      </g>
    </svg>
  );
}
