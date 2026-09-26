export type PhoneModel = "iphone15" | "a54" | "edge40" | "redmi" | "iphone13" | "s23" | "realme" | "g84" | "poco";

const phoneImages: Record<PhoneModel, string> = {
  iphone15: "/assets/phones/iphone-15.jpg",
  a54: "/assets/phones/galaxy-a54.jpg",
  edge40: "/assets/phones/motorola-edge-40.jpg",
  redmi: "/assets/phones/redmi-note-12.jpg",
  iphone13: "/assets/phones/iphone-13.jpg",
  s23: "/assets/phones/galaxy-s23.jpg",
  realme: "/assets/phones/realme-c67.jpg",
  g84: "/assets/phones/motorola-g84.jpg",
  poco: "/assets/phones/poco-x6.jpg",
};

export function PhonePair({ model, className = "h-28 w-full" }: { model: PhoneModel; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={phoneImages[model]}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain drop-shadow-[0_10px_12px_rgba(15,23,42,.16)]"
      />
    </div>
  );
}

const heroSlides = [
  ["/assets/phones/iphone-15.webp", "/assets/phones/galaxy-a54.webp", "/assets/phones/redmi-note-12.webp"],
  ["/assets/phones/iphone-13.webp", "/assets/phones/galaxy-s23.webp", "/assets/phones/motorola-edge-40.webp"],
  ["/assets/phones/poco-x6.webp", "/assets/phones/realme-c67.webp", "/assets/phones/motorola-g84.webp"],
];

export function HeroPhones({ slide = 0, className = "" }: { slide?: number; className?: string }) {
  const [left, center, right] = heroSlides[slide % heroSlides.length];
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <img src={left} alt="" className="absolute bottom-0 left-[2%] h-[94%] w-[46%] -rotate-6 object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,.5)]" />
      <img src={center} alt="" className="absolute bottom-[-6%] left-[34%] h-[90%] w-[40%] rotate-3 object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,.45)]" />
      <img src={right} alt="" className="absolute bottom-[-8%] right-0 h-[82%] w-[34%] rotate-6 object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,.45)]" />
    </div>
  );
}

export function PromoPhones({ variant, className = "" }: { variant: "special" | "finance"; className?: string }) {
  const images = variant === "special"
    ? ["/assets/phones/iphone-15.webp", "/assets/phones/galaxy-a54.webp"]
    : ["/assets/phones/redmi-note-12.webp", "/assets/phones/iphone-13.webp"];

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <img src={images[0]} alt="" className="absolute bottom-[-4%] left-[-8%] h-[94%] w-[72%] rotate-[-8deg] object-contain drop-shadow-xl" />
      <img src={images[1]} alt="" className="absolute bottom-[-8%] right-[-12%] h-[100%] w-[72%] rotate-[7deg] object-contain drop-shadow-xl" />
    </div>
  );
}
