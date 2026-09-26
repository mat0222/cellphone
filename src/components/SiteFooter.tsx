import { Logo } from "./Logo";
import type { View } from "../data";

export function SiteFooter({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <footer className="bg-[#07111e] text-white">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light subtitle="Tu mundo en un solo lugar" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Encontrá tu próximo celular con la mejor calidad, las últimas novedades y garantía oficial.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold">Contacto</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><a className="hover:text-white" href="tel:+543515551234">351 555-1234</a></li>
            <li><a className="hover:text-white" href="mailto:info@cellzone.com">info@cellzone.com</a></li>
            <li>Av. San Martín 1234, Córdoba</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Atención</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>De lunes a sábado</li>
            <li>Envíos a todo el país</li>
            <li>Garantía oficial</li>
            <li>Atención personalizada</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Tu compra</h2>
          <div className="mt-3 flex flex-col items-start gap-2 text-sm">
            <button type="button" className="text-slate-300 hover:text-white" onClick={() => onNavigate("productos")}>Ver celulares</button>
            <button type="button" className="text-slate-300 hover:text-white" onClick={() => onNavigate("combos")}>Ver combos</button>
            <button type="button" className="text-slate-300 hover:text-white" onClick={() => onNavigate("carrito")}>Revisar carrito</button>
            <button type="button" className="text-slate-300 hover:text-white" onClick={() => onNavigate("contacto")}>Escribirnos</button>
            <button type="button" className="text-slate-300 hover:text-white" onClick={() => onNavigate("login")}>Panel de administración</button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1180px] px-6 py-4 text-xs text-slate-500">© 2026 CellZone. Av. San Martín 1234, Córdoba.</p>
      </div>
    </footer>
  );
}
