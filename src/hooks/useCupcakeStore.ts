import { create } from "zustand";
import { OrderOption } from "../lib/GlobalOptions";

interface CupcakeStore {
    // STATE
    cupcakeSize: OrderOption;
    cupcakeAmount: OrderOption;
    cupcakeFlavor: string;
    cupcakeFrosting: string;
    cupcakeFilling: string;
    cupcakeFruitFilling: string;
    cupcakeFruitTopping: string;
    isCupcakeFormSubmitted: boolean;
    // Error Handling
    cupcakeSizeError: string;
    cupcakeAmountError: string;
    cupcakeFlavorError: string;
    cupcakeFrostingError: string;

    // Setters
    submitCupcakeForm: (submitted: boolean) => void;
    setCupcakeSize: (selected: OrderOption | null) => void;
    setCupcakeAmount: (selected: OrderOption | null) => void;
    // Handlers
    handleCupcakeFruitFilling: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCupcakeFruitTopping: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCupcakeFlavor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCupcakeFrosting: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCupcakeFilling: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useCupcakeStore = create<CupcakeStore>((set, get) => ({
    // STATE
    cupcakeSize: { value: "", label: "" },
    cupcakeAmount: { value: "", label: "" },
    cupcakeFlavor: "",
    cupcakeFrosting: "",
    cupcakeFilling: "",
    cupcakeFruitFilling: "",
    cupcakeFruitTopping: "",
    isCupcakeFormSubmitted: false,
    // Error Handling
    cupcakeAmountError: "",
    cupcakeSizeError: "",
    cupcakeFlavorError: "",
    cupcakeFrostingError: "",

    // Setters
    submitCupcakeForm: (submitted: boolean) => {
        // Cupcake Property Validation Check
        const isSizeValid = get().cupcakeSize.value !== "";
        const isAmountValid = get().cupcakeAmount.value !== "";
        const isFlavorValid = get().cupcakeFlavor !== "";
        const isFrostingValid = get().cupcakeFrosting !== "";

        // Entire Cupcake Form Validation Check
        const isCupcakeFormValid = isSizeValid && isAmountValid && isFlavorValid && isFrostingValid;

        // Setting State for Cupcake Properties
        set({
            // Cupcake Validation
            isCupcakeFormSubmitted: isCupcakeFormValid ? submitted : !submitted,
            cupcakeSizeError: isSizeValid ? "" : "Cupcake Size is required.",
            cupcakeAmountError: isAmountValid ? "" : "Cupcake Amount is required.",
            cupcakeFlavorError: isFlavorValid ? "" : "Cupcake Flavor is required.",
            cupcakeFrostingError: isFrostingValid ? "" : "Cupcake Frosting is required.",
        });
    },
    setCupcakeSize: (selected: OrderOption | null) => set({ cupcakeSize: selected! }),
    setCupcakeAmount: (selected: OrderOption | null) => set({ cupcakeAmount: selected! }),

    // Handlers
    handleCupcakeFlavor: (e: React.ChangeEvent<HTMLInputElement>) =>
        set({
            cupcakeFlavor: e.target.value,
        }),
    handleCupcakeFrosting: (e: React.ChangeEvent<HTMLInputElement>) =>
        set({
            cupcakeFrosting: e.target.value,
        }),
    handleCupcakeFilling: (e: React.ChangeEvent<HTMLInputElement>) =>
        set({
            cupcakeFilling: e.target.value,
        }),
    handleCupcakeFruitFilling: (e: React.ChangeEvent<HTMLInputElement>) => set({ cupcakeFruitFilling: e.target.value }),
    handleCupcakeFruitTopping: (e: React.ChangeEvent<HTMLInputElement>) => set({ cupcakeFruitTopping: e.target.value }),
}));

export default useCupcakeStore;
