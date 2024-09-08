import { create } from "zustand";
import axios from "axios";
import { EstimateType } from "@/lib/types";

interface EstimateStore {
    estimates: EstimateType[];
    loading: boolean;
    error: string | null;
    fetchEstimates: () => Promise<void>;
    addEstimate: (estimate: Omit<EstimateType, "id">) => Promise<void>;
    updateEstimate: (id: string, updatedEstimate: Partial<EstimateType>) => Promise<void>;
    removeEstimate: (id: string) => Promise<void>;
}

export const useEstimateStore = create<EstimateStore>((set) => ({
    estimates: [],
    loading: false,
    error: null,

    // Fetch all estimates from the API
    fetchEstimates: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("/api/estimates");
            set({ estimates: response.data, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    // Add a new estimate via the API
    addEstimate: async (estimate: Omit<EstimateType, "id">) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post("/api/estimates", estimate);
            set((state) => ({
                estimates: [...state.estimates, response.data],
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    // Update an existing estimate via the API
    updateEstimate: async (id: string, updatedEstimate: Partial<EstimateType>) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`/api/estimates/${id}`, updatedEstimate);
            set((state) => ({
                estimates: state.estimates.map((estimate) => (estimate.id === id ? { ...estimate, ...response.data } : estimate)),
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    // Remove an estimate via the API
    removeEstimate: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/estimates/${id}`);
            set((state) => ({
                estimates: state.estimates.filter((estimate) => estimate.id !== id),
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },
}));
