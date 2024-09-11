import { create } from "zustand";
import axios from "axios";
import { ProductType } from "@/lib/types";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem("cart") as string;
        return cart ? JSON.parse(cart) : [];
    }
    return [];
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart: ProductType[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

type CartState = {
    items: ProductType[];
    loadCart: () => void;
    addItem: (item: ProductType) => Promise<void>;
    clearCart: () => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    removeItemById: (id: string) => Promise<void>;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: loadCartFromLocalStorage(), // Initialize items from localStorage
    loadCart: async () => {
        try {
            const response = await axios.get("/api/cart");
            set({ items: response.data });
        } catch (error) {
            console.error("Failed to load cart:", error);
        }
    },
    addItem: async (item) => {
        try {
            const updatedItems = get().items;
            const existingItem = updatedItems.find((i) => i.id === item.id);

            if (existingItem) {
                // Update quantity if item already exists
                await axios.put(`/api/cart/${item.id}`, { quantity: existingItem.quantity + item.quantity });
                set({
                    items: updatedItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)),
                });
            } else {
                // Add new item to the cart
                await axios.post("/api/cart", { item });
                set({ items: [...updatedItems, item] });
            }

            saveCartToLocalStorage(get().items); // Save updated cart to localStorage
        } catch (error) {
            console.error("Failed to add item:", error);
        }
    },
    clearCart: async () => {
        try {
            await axios.delete("/api/cart");
            set({ items: [] });
            saveCartToLocalStorage([]); // Clear cart in localStorage
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    },
    updateQuantity: async (id, quantity) => {
        try {
            await axios.put(`/api/cart/${id}`, { quantity });
            set({
                items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
            });
            saveCartToLocalStorage(get().items); // Save updated cart to localStorage
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    },
    removeItemById: async (id) => {
        try {
            await axios.delete(`/api/cart/${id}`);
            set({
                items: get().items.filter((item) => item.id !== id),
            });
            saveCartToLocalStorage(get().items); // Save updated cart to localStorage
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    },
}));
