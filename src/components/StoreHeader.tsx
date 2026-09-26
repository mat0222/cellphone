import { useState } from "react";
import { Logo } from "./Logo";
import type { View } from "../data";

export function StoreHeader({
  view,
  query,
  cartCount,
  onQuery,
  onNavigate,
  onAccount,
  accountOpen,
}: {
  view: View;
  query: string;
  cartCount: number;
  accountOpen: boolean;
  onQuery: (value: string) => void;
  onNavigate: (view: View) => void;
  onAccount: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const item = (id: View, label: string) => (
    <button
      type="button"
      onClick={() => { onNavigate(id); setMenuOpen(false); }}
      aria-current={view === id ? "page" : undefined}
      className={`rounded-md px-1 py-2 text-sm font-medium ${view === id ? "text-white" : "text-slate-300 hover:text-white"}`}
    >
      <span className={view === id ? "border-b-2 border-brand pb-1" : ""}>{label}</span>
    </button>
  );

  return (
    <header className="relative z-30 bg-[#071426] text-white">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center gap-5 px-4">
        <button type="button" onClick={() => onNavigate("home")} className="shrink-0">
          <Logo light subtitle="Tu mundo en un solo lugar" />
        </button>
        <nav className="hidden items-center gap-5 lg:flex">
          {item("home", "Inicio")}
          {item("productos", "Productos")}
          {item("combos", "Combos")}
          {item("contacto", "Contacto")}
        </nav>
        <form
          className="ml-auto hidden min-w-0 max-w-[360px] flex-1 md:block"
          onSubmit={(event) => {
            event.preventDefault();
            onNavigate("productos");
          }}
        >
          <label htmlFor="buscar" className="sr-only">Buscar celulares, marcas o modelos</label>
          <input
            id="buscar"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Buscar celulares, marcas, modelos..."
            className="h-11 w-full rounded-full border border-white/10 bg-[#0d2138] px-4 text-sm text-white transition focus:border-brand placeholder:text-slate-400"
          />
        </form>
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <button type="button" aria-label="Tu cuenta" aria-haspopup="dialog" aria-expanded={accountOpen} onClick={onAccount} className="grid h-11 w-11 place-items-center rounded-lg text-slate-200">
            <UserIcon />
          </button>
          <button type="button" aria-label={cartCount > 0 ? `Carrito, ${cartCount} ${cartCount === 1 ? "producto" : "productos"}` : "Carrito vacío"} onClick={() => onNavigate("carrito")} className="relative grid h-11 w-11 place-items-center rounded-lg text-slate-200">
            <CartIcon />
            {cartCount > 0 ? <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold">{cartCount}</span> : null}
          </button>
          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 sm:block"
          >
            Ingresar
          </button>
          <button type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} aria-controls="menu-movil" onClick={() => setMenuOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 lg:hidden">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div id="menu-movil" className="absolute inset-x-0 top-[72px] border-t border-white/10 bg-[#071426] p-4 shadow-xl lg:hidden">
          <nav className="flex flex-col items-start gap-4">
            {item("home", "Inicio")}
            {item("productos", "Productos")}
            {item("combos", "Combos")}
            {item("contacto", "Contacto")}
            <button type="button" onClick={() => onNavigate("login")} className="w-full rounded-lg bg-brand py-2 text-sm font-semibold sm:hidden">Ingresar</button>
          </nav>
          <form className="mt-4 md:hidden" onSubmit={(event) => { event.preventDefault(); onNavigate("productos"); setMenuOpen(false); }}>
            <label htmlFor="buscar-movil" className="sr-only">Buscar celulares, marcas o modelos</label>
            <input id="buscar-movil" value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Buscar celulares, marcas, modelos..." className="h-11 w-full rounded-full bg-[#0d2138] px-4 text-sm" />
          </form>
        </div>
      ) : null}
    </header>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19.2c1.4-3 3.8-4.4 7-4.4s5.6 1.4 7 4.4" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 7h15l-1.6 8.2H8.2L6 7Z" />
      <path d="M6 7 5 4H2" strokeLinecap="round" />
      <circle cx="9" cy="19.5" r="1.2" fill="currentColor" />
      <circle cx="17" cy="19.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
