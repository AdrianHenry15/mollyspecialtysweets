import { CakeSizeAndServings } from "./types"
export type Collection = "Cakes" | "Cupcakes" | "Cookies" | "Retail"

export const NavMenuItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Store",
    link: "/store",
  },
  {
    title: "Weddings",
    link: "/weddings",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "FAQs",
    link: "/faqs",
  },
]
export const NavMenuAltItems = [
  {
    title: "Contact Us",
    link: "/contact",
  },
  {
    title: "Online Consulation",
    link: "/online-consultation",
  },
]

export const CakeShapes = ["Round", "Sheet"]

export const RoundCakeSizes: CakeSizeAndServings[] = [
  { size: "4 in.", serves: "Serves 8" },
  { size: "6 in.", serves: "Serves 12" },
  { size: "8 in.", serves: "Serves 20" },
  { size: "9 in.", serves: "Serves 24" },
  { size: "10 in.", serves: "Serves 28" },
  { size: "12 in.", serves: "Serves 40" },
  { size: "14 in.", serves: "Serves 63" },
  { size: "16 in.", serves: "Serves 77" },
]

export const SheetCakeSizes: CakeSizeAndServings[] = [
  { size: "6 in.", serves: "Serves 12" },
  { size: "8 in.", serves: "Serves 20" },
  { size: "10 in.", serves: "Serves 30" },
  { size: "12 in.", serves: "Serves 48" },
  { size: "14 in.", serves: "Serves 63" },
]

export const Categories = ["Cakes", "Cookies", "Cupcakes"]

export const CakeTiers = ["Single", "Multiple"]

export const DeliveryOptions = ["Pickup", "Delivery"]

export const Amounts = ["4", "6", "12", "18", "24", "30", "36", "42", "48"]
