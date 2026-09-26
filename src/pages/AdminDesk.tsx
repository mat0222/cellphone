import { useState, type ReactNode } from "react";
import { PhonePair } from "../components/RealPhoneArt";
import { adminProducts, formatPrice, kpis, salesRows, topSellers, users, type AdminSection } from "../data";

type Row = Record<string, string>;

const desks: Record<string, { title: string; crumb: string; columns: string[]; rows: Row[] }> = {
  ventas: {
    title: "Ventas",
    crumb: "Panel / Ventas",
    columns: ["Pedido", "Cliente", "Producto", "Total", "Estado"],
    rows: salesRows.map((sale) => ({ Pedido: sale.order, Cliente: sale.customer, Producto: sale.product, Total: formatPrice(sale.total), Estado: sale.status })),
  },
  marcas: {
    title: "Marcas",
    crumb: "Panel / Marcas",
    columns: ["Marca", "Productos", "Estado"],
    rows: [
      ["Apple", "2"], ["Samsung", "2"], ["Motorola", "2"], ["Xiaomi", "2"], ["Realme", "1"], ["TCL", "0"],
    ].map(([Marca, Productos]) => ({ Marca, Productos, Estado: "Activo" })),
  },
  clientes: {
    title: "Clientes",
    crumb: "Panel / Clientes",
    columns: ["Nombre", "Email", "Pedidos", "Estado"],
    rows: [
      { Nombre: "Juan Pérez", Email: "juan@cellzone.com", Pedidos: "2", Estado: "Activo" },
      { Nombre: "María López", Email: "maria@cellzone.com", Pedidos: "1", Estado: "Activo" },
      { Nombre: "Administrador", Email: "admin@cellzone.com", Pedidos: "1", Estado: "Activo" },
    ],
  },
  proveedores: {
    title: "Proveedores",
    crumb: "Panel / Proveedores",
    columns: ["Proveedor", "Contacto", "Marca", "Estado"],
    rows: ["Apple", "Samsung", "Motorola", "Xiaomi", "Realme", "TCL"].map((brand) => ({
      Proveedor: brand,
      Contacto: "info@cellzone.com",
      Marca: brand,
      Estado: "Activo",
    })),
  },
  inventario: {
    title: "Inventario",
    crumb: "Panel / Inventario",
    columns: ["Producto", "Stock", "Mínimo", "Estado"],
    rows: adminProducts.map((product) => ({ Producto: product.name, Stock: String(product.stock), Mínimo: "5", Estado: product.stock > 5 ? "Activo" : "Bajo" })),
  },
  promociones: {
    title: "Promociones",
    crumb: "Panel / Promociones",
    columns: ["Promoción", "Descuento", "Producto", "Estado"],
    rows: [
      { Promoción: "iPhone 15", Descuento: "15%", Producto: "iPhone 15 128GB", Estado: "Activo" },
      { Promoción: "Galaxy A54", Descuento: "10%", Producto: "Samsung Galaxy A54 128GB", Estado: "Activo" },
      { Promoción: "Edge 40", Descuento: "10%", Producto: "Motorola Edge 40 256GB", Estado: "Activo" },
      { Promoción: "Redmi Note 12", Descuento: "10%", Producto: "Xiaomi Redmi Note 12 128GB", Estado: "Activo" },
    ],
  },
  envios: {
    title: "Envíos",
    crumb: "Panel / Envíos",
    columns: ["Pedido", "Destino", "Estado"],
    rows: salesRows.map((sale) => ({ Pedido: sale.order, Destino: "Córdoba", Estado: sale.status === "Entregado" ? "Entregado" : "En camino" })),
  },
  cupones: {
    title: "Cupones / Puntos",
    crumb: "Panel / Cupones / Puntos",
    columns: ["Paso", "Beneficio", "Detalle", "Estado"],
    rows: [
      { Paso: "1", Beneficio: "Registrate", Detalle: "Creá tu cuenta en la tienda.", Estado: "Activo" },
      { Paso: "2", Beneficio: "Comprá", Detalle: "Por cada $1.000, sumás.", Estado: "Activo" },
      { Paso: "3", Beneficio: "Acumulá", Detalle: "Llegá a los puntos.", Estado: "Activo" },
      { Paso: "4", Beneficio: "Canjeá", Detalle: "Por descuentos, accesorios y más.", Estado: "Activo" },
    ],
  },
};

export function AdminDesk({ section }: { section: AdminSection }) {
  if (section === "reportes") return <Reports />;
  if (section === "usuarios") return <UsersDesk />;
  if (section === "configuracion") return <SettingsDesk />;
  const desk = desks[section];
  if (!desk) return null;
  return <CrudTable {...desk} addLabel={`+ Agregar ${desk.title.toLowerCase()}`} />;
}

function CrudTable({ title, crumb, columns, rows, addLabel }: { title: string; crumb: string; columns: string[]; rows: Row[]; addLabel: string }) {
  const [items, setItems] = useState(rows);
  const [draft, setDraft] = useState<Row | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [notice, setNotice] = useState("");

  const openNew = () => {
    setEditIndex(null);
    setDraft(Object.fromEntries(columns.map((column) => [column, column === "Estado" ? "Activo" : ""])));
  };

  const save = () => {
    if (!draft || columns.some((column) => !draft[column].trim())) return;
    setItems((current) => editIndex === null ? [draft, ...current] : current.map((item, index) => index === editIndex ? draft : item));
    setDraft(null);
    setNotice(editIndex === null ? "Registro agregado." : "Cambios guardados.");
  };

  return (
    <Screen title={title} crumb={crumb} notice={notice} action={<button type="button" onClick={openNew} className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white">{addLabel}</button>}>
      <Table columns={columns} rows={items} onEdit={(index) => { setEditIndex(index); setDraft(items[index]); }} onDelete={(index) => { setItems((current) => current.filter((_, item) => item !== index)); setNotice("Registro eliminado."); }} />
      {draft ? <Editor columns={columns} draft={draft} onChange={setDraft} onSave={save} onClose={() => setDraft(null)} /> : null}
    </Screen>
  );
}

function UsersDesk() {
  const [items, setItems] = useState<Row[]>(users.map((user) => ({ Nombre: user.name, Email: user.email, Rol: user.role, Estado: "Activo" })));
  const [draft, setDraft] = useState<Row | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const columns = ["Nombre", "Email", "Rol", "Estado"];

  return (
    <Screen title="Usuarios" crumb="Panel / Usuarios" notice={notice} action={<button type="button" className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white" onClick={() => { setEditIndex(null); setDraft({ Nombre: "", Email: "", Rol: "Vendedor", Estado: "Activo" }); }}>+ Agregar usuario</button>}>
      <Table columns={columns} rows={items} onEdit={(index) => { setEditIndex(index); setDraft(items[index]); }} onDelete={(index) => { setItems((current) => current.filter((_, item) => item !== index)); setNotice("Usuario eliminado."); }} />
      {draft ? <Editor columns={columns} draft={draft} onChange={setDraft} onSave={() => {
        if (columns.some((column) => !draft[column].trim())) return;
        setItems((current) => editIndex === null ? [draft, ...current] : current.map((item, index) => index === editIndex ? draft : item));
        setDraft(null);
        setNotice("Cambios guardados.");
      }} onClose={() => setDraft(null)} /> : null}
    </Screen>
  );
}

function SettingsDesk() {
  const [tab, setTab] = useState("General");
  const [saved, setSaved] = useState("");
  const tabs = ["General", "Pagos", "Envíos", "Puntos"];

  return (
    <Screen title="Configuración" crumb="Datos de la tienda" notice={saved}>
      <div className="flex flex-wrap gap-2 text-sm">
        {tabs.map((item) => (
          <button key={item} type="button" onClick={() => setTab(item)} className={`rounded-lg px-3 py-1.5 ${tab === item ? "bg-blue-50 font-semibold text-brand" : "text-slate-500"}`}>{item}</button>
        ))}
      </div>
      {tab === "General" ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Field label="Nombre de la tienda" value="CellZone" />
          <Field label="Descripción" value="Tu mundo en un solo lugar" />
          <Field label="Teléfono" value="351 555-1234" />
          <Field label="Email de contacto" value="info@cellzone.com" />
          <Field label="Email de ventas" value="ventas@cellzone.com" />
          <Field label="Dirección" value="Av. San Martín 1234, Córdoba" />
        </div>
      ) : null}
      {tab === "Pagos" ? <p className="mt-4 text-sm text-slate-600">Tarjeta, transferencia o efectivo.</p> : null}
      {tab === "Envíos" ? <p className="mt-4 text-sm text-slate-600">Envíos a todo el país. Rápido y seguro.</p> : null}
      {tab === "Puntos" ? <p className="mt-4 text-sm text-slate-600">Por cada $1.000, sumás. Canjeá por descuentos, accesorios y más.</p> : null}
      <div className="mt-4 flex justify-end">
        <button type="button" className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white" onClick={() => setSaved("Cambios guardados.")}>Guardar cambios</button>
      </div>
    </Screen>
  );
}

function Reports() {
  const [range, setRange] = useState("Últimos 7 días");
  return (
    <Screen title="Reportes" crumb="Panel / Reportes">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => <article key={kpi.label} className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{kpi.label}</p><p className="text-xl font-extrabold">{kpi.value}</p></article>)}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h3 className="font-bold">Resumen de ventas</h3>
        <select value={range} onChange={(event) => setRange(event.target.value)} className="rounded-lg border border-slate-200 px-2 py-1 text-xs">
          <option>Últimos 7 días</option>
          <option>Hoy</option>
        </select>
      </div>
      <p className="mt-3 text-sm text-slate-500">{range === "Hoy" ? "Ventas hoy: $ 1.245.660" : "Resumen de los últimos 7 días."}</p>
      <ul className="mt-4 space-y-2">
        {topSellers.map((item) => (
          <li key={item.name} className="flex items-center gap-3 text-sm">
            <PhonePair model={item.model} className="h-10 w-10" />
            <span className="flex-1">{item.name}</span>
            <span className="text-slate-400">{item.units} unidades</span>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

function Screen({ title, crumb, notice, action, children }: { title: string; crumb: string; notice?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="bg-[#07111e] px-6 py-4 pl-16 text-white lg:pl-6"><h1 className="text-xl font-bold">{title}</h1></div>
      <section className="m-5 rounded-2xl bg-white p-4 text-[#142033] shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><h2 className="text-lg font-bold">{title}</h2><p className="text-xs text-slate-400">{crumb}</p></div>
          {action}
        </div>
        {notice ? <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{notice}</p> : null}
        <div className="mt-3">{children}</div>
      </section>
    </div>
  );
}

function Table({ columns, rows, onEdit, onDelete }: { columns: string[]; rows: Row[]; onEdit: (index: number) => void; onDelete: (index: number) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="text-xs text-slate-400"><tr>{columns.map((column) => <th key={column} className="py-2 font-medium">{column}</th>)}<th className="font-medium">Acciones</th></tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[columns[0]]}-${index}`} className="border-t border-slate-100">
              {columns.map((column) => <td key={column} className="py-3">{column === "Estado" ? <Status value={row[column]} /> : row[column]}</td>)}
              <td><span className="flex gap-1.5"><IconButton label="Editar" onClick={() => onEdit(index)} /> <IconButton label="Eliminar" danger onClick={() => onDelete(index)} /></span></td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">No hay registros.</p> : null}
    </div>
  );
}

function Editor({ columns, draft, onChange, onSave, onClose }: { columns: string[]; draft: Row; onChange: (row: Row) => void; onSave: () => void; onClose: () => void }) {
  return (
    <form className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); onSave(); }}>
      {columns.map((column) => (
        <label key={column} className="text-xs text-slate-500">{column}
          <input value={draft[column]} onChange={(event) => onChange({ ...draft, [column]: event.target.value })} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-[#142033]" />
        </label>
      ))}
      <div className="flex items-end gap-2">
        <button className="h-10 rounded-lg bg-brand px-4 text-sm font-semibold text-white">Guardar</button>
        <button type="button" onClick={onClose} className="h-10 rounded-lg border border-slate-200 px-4 text-sm">Cancelar</button>
      </div>
    </form>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return <label className="block text-xs text-slate-500">{label}<input defaultValue={value} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-[#142033]" /></label>;
}

function Status({ value }: { value: string }) {
  const ok = value === "Activo" || value === "Entregado";
  return <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${ok ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-700"}`}>{value}</span>;
}

function IconButton({ label, onClick, danger = false }: { label: string; onClick: () => void; danger?: boolean }) {
  return <button type="button" aria-label={label} onClick={onClick} className={`grid h-7 w-7 place-items-center rounded-md text-xs ${danger ? "bg-red-50 text-red-500" : "bg-blue-50 text-brand"}`}>{danger ? "🗑" : "✎"}</button>;
}
