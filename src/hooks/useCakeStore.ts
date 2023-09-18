import { create } from "zustand";
import { OrderOption } from "../lib/GlobalOptions";

interface CakeStore {
    // STATE
    cakeShape: OrderOption;
    cakeTier: OrderOption;
    cakeSize: OrderOption;
    cakeFlavor: string;
    cakeFrosting: string;
    cakeFilling: string;
    cakeFruitFilling: string;
    cakeFruitTopping: string;
    isCakeFormSubmitted: boolean;
    // Error Handling
    cakeShapeError: string;
    cakeTierError: string;
    cakeSizeError: string;
    cakeFlavorError: string;
    cakeFrostingError: string;
    cakeFillingError: string;

    // Setters
    setCakeShape: (selected: OrderOption | null) => void;
    setCakeTier: (selected: OrderOption | null) => void;
    setCakeSize: (selected: OrderOption | null) => void;
    submitCakeForm: (submitted: boolean) => void;

    // Handlers
    handleCakeFlavor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCakeFrosting: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCakeFilling: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCakeFruitFilling: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCakeFruitTopping: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useCakeStore = create<CakeStore>((set, get) => ({
    // STATE
    cakeShape: { value: "", label: "" },
    cakeTier: { value: "", label: "" },
    cakeSize: { value: "", label: "" },
    cakeFlavor: "",
    cakeFrosting: "",
    cakeFilling: "",
    cakeFruitFilling: "",
    cakeFruitTopping: "",
    isCakeFormSubmitted: false,
    // Error Handling
    cakeShapeError: "",
    cakeTierError: "",
    cakeSizeError: "",
    cakeFlavorError: "",
    cakeFrostingError: "",
    cakeFillingError: "",

    // ACTIONS
    submitCakeForm: (submitted: boolean) => {
        // Cake Property Validation Check
        const isShapeValid = get().cakeShape.value !== "";
        const isTierValid = get().cakeTier.value !== "";
        const isSizeValid = get().cakeSize.value !== "";
        const isFlavorValid = get().cakeFlavor !== "";
        const isFrostingValid = get().cakeFrosting !== "";
        const isFillingValid = get().cakeFilling !== "";

        // Entire Cake Form Validation Check
        const isCakeFormValid = isShapeValid && isTierValid && isSizeValid && isFlavorValid && isFrostingValid && isFillingValid;

        // Setting State for Cake Properties
        set({
            // Cake Validation
            isCakeFormSubmitted: isCakeFormValid ? submitted : !submitted,
            cakeShapeError: isShapeValid ? "" : "Cake Shape is required.",
            cakeTierError: isTierValid ? "" : "Cake Tier is required.",
            cakeSizeError: isSizeValid ? "" : "Cake Size is required.",
            cakeFlavorError: isFlavorValid ? "" : "Cake Flavor is required.",
            cakeFrostingError: isFrostingValid ? "" : "Cake Frosting is required.",
            cakeFillingError: isFillingValid ? "" : "Cake Filling is required.",
        });
    },
    // Setters
    setCakeShape: (selected: OrderOption | null) => set({ cakeShape: selected! }),
    setCakeTier: (selected: OrderOption | null) => set({ cakeTier: selected! }),
    setCakeSize: (selected: OrderOption | null) => set({ cakeSize: selected! }),

    //Handlers
    handleCakeFlavor: (e: React.ChangeEvent<HTMLInputElement>) => set({ cakeFlavor: e.target.value }),
    handleCakeFrosting: (e: React.ChangeEvent<HTMLInputElement>) => set({ cakeFrosting: e.target.value }),
    handleCakeFilling: (e: React.ChangeEvent<HTMLInputElement>) => set({ cakeFilling: e.target.value }),
    handleCakeFruitFilling: (e: React.ChangeEvent<HTMLInputElement>) => set({ cakeFruitFilling: e.target.value }),
    handleCakeFruitTopping: (e: React.ChangeEvent<HTMLInputElement>) =>
        set({
            cakeFruitTopping: e.target.value,
        }),
}));

export default useCakeStore;
