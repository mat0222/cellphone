import { useId } from "react";

export type PhoneModel = "iphone15" | "a54" | "edge40" | "redmi" | "iphone13" | "s23" | "realme" | "g84" | "poco";

type Camera = "diagonal" | "triple" | "vertical" | "dual" | "ring";
type Cutout = "island" | "notch" | "punch";

type Spec = {
  back: [string, string];
  frame: string;
  screen: [string, string, string];
  camera: Camera;
  cutout: Cutout;
};

const specs: Record<PhoneModel, Spec> = {
  iphone15: { back: ["#d6e6f3", "#9dbfdc"], frame: "#b9cfe2", screen: ["#c7e9ff", "#3d92e6", "#0e3c8c"], camera: "diagonal", cutout: "island" },
  a54: { back: ["#cfc8ec", "#8a82c4"], frame: "#b3acd9", screen: ["#f2b0ff", "#7a42e6", "#1c1a5a"], camera: "vertical", cutout: "punch" },
  edge40: { back: ["#39414f", "#0e1219"], frame: "#4a5262", screen: ["#7cc0ff", "#2163d2", "#0a1d4b"], camera: "dual", cutout: "punch" },
  redmi: { back: ["#eef2f6", "#b6c2cf"], frame: "#cfd8e2", screen: ["#c3e4ff", "#4ba5f2", "#14508c"], camera: "dual", cutout: "punch" },
  iphone13: { back: ["#f4c1d2", "#d67a95"], frame: "#e6a3b8", screen: ["#ff9fc6", "#b3306f", "#39103e"], camera: "diagonal", cutout: "notch" },
  s23: { back: ["#34343a", "#0c0c0f"], frame: "#44444c", screen: ["#5a6578", "#1c2230", "#05070b"], camera: "vertical", cutout: "punch" },
  realme: { back: ["#f1eadf", "#cbbda6"], frame: "#dccfbb", screen: ["#bff3e4", "#3db39a", "#0e5850"], camera: "ring", cutout: "punch" },
  g84: { back: ["#c0457a", "#5a0f31"], frame: "#a3375f", screen: ["#94ceff", "#2e70d8", "#0c2966"], camera: "dual", cutout: "punch" },
  poco: { back: ["#eceef1", "#9ea6b3"], frame: "#c9cfd8", screen: ["#3f4a5c", "#141b28", "#03060c"], camera: "dual", cutout: "punch" },
};

type Box = { x: number; y: number; w: number; h: number; rotate?: number };

function cleanId(id: string) {
  return id.replace(/[^a-zA-Z0-9]/g, "");
}

function Lens({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#0a0c11" stroke="#5b6475" strokeWidth={r * 0.18} />
      <circle cx={cx} cy={cy} r={r * 0.55} fill="#1b2a47" />
      <circle cx={cx - r * 0.22} cy={cy - r * 0.22} r={r * 0.16} fill="#9fc4ff" opacity="0.8" />
    </g>
  );
}

function PhoneBack({ box, spec, uid }: { box: Box; spec: Spec; uid: string }) {
  const { x, y, w, h, rotate = 0 } = box;
  const rx = w * 0.17;
  const body = `${uid}b`;
  const gloss = `${uid}g`;
  const lens = w * 0.085;
  let camera = null;

  if (spec.camera === "diagonal" || spec.camera === "triple") {
    const size = w * (spec.camera === "triple" ? 0.5 : 0.42);
    const mx = w * 0.08;
    const my = w * 0.08;
    const l = spec.camera === "triple" ? w * 0.1 : lens;
    camera = (
      <g>
        <rect x={mx} y={my} width={size} height={size} rx={size * 0.28} fill="#000" opacity="0.22" stroke="#fff" strokeOpacity="0.25" strokeWidth={w * 0.01} />
        {spec.camera === "triple" ? (
          <>
            <Lens cx={mx + size * 0.3} cy={my + size * 0.28} r={l} />
            <Lens cx={mx + size * 0.3} cy={my + size * 0.72} r={l} />
            <Lens cx={mx + size * 0.72} cy={my + size * 0.5} r={l} />
            <circle cx={mx + size * 0.72} cy={my + size * 0.18} r={l * 0.35} fill="#f6f1e1" />
          </>
        ) : (
          <>
            <Lens cx={mx + size * 0.3} cy={my + size * 0.3} r={l} />
            <Lens cx={mx + size * 0.7} cy={my + size * 0.7} r={l} />
          </>
        )}
      </g>
    );
  } else if (spec.camera === "vertical") {
    camera = (
      <g>
        <Lens cx={w * 0.22} cy={w * 0.22} r={lens} />
        <Lens cx={w * 0.22} cy={w * 0.46} r={lens} />
        <Lens cx={w * 0.22} cy={w * 0.7} r={lens} />
      </g>
    );
  } else if (spec.camera === "dual") {
    camera = (
      <g>
        <rect x={w * 0.08} y={w * 0.08} width={w * 0.3} height={w * 0.56} rx={w * 0.1} fill="#000" opacity="0.28" />
        <Lens cx={w * 0.23} cy={w * 0.23} r={lens} />
        <Lens cx={w * 0.23} cy={w * 0.48} r={lens} />
      </g>
    );
  } else {
    camera = (
      <g>
        <circle cx={w * 0.3} cy={w * 0.3} r={w * 0.22} fill="#000" opacity="0.2" stroke="#fff" strokeOpacity="0.3" strokeWidth={w * 0.012} />
        <Lens cx={w * 0.3} cy={w * 0.2} r={lens} />
        <Lens cx={w * 0.3} cy={w * 0.4} r={lens} />
      </g>
    );
  }

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} ${w / 2} ${h / 2})`}>
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={spec.back[0]} />
          <stop offset="100%" stopColor={spec.back[1]} />
        </linearGradient>
        <linearGradient id={gloss} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="35%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} rx={rx} fill={`url(#${body})`} stroke={spec.frame} strokeWidth={w * 0.03} />
      <rect width={w} height={h} rx={rx} fill={`url(#${gloss})`} />
      {camera}
    </g>
  );
}

function PhoneFront({ box, spec, uid }: { box: Box; spec: Spec; uid: string }) {
  const { x, y, w, h, rotate = 0 } = box;
  const rx = w * 0.17;
  const inset = w * 0.045;
  const sw = w - inset * 2;
  const sh = h - inset * 2;
  const screen = `${uid}s`;
  const clip = `${uid}c`;

  let cutout = null;
  if (spec.cutout === "island") {
    cutout = <rect x={w / 2 - w * 0.16} y={inset + h * 0.025} width={w * 0.32} height={h * 0.045} rx={h * 0.0225} fill="#05060a" />;
  } else if (spec.cutout === "notch") {
    cutout = <rect x={w / 2 - w * 0.22} y={inset - 1} width={w * 0.44} height={h * 0.05} rx={h * 0.02} fill="#05060a" />;
  } else {
    cutout = <circle cx={w / 2} cy={inset + h * 0.04} r={w * 0.035} fill="#05060a" />;
  }

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} ${w / 2} ${h / 2})`}>
      <defs>
        <linearGradient id={screen} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={spec.screen[0]} />
          <stop offset="50%" stopColor={spec.screen[1]} />
          <stop offset="100%" stopColor={spec.screen[2]} />
        </linearGradient>
        <clipPath id={clip}>
          <rect x={inset} y={inset} width={sw} height={sh} rx={rx * 0.8} />
        </clipPath>
      </defs>
      <rect width={w} height={h} rx={rx} fill="#0a0c10" stroke={spec.frame} strokeWidth={w * 0.03} />
      <g clipPath={`url(#${clip})`}>
        <rect x={inset} y={inset} width={sw} height={sh} fill={`url(#${screen})`} />
        <path
          d={`M${inset} ${h * 0.62} C ${w * 0.35} ${h * 0.42}, ${w * 0.6} ${h * 0.78}, ${w} ${h * 0.5} L ${w} ${h} L ${inset} ${h} Z`}
          fill="#fff"
          opacity="0.16"
        />
        <path
          d={`M${inset} ${h * 0.35} C ${w * 0.4} ${h * 0.2}, ${w * 0.55} ${h * 0.55}, ${w} ${h * 0.28} L ${w} ${h * 0.4} C ${w * 0.6} ${h * 0.66}, ${w * 0.35} ${h * 0.34}, ${inset} ${h * 0.5} Z`}
          fill="#fff"
          opacity="0.12"
        />
        <rect x={inset} y={inset} width={sw * 0.45} height={sh} fill="#fff" opacity="0.06" />
      </g>
      {cutout}
    </g>
  );
}

export function PhonePair({ model, className = "h-28 w-full" }: { model: PhoneModel; className?: string }) {
  const uid = cleanId(useId());
  const spec = specs[model];
  return (
    <svg viewBox="0 0 100 112" className={className} role="img" aria-hidden="true">
      <ellipse cx="52" cy="106" rx="36" ry="3.5" fill="#0f172a" opacity="0.12" />
      <PhoneBack box={{ x: 12, y: 12, w: 40, h: 88 }} spec={spec} uid={`${uid}a`} />
      <PhoneFront box={{ x: 44, y: 5, w: 44, h: 98 }} spec={spec} uid={`${uid}f`} />
    </svg>
  );
}

const purpleTitanium: Spec = { back: ["#6a6394", "#2a2544"], frame: "#8d86b8", screen: ["#d2c6ff", "#6d4fdc", "#1c1550"], camera: "triple", cutout: "island" };
const deepBlue: Spec = { back: ["#4b5a8f", "#1b2244"], frame: "#7f8fc4", screen: ["#9ebcff", "#2f4fd3", "#0a1550"], camera: "triple", cutout: "island" };

export function HeroPhones({ className = "" }: { className?: string }) {
  const uid = cleanId(useId());
  return (
    <svg viewBox="0 0 520 300" className={className} aria-hidden="true">
      <PhoneBack box={{ x: 30, y: 8, w: 170, h: 360, rotate: -8 }} spec={purpleTitanium} uid={`${uid}a`} />
      <PhoneFront box={{ x: 225, y: 18, w: 150, h: 330, rotate: 6 }} spec={purpleTitanium} uid={`${uid}b`} />
      <PhoneFront box={{ x: 330, y: 80, w: 140, h: 300, rotate: 12 }} spec={deepBlue} uid={`${uid}c`} />
    </svg>
  );
}

const promoSets: Record<"special" | "finance", Spec[]> = {
  special: [
    { back: ["#3f6fd8", "#18307a"], frame: "#6d95ea", screen: ["#9ebcff", "#2f4fd3", "#0a1550"], camera: "diagonal", cutout: "island" },
    { back: ["#e9e9f4", "#aeb1cc"], frame: "#d2d4e6", screen: ["#e6e8ff", "#8f95d8", "#3a3f7a"], camera: "triple", cutout: "island" },
    { back: ["#3a3550", "#15121f"], frame: "#5b5577", screen: ["#b9a6ff", "#5b3fd0", "#16114a"], camera: "triple", cutout: "island" },
  ],
  finance: [
    { back: ["#3e5fbf", "#16275f"], frame: "#6a86d8", screen: ["#9ec2ff", "#3162d6", "#0b1a55"], camera: "diagonal", cutout: "island" },
    { back: ["#d9dcf2", "#9aa0c8"], frame: "#c3c8e4", screen: ["#e8ecff", "#8a93d6", "#353c7a"], camera: "diagonal", cutout: "island" },
    { back: ["#8a3fb8", "#3b145a"], frame: "#b06ad8", screen: ["#f0b3ff", "#9a3fd8", "#2a0f4a"], camera: "diagonal", cutout: "island" },
  ],
};

export function PromoPhones({ variant, className = "" }: { variant: "special" | "finance"; className?: string }) {
  const uid = cleanId(useId());
  const [a, b, c] = promoSets[variant];
  return (
    <svg viewBox="0 0 130 140" className={className} aria-hidden="true">
      <PhoneBack box={{ x: 8, y: 22, w: 46, h: 104, rotate: -14 }} spec={a} uid={`${uid}a`} />
      <PhoneBack box={{ x: 38, y: 14, w: 48, h: 110, rotate: -8 }} spec={b} uid={`${uid}b`} />
      <PhoneFront box={{ x: 72, y: 8, w: 48, h: 112, rotate: -2 }} spec={c} uid={`${uid}c`} />
    </svg>
  );
}
