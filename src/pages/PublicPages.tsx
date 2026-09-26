import { useEffect, useRef, useState, type FormEvent } from "react";
import { PhonePair } from "../components/RealPhoneArt";
import { combos, findSellable, formatPrice, type CartItem, type View } from "../data";

const channels = [
  { title: "Teléfono", value: "351 555-1234", href: "tel:+543515551234", text: "Llamadas y WhatsApp" },
  { title: "Email", value: "info@cellzone.com", href: "mailto:info@cellzone.com", text: "Respondemos en el día" },
  { title: "Sucursal", value: "Av. San Martín 1234", href: "#sucursal", text: "Córdoba Capital" },
  { title: "Horario", value: "Lun a sáb", href: "#horarios", text: "9 a 19 h · sáb 9 a 14 h" },
];

export function ContactPage({ onNavigate }: { onNavigate: (view: View) => void }) {
  const [sent, setSent] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"nombre" | "email" | "mensaje", string>>>({});
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-8">
      <p className="text-sm text-slate-500">
        <button type="button" className="text-brand" onClick={() => onNavigate("home")}>Inicio</button> / Contacto
      </p>
      <div className="mt-3 max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[#142033]">Contacto</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Consultanos por stock, envíos o financiación. Un asesor de CellZone te responde de lunes a sábado.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((item) => (
          <a key={item.title} href={item.href} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand/40">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">{item.title}</p>
            <p className="mt-2 font-bold text-[#142033]">{item.value}</p>
            <p className="mt-1 text-sm text-slate-500">{item.text}</p>
          </a>
        ))}
      </div>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <form
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const nombre = String(data.get("nombre") ?? "").trim();
            const email = String(data.get("email") ?? "").trim();
            const mensaje = String(data.get("mensaje") ?? "").trim();
            const next: Partial<Record<"nombre" | "email" | "mensaje", string>> = {};
            if (!nombre) next.nombre = "Escribí tu nombre.";
            if (!email) next.email = "Escribí tu email.";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Revisá que el email esté completo.";
            if (!mensaje) next.mensaje = "Contanos tu consulta.";
            setErrors(next);
            if (Object.keys(next).length > 0) {
              window.setTimeout(() => document.getElementById("contacto-errors")?.focus(), 0);
              return;
            }
            setSent("Mensaje enviado. Te respondemos a " + email + ".");
            event.currentTarget.reset();
          }}
        >
          <h2 className="text-lg font-bold text-[#142033]">Escribinos</h2>
          <p className="mt-1 text-sm text-slate-500">Contanos qué modelo estás buscando o qué problema querés resolver.</p>
          {Object.keys(errors).length > 0 ? (
            <div id="contacto-errors" tabIndex={-1} role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
              <h3 className="font-bold text-red-700">Faltan datos</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-600">
                {errors.nombre ? <li><a className="underline" href="#contacto-nombre">{errors.nombre}</a></li> : null}
                {errors.email ? <li><a className="underline" href="#contacto-email">{errors.email}</a></li> : null}
                {errors.mensaje ? <li><a className="underline" href="#contacto-mensaje">{errors.mensaje}</a></li> : null}
              </ul>
            </div>
          ) : null}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-[#142033]" htmlFor="contacto-nombre">Nombre
              <input id="contacto-nombre" name="nombre" autoComplete="name" aria-invalid={Boolean(errors.nombre)} aria-describedby={errors.nombre ? "contacto-nombre-error" : undefined} className="field" placeholder="Tu nombre" />
              {errors.nombre ? <span id="contacto-nombre-error" className="mt-1 block text-sm font-medium text-red-600">{errors.nombre}</span> : null}
            </label>
            <label className="text-sm font-medium text-[#142033]" htmlFor="contacto-email">Email
              <input id="contacto-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contacto-email-error" : undefined} className="field" placeholder="tu@email.com" />
              {errors.email ? <span id="contacto-email-error" className="mt-1 block text-sm font-medium text-red-600">{errors.email}</span> : null}
            </label>
            <label className="text-sm font-medium text-[#142033]" htmlFor="contacto-telefono">Teléfono
              <input id="contacto-telefono" name="telefono" autoComplete="tel" className="field" placeholder="351 000-0000" />
            </label>
            <label className="text-sm font-medium text-[#142033]" htmlFor="contacto-motivo">Motivo
              <select id="contacto-motivo" name="motivo" className="field" defaultValue="Stock">
                <option>Stock</option>
                <option>Envío</option>
                <option>Financiación</option>
                <option>Garantía</option>
              </select>
            </label>
          </div>
          <label className="mt-4 block text-sm font-medium text-[#142033]" htmlFor="contacto-mensaje">Mensaje
            <textarea id="contacto-mensaje" name="mensaje" aria-invalid={Boolean(errors.mensaje)} aria-describedby={errors.mensaje ? "contacto-mensaje-error" : undefined} className="field min-h-32 py-3" placeholder="Ej.: ¿Tienen el iPhone 15 128GB en negro?" />
            {errors.mensaje ? <span id="contacto-mensaje-error" className="mt-1 block text-sm font-medium text-red-600">{errors.mensaje}</span> : null}
          </label>
          <button className="mt-4 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white">Enviar mensaje</button>
          {sent ? <p role="status" className="mt-3 text-sm font-medium text-emerald-600">{sent}</p> : null}
        </form>

        <aside className="space-y-4">
          <div id="sucursal" className="rounded-2xl bg-[#071833] p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Sucursal</p>
            <h2 className="mt-2 text-xl font-bold">CellZone Córdoba</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">Av. San Martín 1234, Córdoba Capital. Retiro en el local el mismo día si el equipo está en stock.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="tel:+543515551234" className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold">Llamar</a>
              <a href="mailto:info@cellzone.com" className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold">Escribir</a>
            </div>
          </div>
          <div id="horarios" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#142033]">Horarios de atención</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-2"><dt className="text-slate-500">Lunes a viernes</dt><dd className="font-semibold">9:00 a 19:00</dd></div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-2"><dt className="text-slate-500">Sábados</dt><dd className="font-semibold">9:00 a 14:00</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Domingos</dt><dd className="font-semibold">Cerrado</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </main>
  );
}

export function CombosPage({ onAdd, onNavigate }: { onAdd: (name: string) => void; onNavigate: (view: View) => void }) {
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-8">
      <p className="text-sm text-slate-500">
        <button type="button" className="text-brand" onClick={() => onNavigate("home")}>Inicio</button> / Combos
      </p>
      <div className="mt-3 max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[#142033]">Combos</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Dos equipos nuevos, con garantía oficial, a un precio menor que comprarlos por separado.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {combos.map((combo) => (
          <article key={combo.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-44 items-center justify-center gap-1 rounded-xl bg-[#f4f7fb]">
              <PhonePair model={combo.models[0]} className="h-36 w-[42%]" />
              <span className="text-xl font-light text-slate-300">+</span>
              <PhonePair model={combo.models[1]} className="h-36 w-[42%]" />
            </div>
            <p className="mt-4 w-fit rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">Ahorrás {formatPrice(combo.oldPrice - combo.price)}</p>
            <h2 className="mt-3 text-lg font-bold text-[#142033]">{combo.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{combo.detail}</p>
            <p className="mt-3 text-sm text-slate-400 line-through">{formatPrice(combo.oldPrice)}</p>
            <p className="text-2xl font-extrabold text-brand">{formatPrice(combo.price)}</p>
            <button type="button" onClick={() => onAdd(combo.name)} className="mt-4 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white">Agregar al carrito</button>
          </article>
        ))}
      </div>
    </main>
  );
}

const payments = [
  { id: "Tarjeta", text: "Crédito o débito" },
  { id: "Transferencia", text: "Bancaria" },
  { id: "Efectivo", text: "En sucursal" },
];

export function CartPage({ items, onNavigate, onQty, onRemove, onCheckout }: { items: CartItem[]; onNavigate: (view: View) => void; onQty: (name: string, qty: number) => void; onRemove: (name: string) => void; onCheckout: () => void }) {
  const [checkout, setCheckout] = useState(false);
  const [pago, setPago] = useState("Tarjeta");
  const [errors, setErrors] = useState<Partial<Record<"nombre" | "apellido" | "email" | "direccion", string>>>({});
  const [order, setOrder] = useState<{ nombre: string; apellido: string; email: string; direccion: string; pago: string; total: number; code: string } | null>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const lines = items.map((item) => ({ ...item, product: findSellable(item.name) })).filter((item) => item.product);
  const total = lines.reduce((sum, item) => sum + item.product!.price * item.qty, 0);

  const confirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nombre = String(data.get("nombre") ?? "").trim();
    const apellido = String(data.get("apellido") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const direccion = String(data.get("direccion") ?? "").trim();
    const next: Partial<Record<"nombre" | "apellido" | "email" | "direccion", string>> = {};
    if (!nombre) next.nombre = "Escribí tu nombre.";
    if (!apellido) next.apellido = "Escribí tu apellido.";
    if (!email) next.email = "Escribí tu Gmail.";
    else if (!/^[^\s@]+@gmail\.com$/i.test(email)) next.email = "Usá un Gmail, por ejemplo nombre@gmail.com.";
    if (!direccion) next.direccion = "Escribí la dirección de entrega.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      window.setTimeout(() => document.getElementById("checkout-errors")?.focus(), 0);
      return;
    }
    setOrder({ nombre, apellido, email, direccion, pago, total, code: "CZ-" + Date.now().toString().slice(-6) });
    onCheckout();
  };

  useEffect(() => {
    if (!order) return;
    const frame = window.requestAnimationFrame(() => thanksRef.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const dialog = thanksRef.current?.closest("[role='dialog']");
      if (!dialog) return;
      const items = [...dialog.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea")].filter((item) => !item.hasAttribute("disabled"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
    };
  }, [order]);

  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] max-w-[1180px] px-4 py-8">
      <h1 className="text-3xl font-extrabold text-[#142033]">Carrito</h1>
      <p className="mt-1 text-sm text-slate-500"><button className="text-brand" onClick={() => onNavigate("home")}>Inicio</button> / Carrito</p>
      {lines.length === 0 ? (order ? null : (
        <div className="mt-6 rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500">Tu carrito está vacío.</p>
          <div className="mt-4 flex justify-center gap-2">
            <button type="button" onClick={() => onNavigate("productos")} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">Ver productos</button>
            <button type="button" onClick={() => onNavigate("combos")} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-[#142033]">Ver combos</button>
          </div>
        </div>
      )) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {lines.map((item) => (
              <article key={item.name} className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className={`flex items-center ${item.product!.extraModel ? "w-28" : "w-24"}`}>
                  <PhonePair model={item.product!.model} className="h-24 w-14" />
                  {item.product!.extraModel ? <PhonePair model={item.product!.extraModel} className="h-24 w-14" /> : null}
                </div>
                <div className="min-w-[190px] flex-1"><h2 className="font-bold">{item.name}</h2><p className="text-sm text-slate-500">{item.product!.detail}</p><p className="mt-2 text-lg font-extrabold text-brand">{formatPrice(item.product!.price)}</p></div>
                <div className="flex items-center rounded-lg border border-slate-200">
                  <button className="h-11 w-11" aria-label={`Quitar una unidad de ${item.name}`} onClick={() => onQty(item.name, Math.max(1, item.qty - 1))}>−</button>
                  <span className="grid h-11 w-10 place-items-center border-x border-slate-200">{item.qty}</span>
                  <button className="h-11 w-11" aria-label={`Agregar una unidad de ${item.name}`} onClick={() => onQty(item.name, item.qty + 1)}>+</button>
                </div>
                <button type="button" onClick={() => onRemove(item.name)} className="text-sm text-red-500">Quitar</button>
              </article>
            ))}
          </div>
          <aside className="h-fit rounded-2xl bg-[#071833] p-5 text-white shadow-sm">
            <h2 className="text-lg font-bold">Resumen</h2>
            <div className="mt-5 flex justify-between text-sm text-slate-300"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
            <div className="mt-3 flex justify-between text-sm text-slate-300"><span>Envío</span><span>A calcular</span></div>
            <div className="mt-5 flex justify-between border-t border-white/10 pt-4 font-bold"><span>Total</span><span className="text-brand">{formatPrice(total)}</span></div>
            <button type="button" onClick={() => { setCheckout(true); window.setTimeout(() => document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40); }} className="mt-5 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold">{checkout ? "Completar datos" : "Continuar compra"}</button>
          </aside>
          {checkout ? (
            <form id="checkout" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2" onSubmit={confirm}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-[#142033]">Datos para el envío</h2>
                  <p className="mt-1 text-sm text-slate-500">Completá tus datos y elegí cómo querés pagar.</p>
                </div>
                <button type="button" onClick={() => { setCheckout(false); setErrors({}); }} className="text-sm font-semibold text-brand">Volver al resumen</button>
              </div>
              <p className="mt-3 text-sm text-slate-500">Paso 2 de 2 · Tus datos</p>
              {Object.keys(errors).length > 0 ? (
                <div id="checkout-errors" tabIndex={-1} role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                  <h3 className="font-bold text-red-700">Revisá estos datos</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-600">
                    {errors.nombre ? <li><a className="underline" href="#nombre">{errors.nombre}</a></li> : null}
                    {errors.apellido ? <li><a className="underline" href="#apellido">{errors.apellido}</a></li> : null}
                    {errors.email ? <li><a className="underline" href="#email">{errors.email}</a></li> : null}
                    {errors.direccion ? <li><a className="underline" href="#direccion">{errors.direccion}</a></li> : null}
                  </ul>
                </div>
              ) : null}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-[#142033]" htmlFor="nombre">Nombre
                  <input id="nombre" name="nombre" autoComplete="given-name" aria-invalid={Boolean(errors.nombre)} aria-describedby={errors.nombre ? "nombre-error" : undefined} className="field" placeholder="Tu nombre" />
                  {errors.nombre ? <span id="nombre-error" className="mt-1 block text-sm font-medium text-red-600">{errors.nombre}</span> : null}
                </label>
                <label className="text-sm font-medium text-[#142033]" htmlFor="apellido">Apellido
                  <input id="apellido" name="apellido" autoComplete="family-name" aria-invalid={Boolean(errors.apellido)} aria-describedby={errors.apellido ? "apellido-error" : undefined} className="field" placeholder="Tu apellido" />
                  {errors.apellido ? <span id="apellido-error" className="mt-1 block text-sm font-medium text-red-600">{errors.apellido}</span> : null}
                </label>
                <label className="text-sm font-medium text-[#142033]" htmlFor="email">Gmail
                  <input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className="field" placeholder="nombre@gmail.com" />
                  {errors.email ? <span id="email-error" className="mt-1 block text-sm font-medium text-red-600">{errors.email}</span> : null}
                </label>
                <label className="text-sm font-medium text-[#142033]" htmlFor="direccion">Dirección
                  <input id="direccion" name="direccion" autoComplete="street-address" aria-invalid={Boolean(errors.direccion)} aria-describedby={errors.direccion ? "direccion-error" : undefined} className="field" placeholder="Calle, número, ciudad" />
                  {errors.direccion ? <span id="direccion-error" className="mt-1 block text-sm font-medium text-red-600">{errors.direccion}</span> : null}
                </label>
              </div>
              <fieldset className="mt-5">
                <legend className="text-sm font-medium text-[#142033]">Método de pago</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {payments.map((method) => (
                    <label key={method.id} className={`cursor-pointer rounded-xl border px-4 py-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand ${pago === method.id ? "border-brand bg-blue-50" : "border-slate-200 bg-white"}`}>
                      <input type="radio" name="pago" value={method.id} checked={pago === method.id} onChange={() => setPago(method.id)} className="sr-only" />
                      <span className="block font-bold text-[#142033]">{method.id}</span>
                      <span className="mt-1 block text-sm text-slate-500">{method.text}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <button className="mt-5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white">Finalizar compra</button>
            </form>
          ) : null}
        </div>
      )}
      {order ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#07111e]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="gracias-titulo">
          <article className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="bg-[#071833] px-8 pb-8 pt-10 text-center text-white">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand">
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="white" strokeWidth="2.4" aria-hidden="true"><path d="M5 12.5 10 17.5 19 7.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Pedido {order.code}</p>
              <h2 id="gracias-titulo" ref={thanksRef} tabIndex={-1} className="mt-2 text-2xl font-extrabold outline-none">¡Gracias por tu compra, {order.nombre}!</h2>
              <p className="mt-2 text-sm text-slate-300">Ya registramos tu pedido. Te escribimos a {order.email} con el seguimiento.</p>
            </div>
            <div className="space-y-3 px-8 py-6 text-sm">
              <div className="flex justify-between gap-4"><span className="text-slate-500">Cliente</span><span className="font-semibold text-[#142033]">{order.nombre} {order.apellido}</span></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Entrega</span><span className="max-w-[220px] text-right font-semibold text-[#142033]">{order.direccion}</span></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Pago</span><span className="font-semibold text-[#142033]">{order.pago}</span></div>
              <div className="flex justify-between gap-4 border-t border-slate-100 pt-3"><span className="text-slate-500">Total</span><span className="text-lg font-extrabold text-brand">{formatPrice(order.total)}</span></div>
              <button type="button" onClick={() => onNavigate("home")} className="mt-2 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white">Seguir comprando</button>
            </div>
          </article>
        </div>
      ) : null}
    </main>
  );
}
