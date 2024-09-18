import { create } from "zustand";

// Define the state interface for cake options
interface CakeState {
    tier: string | null;
    size: string | null;
    shape: string | null;
    flavor: string | null;
    frosting: string | null;
    frostingFruit: string | null;
    filling: string | null;
    fillingFruit: string | null;
    topping: string | null;
    toppingFruit: string | null;
    extraDetails: string | null;
    setTier: (value: string) => void;
    setSize: (value: string) => void;
    setShape: (value: string) => void;
    setFlavor: (value: string) => void;
    setFrosting: (value: string) => void;
    setFrostingFruit: (value: string) => void;
    setFilling: (value: string) => void;
    setFillingFruit: (value: string) => void;
    setTopping: (value: string) => void;
    setToppingFruit: (value: string) => void;
    setExtraDetails: (value: string) => void;
}

// Create the Zustand store for cake options
export const useCakeStore = create<CakeState>((set) => ({
    tier: "",
    size: "",
    shape: "",
    flavor: "",
    frosting: "",
    frostingFruit: "",
    filling: "",
    fillingFruit: "",
    topping: "",
    toppingFruit: "",
    extraDetails: "",
    setTier: (value: string) => set({ tier: value }),
    setSize: (value: string) => set({ size: value }),
    setShape: (value: string) => set({ shape: value }),
    setFlavor: (value: string) => set({ flavor: value }),
    setFrosting: (value: string) => set({ frosting: value }),
    setFrostingFruit: (value: string) => set({ frostingFruit: value }),
    setFilling: (value: string) => set({ filling: value }),
    setFillingFruit: (value: string) => set({ fillingFruit: value }),
    setTopping: (value: string) => set({ topping: value }),
    setToppingFruit: (value: string) => set({ toppingFruit: value }),
    setExtraDetails: (value: string) => set({ extraDetails: value }),
}));
