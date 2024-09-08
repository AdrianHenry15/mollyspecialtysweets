import { create } from "zustand";

// Define the state interface for cake options
interface CakeState {
    tier: string | null;
    size: string | null;
    shape: string | null;
    flavor: string | null;
    frosting: string | null;
    filling: string | null;
    topping: string | null;
    hasFruit: string | null;
    fruit: string | null;
    extraDetails: string | null;
    setTier: (value: string) => void;
    setSize: (value: string) => void;
    setShape: (value: string) => void;
    setFlavor: (value: string) => void;
    setFrosting: (value: string) => void;
    setFilling: (value: string) => void;
    setTopping: (value: string) => void;
    setHasFruit: (value: string) => void;
    setFruit: (value: string) => void;
    setExtraDetails: (value: string) => void;
}

// Create the Zustand store for cake options
export const useCakeStore = create<CakeState>((set) => ({
    tier: "",
    size: "",
    shape: "",
    flavor: "",
    frosting: "",
    filling: "",
    topping: "",
    hasFruit: "",
    fruit: "",
    extraDetails: "",
    setTier: (value: string) => set({ tier: value }),
    setSize: (value: string) => set({ size: value }),
    setShape: (value: string) => set({ shape: value }),
    setFlavor: (value: string) => set({ flavor: value }),
    setFrosting: (value: string) => set({ frosting: value }),
    setFilling: (value: string) => set({ filling: value }),
    setTopping: (value: string) => set({ topping: value }),
    setHasFruit: (value: string) => set({ hasFruit: value }),
    setFruit: (value: string) => set({ fruit: value }),
    setExtraDetails: (value: string) => set({ extraDetails: value }),
}));
