import { create } from "zustand";
import axios from "axios";
import { ProductType } from "@/lib/types";
import useDeliveryMethodStore from "./delivery-method-store";

const loadCartFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const cart = localStorage.getItem("cart") as string;
        return cart ? JSON.parse(cart) : [];
    }
    return [];
};

const saveCartToLocalStorage = (cart: ProductType[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

type CartState = {
    items: ProductType[];
    subtotal: number;
    salesTax: number;
    deliveryFee: number;
    tip: number;
    total: number;
    setSubtotal: () => void;
    setTotal: () => void;
    setTip: (tip: number) => void;
    loadCart: () => void;
    addItem: (item: ProductType) => Promise<void>;
    clearCart: () => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    removeItemById: (id: string) => Promise<void>;
    updateItemPrices: () => Promise<void>;
};

// Helper function to access delivery method
const getDeliveryMethod = () => {
    const { deliveryMethod } = useDeliveryMethodStore.getState();
    return deliveryMethod;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: loadCartFromLocalStorage(),
    subtotal: 0,
    salesTax: 0,
    deliveryFee: 0,
    tip: 0,
    total: 0,
    setSubtotal: () => {
        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ subtotal });
        get().setTotal(); // Recalculate total whenever subtotal changes
    },
    setTotal: () => {
        const { subtotal, tip } = get();
        const salesTax = subtotal * 0.065; // Example tax rate
        const deliveryFee = getDeliveryMethod() === "delivery" ? subtotal * 0.1 : 0; // Example fee rate
        const total = subtotal + salesTax + deliveryFee + tip;
        console.log("Updated Total:", total); // Debugging line
        set({ salesTax, deliveryFee, total });
    },
    setTip: (tip) => {
        set({ tip });
        get().setTotal(); // Recalculate total whenever tip changes
    },
    loadCart: async () => {
        try {
            const response = await axios.get("/api/cart");
            set({ items: response.data });
            get().setSubtotal(); // Recalculate subtotal when cart is loaded
        } catch (error) {
            console.error("Failed to load cart:", error);
        }
    },
    addItem: async (item) => {
        try {
            const updatedItems = get().items;
            const existingItem = updatedItems.find((i) => i.id === item.id);

            if (existingItem) {
                await axios.put(`/api/cart/${item.id}`, { quantity: existingItem.quantity + item.quantity });
                set({
                    items: updatedItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)),
                });
            } else {
                await axios.post("/api/cart", { item });
                set({ items: [...updatedItems, item] });
            }

            saveCartToLocalStorage(get().items);
            get().setSubtotal(); // Recalculate subtotal when an item is added
        } catch (error) {
            console.error("Failed to add item:", error);
        }
    },
    clearCart: async () => {
        try {
            await axios.delete("/api/cart");
            set({ items: [] });
            saveCartToLocalStorage([]);
            set({ subtotal: 0, salesTax: 0, deliveryFee: 0, tip: 0, total: 0 }); // Reset all values
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
            saveCartToLocalStorage(get().items);
            get().setSubtotal(); // Recalculate subtotal when quantity is updated
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
            saveCartToLocalStorage(get().items);
            get().setSubtotal(); // Recalculate subtotal when an item is removed
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    },
    updateItemPrices: async () => {
        try {
            const response = await axios.get("/api/pricing");
            const latestPrices = response.data;

            const updatedItems = get().items.map((item) => {
                const latestPrice = latestPrices.find((price: any) => price.id === item.id)?.price || item.price;
                return { ...item, price: latestPrice };
            });

            set({ items: updatedItems });
            saveCartToLocalStorage(updatedItems);
            get().setSubtotal(); // Recalculate subtotal with updated prices
        } catch (error) {
            console.error("Failed to update item prices:", error);
        }
    },
}));
