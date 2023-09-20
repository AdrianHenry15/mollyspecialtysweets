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
    // setrs
    setCupcakeFruitFilling: (text: string) => void;
    setCupcakeFruitTopping: (text: string) => void;
    setCupcakeFlavor: (text: string) => void;
    setCupcakeFrosting: (text: string) => void;
    setCupcakeFilling: (text: string) => void;
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
    setCupcakeFlavor: (text: string) =>
        set({
            cupcakeFlavor: text,
        }),
    setCupcakeFrosting: (text: string) =>
        set({
            cupcakeFrosting: text,
        }),
    setCupcakeFilling: (text: string) =>
        set({
            cupcakeFilling: text,
        }),
    setCupcakeFruitFilling: (text: string) => set({ cupcakeFruitFilling: text }),
    setCupcakeFruitTopping: (text: string) => set({ cupcakeFruitTopping: text }),
}));

export default useCupcakeStore;
