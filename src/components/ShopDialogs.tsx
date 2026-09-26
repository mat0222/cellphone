import { useState } from "react";
import { PhonePair } from "./RealPhoneArt";
import { Stars } from "./Stars";
import { catalogProducts, formatPrice, pointSteps, type CatalogProduct } from "../data";

export function ProductDialog({
  product,
  favorite,
  onFavorite,
  onAdd,
  onClose,
}: {
  product: CatalogProduct;
  favorite: boolean;
  onFavorite: () => void;
  onAdd: (qty: number) => void;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const installment = Math.round(product.price / 12);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4" onClick={onClose}>
      <article className="grid w-full max-w-3xl gap-6 rounded-2xl bg-white p-5 shadow-2xl md:grid-cols-[280px_1fr]" onClick={(event) => event.stopPropagation()}>
        <PhonePair model={product.model} className="h-64 w-full" />
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">{product.brand} · {product.storage} · {product.ram}</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#142033]">{product.name}</h2>
            </div>
            <button type="button" onClick={onClose} aria-label="Cerrar" className="grid h-11 w-11 place-items-center rounded-lg bg-slate-100">✕</button>
          </div>
          <Stars rating={product.rating} reviews={product.reviews} />
          {product.oldPrice ? <p className="mt-4 text-sm text-slate-400 line-through">{formatPrice(product.oldPrice)}</p> : null}
          <p className="text-3xl font-extrabold text-brand">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-slate-500">Hasta 12 cuotas sin interés de {formatPrice(installment)}.</p>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-slate-200">
              <button type="button" className="h-10 w-10" onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button>
              <span className="grid h-10 w-10 place-items-center border-x border-slate-200">{qty}</span>
              <button type="button" className="h-10 w-10" onClick={() => setQty((value) => value + 1)}>+</button>
            </div>
            <button type="button" className="h-10 flex-1 rounded-lg bg-brand font-semibold text-white" onClick={() => onAdd(qty)}>Agregar al carrito</button>
            <button type="button" aria-label="Favorito" className={`grid h-10 w-10 place-items-center rounded-lg border ${favorite ? "border-red-200 text-red-500" : "border-slate-200 text-slate-400"}`} onClick={onFavorite}>{favorite ? "♥" : "♡"}</button>
          </div>
        </div>
      </article>
    </div>
  );
}

export function AccountDialog({
  favorites,
  onOpen,
  onCart,
  onLogin,
  onClose,
}: {
  favorites: string[];
  onOpen: (name: string) => void;
  onCart: () => void;
  onLogin: () => void;
  onClose: () => void;
}) {
  const saved = catalogProducts.filter((item) => favorites.includes(item.name));

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4" onClick={onClose}>
      <article role="dialog" aria-modal="true" aria-labelledby="cuenta-titulo" className="max-h-[90vh] w-full max-w-md overflow-auto rounded-2xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Tu cuenta</p>
            <h2 id="cuenta-titulo" className="mt-1 text-2xl font-extrabold text-[#142033]">Hola</h2>
            <p className="mt-1 text-sm text-slate-500">Acá ves tus favoritos y el carrito. El panel de la tienda está aparte.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-slate-100">✕</button>
        </div>
        <h3 className="mt-5 text-sm font-bold text-[#142033]">Favoritos</h3>
        {saved.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">Todavía no guardaste ningún celular. Marcá el corazón en un producto.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {saved.map((item) => (
              <li key={item.name}>
                <button type="button" onClick={() => onOpen(item.name)} className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-3 text-left">
                  <span className="font-semibold text-[#142033]">{item.name}</span>
                  <span className="shrink-0 text-sm font-bold text-brand">{formatPrice(item.price)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 grid gap-2">
          <button type="button" onClick={onCart} className="h-11 rounded-lg bg-brand text-sm font-semibold text-white">Ver carrito</button>
          <button type="button" onClick={onLogin} className="h-11 rounded-lg border border-slate-200 text-sm font-semibold text-[#142033]">Ingresar al panel</button>
        </div>
      </article>
    </div>
  );
}

export function InfoDialog({ kind, onClose, onProducts }: { kind: "puntos" | "cuotas"; onClose: () => void; onProducts: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4" onClick={onClose}>
      <article className="w-full max-w-lg rounded-2xl bg-[#071833] p-6 text-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-extrabold">{kind === "puntos" ? "Cómo obtener puntos" : "Financiación"}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="grid h-11 w-11 place-items-center rounded-lg bg-white/10">✕</button>
        </div>
        {kind === "puntos" ? (
          <>
            <p className="mt-2 text-sm text-slate-300">Comprá, sumá puntos y canjeá increíbles beneficios.</p>
            <ol className="mt-5 space-y-3">
              {pointSteps.map((step) => (
                <li key={step.n} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-sm font-bold">{step.n}</span>
                  <span><strong className="block">{step.title}</strong><span className="text-sm text-slate-300">{step.text}</span></span>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-slate-300">Hasta 12 cuotas sin interés. En el iPhone 15 128GB son 12 cuotas de {formatPrice(Math.round(999999 / 12))}.</p>
        )}
        <button type="button" className="mt-6 rounded-lg bg-brand px-4 py-2 text-sm font-semibold" onClick={onProducts}>Ver productos →</button>
      </article>
    </div>
  );
}
