import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";
import { PhonePair } from "../components/RealPhoneArt";
import { AdminDesk } from "./AdminDesk";
import {
  adminNav,
  adminProducts,
  categories,
  formatPrice,
  kpis,
  pointSteps,
  topSellers,
  type AdminSection,
} from "../data";

const lightSections = new Set<AdminSection>([
  "productos",
  "categorias",
  "marcas",
  "clientes",
  "proveedores",
  "inventario",
  "promociones",
  "envios",
  "cupones",
  "reportes",
  "usuarios",
  "configuracion",
  "ventas",
]);

export function AdminApp({
  section,
  onSection,
  onLeave,
}: {
  section: AdminSection;
  onSection: (section: AdminSection) => void;
  onLeave: () => void;
}) {
  const light = lightSections.has(section);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#07111e] text-white">
      {menuOpen ? <button aria-label="Cerrar menú" className="fixed inset-0 z-30 bg-black/55 lg:hidden" onClick={() => setMenuOpen(false)} /> : null}
      <aside className={`admin-sidebar fixed inset-y-0 left-0 z-40 flex w-[232px] shrink-0 flex-col border-r border-white/5 bg-[#07111e] transition-transform lg:static ${menuOpen ? "is-open" : ""}`}>
        <button type="button" onClick={onLeave} className="px-4 py-5 text-left">
          <Logo light subtitle="Panel de Administración" />
        </button>
        <nav className="flex-1 space-y-0.5 px-3">
          {adminNav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { onSection(item.id); setMenuOpen(false); }}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm ${
                section === item.id ? "bg-brand font-semibold text-white" : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <NavIcon id={item.id} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="m-3 flex items-center gap-2 rounded-xl bg-white/5 p-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-bold">A</span>
          <span>
            <span className="block text-sm font-semibold">Administrador</span>
            <span className="block text-[11px] text-slate-400">admin@cellzone.com</span>
          </span>
        </div>
      </aside>

      <div className={`min-w-0 flex-1 ${light ? "bg-[#eef3f8] text-[#142033]" : "bg-[#0b1626]"}`}>
        <button type="button" onClick={() => setMenuOpen(true)} className="fixed left-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-lg bg-brand text-white shadow-lg lg:hidden" aria-label="Abrir menú">☰</button>
        {section === "inicio" ? <Dashboard /> : null}
        {section === "productos" || section === "categorias" ? <ProductsAdmin focus={section} /> : null}
        {light && section !== "productos" && section !== "categorias" ? <AdminDesk section={section} /> : null}
      </div>
    </div>
  );
}

function Dashboard() {
  const [range, setRange] = useState("Últimos 7 días");
  return (
    <div className="p-4 pt-16 sm:p-6 sm:pt-16 lg:pt-6">
      <h1 className="text-2xl font-bold">Inicio</h1>
      <p className="text-xs text-slate-400">Panel / Inicio</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="rounded-2xl bg-white p-4 text-[#142033]">
            <div className="flex items-center justify-between text-sm text-slate-500">
              {kpi.label}
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-brand">▦</span>
            </div>
            <p className="mt-2 text-2xl font-extrabold">{kpi.value}</p>
            <p className={`mt-1 text-xs font-semibold ${kpi.up ? "text-emerald-600" : "text-red-500"}`}>
              {kpi.up ? "▲" : "▼"} {kpi.delta}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-2xl bg-white p-4 text-[#142033]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Resumen de ventas</h2>
            <select value={range} onChange={(event) => setRange(event.target.value)} className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500" aria-label="Período">
              <option>Últimos 7 días</option>
              <option>Hoy</option>
            </select>
          </div>
          <SalesChart today={range === "Hoy"} />
        </article>
        <article className="rounded-2xl bg-white p-4 text-[#142033]">
          <h2 className="font-bold">Productos más vendidos</h2>
          <ul className="mt-3 space-y-3">
            {topSellers.map((item) => (
              <li key={item.name} className="flex items-center gap-3">
                <PhonePair model={item.model} className="h-10 w-10 shrink-0" />
                <span className="flex-1 text-sm">{item.name}</span>
                <span className="text-xs text-slate-400">{item.units} unidades</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article id="puntos" className="mt-4 rounded-2xl border border-white/10 bg-[#071833] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">¿Cómo tener puntos?</h2>
            <p className="text-sm text-slate-300">Comprá, sumá puntos y canjeá increíbles beneficios.</p>
          </div>
          <GiftIcon />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {pointSteps.map((step) => (
            <div key={step.n} className="flex min-w-[140px] items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-sm font-bold">{step.n}</span>
              <span>
                <span className="block text-sm font-semibold">{step.title}</span>
                <span className="block text-[11px] text-slate-300">{step.text}</span>
              </span>
            </div>
          ))}
          <button type="button" onClick={() => document.getElementById("puntos")?.scrollIntoView({ behavior: "smooth", block: "center" })} className="ml-auto rounded-lg bg-brand px-3 py-2 text-xs font-semibold">
            Ver beneficios
          </button>
        </div>
      </article>
    </div>
  );
}

function SalesChart({ today = false }: { today?: boolean }) {
  const values = today ? [1180000] : [620000, 900000, 840000, 1180000, 880000, 1320000, 1180000];
  const labels = today ? ["16/09"] : ["10/09", "11/09", "12/09", "13/09", "14/09", "15/09", "16/09"];
  const max = 2000000;
  const w = 560;
  const h = 180;
  const step = values.length > 1 ? w / (values.length - 1) : 0;
  const coords = values.map((value, index) => [index * step, h - (value / max) * h] as const);
  const line = coords.map((point, index) => `${index === 0 ? "M" : "L"}${point[0]},${point[1]}`).join(" ");
  return (
    <div className="mt-3">
      <div className="flex gap-2">
        <div className="flex h-[180px] flex-col justify-between text-[10px] text-slate-400">
          <span>$2.000.000</span>
          <span>$1.500.000</span>
          <span>$1.000.000</span>
          <span>$500.000</span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-[180px] flex-1">
          {[0, 1, 2, 3].map((row) => (
            <line key={row} x1="0" x2={w} y1={(h / 4) * row} y2={(h / 4) * row} stroke="#e8eef5" />
          ))}
          <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#sales)" opacity="0.9" />
          <path d={line} fill="none" stroke="#2f7bff" strokeWidth="3" />
          <defs>
            <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2f7bff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2f7bff" stopOpacity="0.02" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mt-1 flex justify-between pl-16 text-[10px] text-slate-400">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function ProductsAdmin({ focus }: { focus: "productos" | "categorias" }) {
  const [rows, setRows] = useState(adminProducts);
  const [cats, setCats] = useState(categories);
  const [notice, setNotice] = useState("");
  const [productForm, setProductForm] = useState<{ name: string; brand: string; price: string; stock: string; index: number | null } | null>(null);
  const [categoryForm, setCategoryForm] = useState<{ name: string; description: string; products: string; index: number | null } | null>(null);
  useEffect(() => {
    document.getElementById(focus === "categorias" ? "admin-categorias" : "admin-productos")?.scrollIntoView({ block: "start" });
  }, [focus]);

  return (
    <div>
      <div className="bg-[#07111e] px-6 py-4 pl-16 text-white lg:pl-6">
        <h1 className="text-xl font-bold">Productos</h1>
      </div>
      <div className="space-y-4 p-5">
        <section id="admin-productos" className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Productos</h2>
              <p className="text-xs text-slate-400">Panel / Productos</p>
            </div>
            <button type="button" onClick={() => setProductForm({ name: "", brand: "Apple", price: "", stock: "", index: null })} className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white">
              + Agregar producto
            </button>
          </div>
          {notice ? <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p> : null}
          {productForm ? (
            <form className="mt-3 grid gap-2 rounded-xl bg-slate-50 p-3 md:grid-cols-4" onSubmit={(event) => {
              event.preventDefault();
              const price = Number(productForm.price);
              const stock = Number(productForm.stock);
              if (!productForm.name.trim() || !price || !stock) return;
              const next = { name: productForm.name, brand: productForm.brand, price, stock, model: "iphone15" as const };
              setRows((current) => productForm.index === null ? [next, ...current] : current.map((item, index) => index === productForm.index ? { ...item, ...next, model: item.model } : item));
              setProductForm(null);
              setNotice(productForm.index === null ? "Producto agregado." : "Producto actualizado.");
            }}>
              <input required value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} placeholder="Producto" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
              <input required value={productForm.brand} onChange={(event) => setProductForm({ ...productForm, brand: event.target.value })} placeholder="Marca" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
              <input required value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} placeholder="Precio" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
              <input required value={productForm.stock} onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })} placeholder="Stock" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
              <button className="h-10 rounded-lg bg-brand text-sm font-semibold text-white">Guardar</button>
            </form>
          ) : null}
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs text-slate-400">
                <tr>
                  <th className="py-2 font-medium">Imagen</th>
                  <th className="font-medium">Producto</th>
                  <th className="font-medium">Marca</th>
                  <th className="font-medium">Precio</th>
                  <th className="font-medium">Stock</th>
                  <th className="font-medium">Estado</th>
                  <th className="font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((product, index) => (
                  <tr key={`${product.name}-${index}`} className="border-t border-slate-100">
                    <td className="py-2">
                      <PhonePair model={product.model} className="h-10 w-10" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-600">Activo</span>
                    </td>
                    <td>
                      <Actions
                        onEdit={() => setProductForm({ name: product.name, brand: product.brand, price: String(product.price), stock: String(product.stock), index })}
                        onDelete={() => { setRows((current) => current.filter((_, item) => item !== index)); setNotice("Producto eliminado."); }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager pages={[1]} />
        </section>

        <section id="admin-categorias" className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Categorías</h2>
              <p className="text-xs text-slate-400">Panel / Productos</p>
            </div>
            <button type="button" onClick={() => setCategoryForm({ name: "", description: "", products: "0", index: null })} className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white">
              + Agregar categoría
            </button>
          </div>
          {categoryForm ? (
            <form className="mt-3 grid gap-2 rounded-xl bg-slate-50 p-3 md:grid-cols-3" onSubmit={(event) => {
              event.preventDefault();
              if (!categoryForm.name.trim()) return;
              const next = { name: categoryForm.name, description: categoryForm.description, products: Number(categoryForm.products) || 0 };
              setCats((current) => categoryForm.index === null ? [next, ...current] : current.map((item, index) => index === categoryForm.index ? next : item));
              setCategoryForm(null);
              setNotice(categoryForm.index === null ? "Categoría agregada." : "Categoría actualizada.");
            }}>
              <input required value={categoryForm.name} onChange={(event) => setCategoryForm({ ...categoryForm, name: event.target.value })} placeholder="Nombre" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
              <input required value={categoryForm.description} onChange={(event) => setCategoryForm({ ...categoryForm, description: event.target.value })} placeholder="Descripción" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
              <input required value={categoryForm.products} onChange={(event) => setCategoryForm({ ...categoryForm, products: event.target.value })} placeholder="Productos" className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
              <button className="h-10 rounded-lg bg-brand text-sm font-semibold text-white">Guardar</button>
            </form>
          ) : null}
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs text-slate-400">
                <tr>
                  <th className="py-2" />
                  <th className="font-medium">Nombre</th>
                  <th className="font-medium">Descripción</th>
                  <th className="font-medium">Productos</th>
                  <th className="font-medium">Estado</th>
                  <th className="font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cats.map((category, index) => (
                  <tr key={`${category.name}-${index}`} className="border-t border-slate-100">
                    <td className="py-3">
                      <input type="checkbox" className="accent-brand" />
                    </td>
                    <td>{category.name}</td>
                    <td className="text-slate-500">{category.description}</td>
                    <td>{category.products}</td>
                    <td>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-600">Activo</span>
                    </td>
                    <td>
                      <Actions
                        onEdit={() => setCategoryForm({ name: category.name, description: category.description, products: String(category.products), index })}
                        onDelete={() => { setCats((current) => current.filter((_, item) => item !== index)); setNotice("Categoría eliminada."); }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager pages={[1]} />
        </section>
      </div>
    </div>
  );
}

function Actions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <span className="flex gap-1.5">
      <button type="button" aria-label="Editar" onClick={onEdit} className="grid h-7 w-7 place-items-center rounded-md bg-blue-50 text-brand">✎</button>
      <button type="button" aria-label="Eliminar" onClick={onDelete} className="grid h-7 w-7 place-items-center rounded-md bg-red-50 text-red-500">🗑</button>
    </span>
  );
}

function Pager({ pages }: { pages: number[] }) {
  return (
    <div className="mt-3 flex justify-end gap-1 text-sm">
      <span className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-400">‹</span>
      {pages.map((page) => (
        <span key={page} className={`grid h-8 w-8 place-items-center rounded-lg ${page === 1 ? "bg-brand text-white" : "border border-slate-200"}`}>
          {page}
        </span>
      ))}
      <span className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-400">›</span>
    </div>
  );
}

function NavIcon({ id }: { id: AdminSection }) {
  const paths: Record<AdminSection, string> = {
    inicio: "M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z",
    ventas: "M4 16l5-5 3 3 7-8",
    productos: "M4 7h16v12H4zM8 7V5h8v2",
    categorias: "M4 6h7v5H4zM13 6h7v5h-7zM4 13h7v5H4zM13 13h7v5h-7z",
    marcas: "M12 3l2.2 4.6L19 8.2l-3.5 3.4.8 4.9L12 14.8 7.7 16.5l.8-4.9L5 8.2l4.8-.6L12 3Z",
    clientes: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.5 19c.6-2.5 2.4-4 4.5-4s3.9 1.5 4.5 4M14 15c1.8 0 3.3 1.1 4 3",
    proveedores: "M3 8h13v10H3zM16 11h3l2 3v4h-5",
    inventario: "M4 7l8-3 8 3-8 3-8-3ZM4 7v10l8 3 8-3V7",
    promociones: "M4 12l8-8h6v6l-8 8-6-6Z",
    envios: "M3 16V8h11v8M14 12h4l3 3v1h-7M7 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
    cupones: "M4 8h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4V8Z",
    reportes: "M5 19V10M10 19V5M15 19v-7M20 19V8",
    usuarios: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 19c.7-2.6 2.6-4 5-4s4.3 1.4 5 4",
    configuracion: "M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5ZM12 3v2.2M12 18.8V21M4.8 6.2l1.6 1.6M17.6 16.2l1.6 1.6M3 12h2.2M18.8 12H21M4.8 17.8l1.6-1.6M17.6 7.8l1.6-1.6",
  };
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d={paths[id]} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 text-brand" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 16h28v7H6zM9 23h22v13H9zM20 16v20" />
      <path d="M20 16c-6 0-10-2-10-6 0-2 1.5-4 4-4 4 0 6 10 6 10ZM20 16c6 0 10-2 10-6 0-2-1.5-4-4-4-4 0-6 10-6 10Z" />
    </svg>
  );
}
