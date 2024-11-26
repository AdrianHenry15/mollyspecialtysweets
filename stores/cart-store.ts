import { persist } from "zustand/middleware"
import { create } from "zustand"
import { Product } from "@/sanity.types"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: (productId: string) => number
  getGroupedItems: () => CartItem[]
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Array of items in the Cart, each with a product and quantity
      items: [],

      // Adds an item to the Cart, or increments the quantity if the item already exists
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          )
          if (existingItem) {
            // Increment quantity if the item already exists
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          } else {
            // Add new item to the Cart
            return { items: [...state.items, { product, quantity: 1 }] }
          }
        }),

      // Removes an item from the Cart by decreasing quantity or removing it if quantity is 1
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                // Decrease quantity if more than 1
                acc.push({ ...item, quantity: item.quantity - 1 })
              }
              // Remove item if quantity is 1
            } else {
              acc.push(item) // Keep other items unchanged
            }
            return acc
          }, [] as CartItem[]),
        })),

      // Clears all items from the Cart
      clearCart: () => set({ items: [] }),

      // Calculates the total price of all items in the Cart
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        )
      },

      // Returns the quantity of a specific item in the Cart by product ID
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId)
        return item ? item.quantity : 0
      },

      // Returns the list of items in the Cart
      getGroupedItems: () => get().items,
    }),
    {
      name: "cart-store", // Unique name for persisted storage key
    }
  )
)

export default useCartStore
