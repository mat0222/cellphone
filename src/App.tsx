import { useState } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { AccountDialog, InfoDialog, ProductDialog } from "./components/ShopDialogs";
import { StoreHeader } from "./components/StoreHeader";
import { catalogProducts, type AdminSection, type CartItem, type View } from "./data";
import { AdminApp } from "./pages/AdminPages";
import { CatalogPage } from "./pages/CatalogPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { CartPage, CombosPage, ContactPage } from "./pages/PublicPages";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [adminSection, setAdminSection] = useState<AdminSection>("inicio");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [promos, setPromos] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [info, setInfo] = useState<"puntos" | "cuotas" | null>(null);
  const [notice, setNotice] = useState("");
  const [account, setAccount] = useState(false);

  const product = catalogProducts.find((item) => item.name === active) ?? null;
  const count = cart.reduce((total, item) => total + item.qty, 0);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const addToCart = (name: string, qty: number) => {
    setCart((current) => {
      const found = current.find((item) => item.name === name);
      if (!found) return [...current, { name, qty }];
      return current.map((item) => item.name === name ? { ...item, qty: item.qty + qty } : item);
    });
    setActive(null);
    notify("Agregado al carrito.");
  };

  const toggleFavorite = (name: string) => {
    setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  };

  if (view === "login") return <LoginPage onEnter={() => { setAdminSection("inicio"); setView("admin"); }} onBack={() => setView("home")} />;
  if (view === "admin") return <AdminApp section={adminSection} onSection={setAdminSection} onLeave={() => setView("home")} />;

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#142033]">Saltar al contenido</a>
      <StoreHeader view={view} query={query} cartCount={count} accountOpen={account} onQuery={setQuery} onNavigate={setView} onAccount={() => setAccount(true)} />
      <div id="contenido">
      {view === "home" ? (
        <HomePage
          onNavigate={setView}
          onBrand={(value) => { setBrand(value); setPromos(false); setView("productos"); }}
          onPromos={() => { setBrand(""); setPromos(true); setView("productos"); }}
          onOpen={setActive}
          onInfo={setInfo}
          favorites={favorites}
          onFavorite={toggleFavorite}
        />
      ) : null}
      {view === "productos" ? (
        <CatalogPage
          key={`${brand}-${promos}`}
          query={query}
          brand={brand}
          promos={promos}
          favorites={favorites}
          onNavigate={setView}
          onOpen={setActive}
          onFavorite={toggleFavorite}
          onReset={() => { setBrand(""); setPromos(false); }}
        />
      ) : null}
      {view === "combos" ? <CombosPage onNavigate={setView} onAdd={(name) => addToCart(name, 1)} /> : null}
      {view === "contacto" ? <ContactPage onNavigate={setView} /> : null}
      {view === "carrito" ? (
        <CartPage
          items={cart}
          onNavigate={setView}
          onQty={(name, qty) => setCart((current) => current.map((item) => item.name === name ? { ...item, qty } : item))}
          onRemove={(name) => setCart((current) => current.filter((item) => item.name !== name))}
          onCheckout={() => setCart([])}
        />
      ) : null}
      </div>
      <SiteFooter onNavigate={setView} />
      {account ? (
        <AccountDialog
          favorites={favorites}
          onOpen={(name) => { setAccount(false); setActive(name); }}
          onCart={() => { setAccount(false); setView("carrito"); }}
          onLogin={() => { setAccount(false); setView("login"); }}
          onClose={() => setAccount(false)}
        />
      ) : null}
      {product ? <ProductDialog product={product} favorite={favorites.includes(product.name)} onFavorite={() => toggleFavorite(product.name)} onAdd={(qty) => addToCart(product.name, qty)} onClose={() => setActive(null)} /> : null}
      {info ? <InfoDialog kind={info} onClose={() => setInfo(null)} onProducts={() => { setInfo(null); setPromos(false); setView("productos"); }} /> : null}
      {notice ? <p role="status" className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#071833] px-4 py-2 text-sm font-semibold text-white shadow-lg">{notice}</p> : null}
    </div>
  );
}
