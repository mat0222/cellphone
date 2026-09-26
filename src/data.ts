import type { PhoneModel } from "./components/RealPhoneArt";

export type View = "home" | "productos" | "combos" | "contacto" | "carrito" | "login" | "admin";

export type AdminSection =
  | "inicio"
  | "ventas"
  | "productos"
  | "categorias"
  | "marcas"
  | "clientes"
  | "proveedores"
  | "inventario"
  | "promociones"
  | "envios"
  | "cupones"
  | "reportes"
  | "usuarios"
  | "configuracion";

export type CatalogProduct = {
  name: string;
  brand: string;
  storage: string;
  ram: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge: { label: string; tone: "red" | "blue" | "green" };
  model: PhoneModel;
  condition: "Nuevos" | "Usados";
};

export function formatPrice(value: number) {
  return "$" + value.toLocaleString("es-AR");
}

export const featuredProducts: {
  name: string;
  discount: number;
  oldPrice: number;
  price: number;
  model: PhoneModel;
}[] = [
  { name: "iPhone 15 128GB", discount: 15, oldPrice: 1099999, price: 999999, model: "iphone15" },
  { name: "Samsung Galaxy A54 128GB", discount: 10, oldPrice: 499999, price: 424999, model: "a54" },
  { name: "Motorola Edge 40 256GB", discount: 10, oldPrice: 329999, price: 229999, model: "edge40" },
  { name: "Xiaomi Redmi Note 12 128GB", discount: 10, oldPrice: 299999, price: 239999, model: "redmi" },
];

export const catalogProducts: CatalogProduct[] = [
  { name: "iPhone 15 128GB", brand: "Apple", storage: "128 GB", ram: "6 GB", price: 999999, oldPrice: 1099999, rating: 4.8, reviews: 120, badge: { label: "Nuevo", tone: "blue" }, model: "iphone15", condition: "Nuevos" },
  { name: "Samsung Galaxy A54 128GB", brand: "Samsung", storage: "128 GB", ram: "8 GB", price: 424999, oldPrice: 499999, rating: 4.7, reviews: 98, badge: { label: "-10%", tone: "red" }, model: "a54", condition: "Nuevos" },
  { name: "Motorola Edge 40 256GB", brand: "Motorola", storage: "256 GB", ram: "8 GB", price: 229999, oldPrice: 329999, rating: 4.6, reviews: 76, badge: { label: "-10%", tone: "red" }, model: "edge40", condition: "Nuevos" },
  { name: "Xiaomi Redmi Note 12 128GB", brand: "Xiaomi", storage: "128 GB", ram: "6 GB", price: 239999, oldPrice: 299999, rating: 4.7, reviews: 85, badge: { label: "-10%", tone: "red" }, model: "redmi", condition: "Nuevos" },
  { name: "iPhone 13 128GB", brand: "Apple", storage: "128 GB", ram: "4 GB", price: 679999, oldPrice: 719999, rating: 4.7, reviews: 150, badge: { label: "-5%", tone: "red" }, model: "iphone13", condition: "Nuevos" },
  { name: "Samsung Galaxy S23 256GB", brand: "Samsung", storage: "256 GB", ram: "8 GB", price: 859999, rating: 4.8, reviews: 210, badge: { label: "Nuevo", tone: "blue" }, model: "s23", condition: "Nuevos" },
  { name: "Realme C67 128GB", brand: "Realme", storage: "128 GB", ram: "8 GB", price: 279999, rating: 4.6, reviews: 62, badge: { label: "Nuevo", tone: "green" }, model: "realme", condition: "Nuevos" },
  { name: "Motorola G84 256GB", brand: "Motorola", storage: "256 GB", ram: "12 GB", price: 549999, oldPrice: 609999, rating: 4.7, reviews: 88, badge: { label: "-10%", tone: "red" }, model: "g84", condition: "Nuevos" },
  { name: "Xiaomi Poco X6 256GB", brand: "Xiaomi", storage: "256 GB", ram: "12 GB", price: 449999, rating: 4.6, reviews: 74, badge: { label: "Nuevo", tone: "blue" }, model: "poco", condition: "Nuevos" },
];

export type Combo = {
  name: string;
  detail: string;
  models: [PhoneModel, PhoneModel];
  price: number;
  oldPrice: number;
};

export const combos: Combo[] = [
  { name: "Combo Apple", detail: "iPhone 15 128GB + iPhone 13 128GB", models: ["iphone15", "iphone13"], price: 1599999, oldPrice: 1679998 },
  { name: "Combo Samsung", detail: "Galaxy A54 128GB + Galaxy S23 256GB", models: ["a54", "s23"], price: 1199999, oldPrice: 1284998 },
  { name: "Combo familiar", detail: "Motorola Edge 40 + Redmi Note 12", models: ["edge40", "redmi"], price: 429999, oldPrice: 469998 },
  { name: "Combo gama alta", detail: "iPhone 15 + Galaxy S23", models: ["iphone15", "s23"], price: 1749999, oldPrice: 1859998 },
  { name: "Combo Motorola", detail: "Edge 40 256GB + Moto G84 256GB", models: ["edge40", "g84"], price: 719999, oldPrice: 779998 },
  { name: "Combo Xiaomi", detail: "Redmi Note 12 + Poco X6", models: ["redmi", "poco"], price: 639999, oldPrice: 689998 },
];

export type Sellable = {
  name: string;
  detail: string;
  price: number;
  model: PhoneModel;
  extraModel?: PhoneModel;
};

export function findSellable(name: string): Sellable | undefined {
  const product = catalogProducts.find((item) => item.name === name);
  if (product) {
    return { name: product.name, detail: `${product.brand} · ${product.storage}`, price: product.price, model: product.model };
  }
  const combo = combos.find((item) => item.name === name);
  if (!combo) return undefined;
  return { name: combo.name, detail: combo.detail, price: combo.price, model: combo.models[0], extraModel: combo.models[1] };
}

export const brands = ["Apple", "Samsung", "Motorola", "Xiaomi", "Realme", "TCL", "Otras"];
export const storages = ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"];
export const rams = ["4 GB", "6 GB", "8 GB", "12 GB"];
export const conditions = ["Nuevos", "Usados"];

export const whyBuy = [
  { title: "Envíos a todo el país", text: "Rápido y seguro." },
  { title: "Garantía oficial", text: "Todos nuestros productos." },
  { title: "Pagos seguros", text: "Tarjeta, transferencia o efectivo." },
  { title: "Atención personalizada", text: "De lunes a sábado." },
];

export const adminNav: { id: AdminSection; label: string }[] = [
  { id: "inicio", label: "Inicio" },
  { id: "ventas", label: "Ventas" },
  { id: "productos", label: "Productos" },
  { id: "categorias", label: "Categorías" },
  { id: "marcas", label: "Marcas" },
  { id: "clientes", label: "Clientes" },
  { id: "proveedores", label: "Proveedores" },
  { id: "inventario", label: "Inventario" },
  { id: "promociones", label: "Promociones" },
  { id: "envios", label: "Envíos" },
  { id: "cupones", label: "Cupones / Puntos" },
  { id: "reportes", label: "Reportes" },
  { id: "usuarios", label: "Usuarios" },
  { id: "configuracion", label: "Configuración" },
];

export const kpis = [
  { label: "Ventas hoy", value: "$ 1.245.660", delta: "12% vs. ayer", up: true },
  { label: "Pedidos", value: "28", delta: "8% vs. ayer", up: true },
  { label: "Clientes nuevos", value: "15", delta: "25% vs. ayer", up: true },
  { label: "Stock total", value: "1.248", delta: "3% vs. ayer", up: false },
];

export const topSellers = [
  { name: "iPhone 15 128GB", units: 42, model: "iphone15" as PhoneModel },
  { name: "Samsung Galaxy A54 128GB", units: 38, model: "a54" as PhoneModel },
  { name: "Motorola Edge 40 256GB", units: 27, model: "edge40" as PhoneModel },
  { name: "Xiaomi Redmi Note 12 128GB", units: 18, model: "redmi" as PhoneModel },
  { name: "iPhone 13 128GB", units: 16, model: "iphone13" as PhoneModel },
];

export const adminProducts = [
  { name: "iPhone 15 128GB", brand: "Apple", price: 1099999, stock: 12, model: "iphone15" as PhoneModel },
  { name: "Samsung Galaxy A54 128GB", brand: "Samsung", price: 424999, stock: 25, model: "a54" as PhoneModel },
  { name: "Motorola Edge 40 256GB", brand: "Motorola", price: 229999, stock: 18, model: "edge40" as PhoneModel },
  { name: "Xiaomi Redmi Note 12 128GB", brand: "Xiaomi", price: 239999, stock: 30, model: "redmi" as PhoneModel },
  { name: "iPhone 13 128GB", brand: "Apple", price: 679999, stock: 10, model: "iphone13" as PhoneModel },
];

export const categories = [
  { name: "Celulares", description: "Teléfonos móviles", products: 90 },
  { name: "Accesorios", description: "Fundas, cargadores, auriculares", products: 45 },
  { name: "Tablets", description: "Tablets y iPads", products: 24 },
  { name: "Smartwatches", description: "Relojes inteligentes", products: 8 },
];

export const sectionCards: { id: AdminSection; title: string; text: string; action: string }[] = [
  { id: "marcas", title: "Marcas", text: "Gestioná las marcas de tus productos.", action: "Ver marcas" },
  { id: "clientes", title: "Clientes", text: "Administrá tus clientes.", action: "Ver clientes" },
  { id: "proveedores", title: "Proveedores", text: "Gestioná tus proveedores.", action: "Ver proveedores" },
  { id: "inventario", title: "Inventario", text: "Controlá el stock de productos.", action: "Ver inventario" },
  { id: "promociones", title: "Promociones", text: "Creá y editá promociones.", action: "Ver promociones" },
  { id: "envios", title: "Envíos", text: "Configurá métodos de envío.", action: "Ver envíos" },
  { id: "cupones", title: "Cupones / Puntos", text: "Configurá tus cupones y puntos.", action: "Ver cupones" },
  { id: "reportes", title: "Reportes", text: "Analizá tus ventas y productos.", action: "Ver reportes" },
];

export const users = [
  { name: "Administrador", email: "admin@cellzone.com", role: "Administrador" },
  { name: "Juan Pérez", email: "juan@cellzone.com", role: "Editor" },
  { name: "María López", email: "maria@cellzone.com", role: "Vendedor" },
];

export type CartItem = { name: string; qty: number };

export const salesRows = [
  { order: "1048", customer: "Juan Pérez", product: "iPhone 15 128GB", total: 999999, status: "Entregado" },
  { order: "1047", customer: "María López", product: "Samsung Galaxy A54 128GB", total: 424999, status: "En camino" },
  { order: "1046", customer: "Administrador", product: "Motorola Edge 40 256GB", total: 229999, status: "Pendiente" },
  { order: "1045", customer: "Juan Pérez", product: "Xiaomi Redmi Note 12 128GB", total: 239999, status: "Entregado" },
];

export const pointSteps = [
  { n: "1", title: "Registrate", text: "Creá tu cuenta en la tienda." },
  { n: "2", title: "Comprá", text: "Por cada $1.000, sumás." },
  { n: "3", title: "Acumulá", text: "Llegá a los puntos." },
  { n: "4", title: "Canjeá", text: "Por descuentos, accesorios y más." },
];
