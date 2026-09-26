import { useState } from "react";
import { BrandBar } from "../components/BrandBar";
import { HeroPhones, PhonePair } from "../components/RealPhoneArt";
import { Stars } from "../components/Stars";
import { featuredProducts, formatPrice, whyBuy, type View } from "../data";

export function HomePage({
  onNavigate,
  onBrand,
  onPromos,
  onOpen,
  onInfo,
  favorites,
  onFavorite,
}: {
  onNavigate: (view: View) => void;
  onBrand: (brand: string) => void;
  onPromos: () => void;
  onOpen: (name: string) => void;
  onInfo: (kind: "puntos" | "cuotas") => void;
  favorites: string[];
  onFavorite: (name: string) => void;
}) {
  const [slide, setSlide] = useState(0);
  return (
    <div className="bg-[#f4f7fb]">
      <section className="relative overflow-hidden bg-[#050d1c] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,#1a4ea8_0%,transparent_46%),radial-gradient(circle_at_30%_80%,#0b2a55_0%,transparent_40%)]" />
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-6 px-6 py-8 md:min-h-[355px] md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-sky-300">
              NUEVOS MODELOS · MEJORES PRECIOS
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.03] tracking-tight md:text-[48px]">
              Los mejores celulares,
              <br />
              <span className="text-brand">al mejor precio</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
              Encontrá tu próximo celular con la mejor calidad, las últimas novedades y garantía oficial.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("productos")}
              className="mt-6 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold"
            >
              Ver productos →
            </button>
          </div>
          <div className="relative hidden h-[290px] md:block">
            <HeroPhones slide={slide} className="absolute inset-x-0 -bottom-8 h-[350px] w-full" />
            <button type="button" aria-label="Anterior" onClick={() => setSlide((value) => (value + 2) % 3)} className="absolute bottom-3 right-14 grid h-11 w-11 place-items-center rounded-full bg-black/50 text-white">
              ‹
            </button>
            <button type="button" aria-label="Siguiente" onClick={() => setSlide((value) => (value + 1) % 3)} className="absolute bottom-3 right-2 grid h-11 w-11 place-items-center rounded-full bg-black/50 text-white">
              ›
            </button>
          </div>
        </div>
      </section>

      <BrandBar onBrand={onBrand} />

      <div className="mx-auto grid max-w-[1180px] gap-4 px-4 py-6 md:grid-cols-3">
        <Promo
          title="Promociones especiales"
          text="Los mejores descuentos en modelos seleccionados."
          action="Ver promos →"
          images={["/assets/phones/iphone-15.jpg", "/assets/phones/galaxy-a54.jpg"]}
          onAction={onPromos}
        />
        <article className="relative flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c2f73] to-[#07111e] p-5 text-white">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-brand/60 bg-[#0b2a66] shadow-[0_0_30px_#2f7bff66]">
            <svg viewBox="0 0 24 24" className="h-10 w-10 fill-brand" aria-hidden="true">
              <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold leading-tight">Cómo obtener puntos</h2>
            <p className="mt-2 text-sm text-slate-300">Comprá, sumá puntos y canjeá increíbles beneficios.</p>
            <button type="button" onClick={() => onInfo("puntos")} className="mt-4 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold">
              Ver beneficios →
            </button>
          </div>
        </article>
        <Promo
          title="Financiación"
          text="Hasta 12 cuotas sin interés."
          action="Ver más →"
          images={["/assets/phones/motorola-edge-40.jpg", "/assets/phones/iphone-13.jpg"]}
          onAction={() => onInfo("cuotas")}
        />
      </div>

      <section className="mx-auto max-w-[1180px] px-4 pb-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[#122033]">Productos destacados</h2>
          <button type="button" onClick={() => onNavigate("productos")} className="text-sm font-semibold text-brand">
            Ver todos →
          </button>
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-[1fr_240px]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <article key={product.name} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="relative">
                  <span className="absolute left-1 top-1 rounded-md bg-[#ff3b3b] px-1.5 py-0.5 text-[11px] font-bold text-white">
                    -{product.discount}%
                  </span>
                  <button type="button" aria-label={favorites.includes(product.name) ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`} aria-pressed={favorites.includes(product.name)} onClick={() => onFavorite(product.name)} className={`absolute right-0 top-0 grid h-11 w-11 place-items-center text-lg ${favorites.includes(product.name) ? "text-red-500" : "text-slate-300"}`}>{favorites.includes(product.name) ? "♥" : "♡"}</button>
                  <PhonePair model={product.model} className="mx-auto h-32 w-full" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-[#1c2b3a]"><button type="button" onClick={() => onOpen(product.name)}>{product.name}</button></h3>
                <p className="text-xs text-slate-400 line-through">{formatPrice(product.oldPrice)}</p>
                <p className="text-lg font-extrabold text-brand">{formatPrice(product.price)}</p>
                <Stars rating={4.8} reviews={120} />
              </article>
            ))}
          </div>
          <aside className="rounded-2xl bg-[#071833] p-4 text-white">
            <h3 className="text-lg font-bold leading-snug">
              ¿Por qué comprar en <span className="text-brand">CellZone</span>?
            </h3>
            <ul className="mt-4 space-y-3">
              {whyBuy.map((item) => (
                <li key={item.title} className="flex gap-2">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-brand">
                    <Pin />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{item.title}</span>
                    <span className="block text-xs text-slate-300">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Promo({
  title,
  text,
  action,
  images,
  onAction,
}: {
  title: string;
  text: string;
  action: string;
  images: [string, string];
  onAction: () => void;
}) {
  return (
    <article className="flex min-h-[176px] items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-[#10284f] to-[#07111e] p-5 text-white">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-tight">{title}</h2>
        <p className="mt-2 text-sm text-slate-300">{text}</p>
        <button type="button" onClick={onAction} className="mt-5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold">
          {action}
        </button>
      </div>
      <div className="relative h-[140px] w-[132px] shrink-0">
        <img src={images[0]} alt="" className="absolute bottom-0 left-0 h-[124px] w-[68px] object-contain" />
        <img src={images[1]} alt="" className="absolute bottom-0 right-0 h-[136px] w-[72px] object-contain" />
      </div>
    </article>
  );
}

function Pin() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="1.6" />
    </svg>
  );
}
