import { useState, type FormEvent } from "react";
import { Logo } from "../components/Logo";
import { publicUrl } from "../publicUrl";

export function LoginPage({ onEnter, onBack }: { onEnter: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("admin@cellzone.com");
  const [password, setPassword] = useState("********");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [reset, setReset] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onEnter();
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#020914] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(132deg,transparent_0%,transparent_25%,#0d3e8b_25.3%,transparent_26%,transparent_51%,#0b3474_51.3%,transparent_52%),radial-gradient(circle_at_72%_37%,#0d3980_0%,#07182d_30%,transparent_58%)]" />
      <img
        src={publicUrl("/assets/phones/iphone-15.webp")}
        alt=""
        className="pointer-events-none absolute right-[4%] top-[4%] hidden h-[92%] w-[48%] rotate-[8deg] object-contain opacity-45 drop-shadow-[0_0_70px_rgba(47,123,255,.45)] md:block"
      />

      <button type="button" onClick={onBack} className="absolute left-4 top-4 z-10 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white">
        ← Volver al inicio
      </button>

      <form onSubmit={submit} className="relative w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#07111bcc] p-7 text-white shadow-2xl backdrop-blur">
        <button type="button" onClick={onBack} className="text-left">
          <Logo light subtitle="Tu mundo en un solo lugar" />
        </button>
        <h1 className="mt-7 text-2xl font-bold">Ingresar al panel</h1>
        <p className="mt-1 text-sm text-slate-300">Accedé a tu cuenta para administrar la tienda.</p>

        <label className="mt-6 block text-sm text-slate-200" htmlFor="login-email">
          Usuario o Email
          <input
            id="login-email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 h-11 w-full rounded-lg border border-white/10 bg-[#0c1c31] px-3 text-sm focus:border-[#2f7bff]"
          />
        </label>

        <label className="mt-4 block text-sm text-slate-200" htmlFor="login-password">
          Contraseña
          <span className="relative mt-1.5 block">
            <input
              id="login-password"
              autoComplete="current-password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-lg border border-white/10 bg-[#0c1c31] px-3 pr-12 text-sm focus:border-[#2f7bff]"
            />
            <button type="button" onClick={() => setShow((value) => !value)} className="absolute right-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center text-slate-400" aria-pressed={show} aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            </button>
          </span>
        </label>

        <label className="mt-4 flex items-center gap-2 text-sm text-slate-200">
          <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="accent-brand" />
          Recordarme
        </label>

        <button type="submit" className="mt-5 h-11 w-full rounded-lg bg-brand text-sm font-semibold">
          Ingresar
        </button>
        <button type="button" onClick={() => setReset(true)} className="mt-4 w-full text-center text-xs text-slate-400">¿Olvidaste tu contraseña?</button>
        {reset ? <p role="status" className="mt-2 text-center text-xs text-sky-300">Te enviamos un enlace a admin@cellzone.com.</p> : null}
      </form>
    </div>
  );
}
