import { create } from "zustand";
import axios from "axios";
import { ProductType } from "@/lib/types";

interface ProductState {
    products: ProductType[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    isLoading: false,
    error: null,
    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get("/api/products");
            set({ products: response.data, isLoading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", isLoading: false });
        }
    },
}));
