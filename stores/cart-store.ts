import { ProductType } from "@/lib/types";
import { create } from "zustand";

type CartState = {
    items: ProductType[];
    addItem: (item: ProductType) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void; // Add this
    getProductQuantity: (id: string) => number; // Add this
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addItem: (item) =>
        set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                return {
                    items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)),
                };
            }
            return { items: [...state.items, item] };
        }),
    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),
    clearCart: () => set({ items: [] }),
    updateQuantity: (id, quantity) =>
        set((state) => ({
            items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })),
    getProductQuantity: (id) => {
        const item = get().items.find((item) => item.id === id);
        return item ? item.quantity : 0;
    },
}));
