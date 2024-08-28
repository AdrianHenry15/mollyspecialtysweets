import { ProductType } from "@/lib/types";
import { create } from "zustand";

type CartState = {
    items: ProductType[];
    addItem: (item: ProductType) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
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
}));
