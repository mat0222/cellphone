import { useMemo, useState } from "react";
import { PhonePair } from "../components/RealPhoneArt";
import { Stars } from "../components/Stars";
import {
  brands,
  catalogProducts,
  conditions,
  formatPrice,
  rams,
  storages,
  type View,
} from "../data";

const pageSize = 6;

export function CatalogPage({
  query,
  brand,
  promos,
  favorites,
  onNavigate,
  onOpen,
  onFavorite,
  onReset,
}: {
  query: string;
  brand: string;
  promos: boolean;
  favorites: string[];
  onNavigate: (view: View) => void;
  onOpen: (name: string) => void;
  onFavorite: (name: string) => void;
  onReset: () => void;
}) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(brand ? [brand] : []);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [promoOnly, setPromoOnly] = useState(promos);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sort, setSort] = useState("Más relevantes");
  const [list, setList] = useState(false);
  const [page, setPage] = useState(1);

  const products = useMemo(() => {
    const text = query.trim().toLowerCase();
    const filtered = catalogProducts.filter((product) => {
      if (text && !`${product.name} ${product.brand}`.toLowerCase().includes(text)) return false;
      if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false;
      if (selectedStorage.length && !selectedStorage.includes(product.storage)) return false;
      if (selectedRam.length && !selectedRam.includes(product.ram)) return false;
      if (selectedCondition.length && !selectedCondition.includes(product.condition)) return false;
      if (promoOnly && !product.oldPrice) return false;
      if (product.price > maxPrice) return false;
      return true;
    });
    const ranked = [...filtered];
    if (sort === "Menor precio") ranked.sort((a, b) => a.price - b.price);
    if (sort === "Mayor precio") ranked.sort((a, b) => b.price - a.price);
    if (sort === "Mejor valorados") ranked.sort((a, b) => b.rating - a.rating);
    return ranked;
  }, [query, selectedBrands, selectedStorage, selectedRam, selectedCondition, promoOnly, maxPrice, sort]);

  const pages = Math.max(1, Math.ceil(products.length / pageSize));
  const visible = products.slice((page - 1) * pageSize, page * pageSize);

  const clear = () => {
    setSelectedBrands([]);
    setSelectedStorage([]);
    setSelectedRam([]);
    setSelectedCondition([]);
    setPromoOnly(false);
    setMaxPrice(2000000);
    setPage(1);
    onReset();
  };

  return (
    <div className="min-h-[70vh] bg-[#f5f7fb]">
      <div className="mx-auto max-w-[1180px] px-4 py-6">
        <h1 className="text-3xl font-bold text-[#142033]">Productos</h1>
        <p className="mt-1 text-sm text-slate-500">
          <button type="button" className="text-brand" onClick={() => onNavigate("home")}>
            Inicio
          </button>
          <span> / Productos</span>
        </p>

        <div className="mt-5 grid gap-5 lg:grid-cols-[230px_1fr]">
          <aside className="h-fit rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#142033]">Filtros</h2>
            <p className="mt-4 text-xs font-semibold text-slate-600">Precio</p>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>$ 0</span>
              <span>$ 2.000.000</span>
            </div>
            <input type="range" min={200000} max={2000000} step={50000} value={maxPrice} onChange={(event) => { setMaxPrice(Number(event.target.value)); setPage(1); }} className="mt-1 w-full accent-brand" aria-label="Precio máximo" />
            <p className="text-[11px] text-slate-500">Hasta {formatPrice(maxPrice)}</p>

            <FilterGroup title="Marca" options={brands} selected={selectedBrands} onChange={setSelectedBrands} />
            <FilterGroup title="Almacenamiento" options={storages} selected={selectedStorage} onChange={setSelectedStorage} />
            <FilterGroup title="RAM" options={rams} selected={selectedRam} onChange={setSelectedRam} />
            <FilterGroup title="Estado" options={conditions} selected={selectedCondition} onChange={setSelectedCondition} />

            <button type="button" onClick={clear} className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-sm text-slate-600">
              Limpiar filtros
            </button>
          </aside>

          <div>
            <div className="mb-3 flex flex-wrap items-center justify-end gap-2 text-sm text-slate-500">
              <span>Ordenar por</span>
              <select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[#142033]">
                <option>Más relevantes</option>
                <option>Menor precio</option>
                <option>Mayor precio</option>
                <option>Mejor valorados</option>
              </select>
              <button type="button" aria-label="Vista grilla" aria-pressed={!list} onClick={() => setList(false)} className={`grid h-11 w-11 place-items-center rounded-lg ${list ? "border border-slate-200 bg-white" : "bg-brand text-white"}`}>▦</button>
              <button type="button" aria-label="Vista lista" aria-pressed={list} onClick={() => setList(true)} className={`grid h-11 w-11 place-items-center rounded-lg ${list ? "bg-brand text-white" : "border border-slate-200 bg-white"}`}>☰</button>
            </div>

            {visible.length === 0 ? <p className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500">No hay productos con esos filtros.</p> : null}
            <div className={list ? "grid gap-3" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"}>
              {visible.map((product) => (
                <article key={product.name} className={`rounded-2xl border border-slate-200 bg-white p-3 shadow-sm ${list ? "flex items-center gap-4" : ""}`}>
                  <div className={`relative ${list ? "w-28 shrink-0" : ""}`}>
                    <span
                      className={`absolute left-1 top-1 rounded-md px-1.5 py-0.5 text-[11px] font-bold text-white ${
                        product.badge.tone === "red" ? "bg-[#ff3b3b]" : product.badge.tone === "green" ? "bg-[#22a34a]" : "bg-brand"
                      }`}
                    >
                      {product.badge.label}
                    </span>
                    <button type="button" aria-label={favorites.includes(product.name) ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`} aria-pressed={favorites.includes(product.name)} onClick={() => onFavorite(product.name)} className={`absolute right-1 top-1 grid h-11 w-11 place-items-center ${favorites.includes(product.name) ? "text-red-500" : "text-slate-300"}`}>{favorites.includes(product.name) ? "♥" : "♡"}</button>
                    <PhonePair model={product.model} className="mx-auto h-32 w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                  <h3 className="mt-2 text-sm font-semibold text-[#1c2b3a]"><button type="button" onClick={() => onOpen(product.name)}>{product.name}</button></h3>
                  <p className="text-lg font-extrabold text-brand">{formatPrice(product.price)}</p>
                  <Stars rating={product.rating} reviews={product.reviews} />
                  <button type="button" onClick={() => onOpen(product.name)} className="mt-3 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white">Ver producto</button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-1.5 text-sm">
              <PagerButton label="‹" onClick={() => setPage((p) => Math.max(1, p - 1))} />
              {Array.from({ length: pages }, (_, index) => index + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`grid h-8 w-8 place-items-center rounded-lg ${page === n ? "bg-brand text-white" : "bg-white text-slate-600"}`}
                >
                  {n}
                </button>
              ))}
              <PagerButton label="›" onClick={() => setPage((p) => Math.min(pages, p + 1))} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold text-slate-600">{title}</p>
      <div className="mt-2 space-y-1.5">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label key={option} className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  onChange(checked ? selected.filter((item) => item !== option) : [...selected, option])
                }
                className="accent-brand"
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function PagerButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-500">
      {label}
    </button>
  );
}
