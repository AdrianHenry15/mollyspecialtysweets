import { create } from "zustand";
import { OrderOption } from "../lib/GlobalOptions";

interface CookieStore {
    // STATE
    cookieSize: OrderOption;
    cookieAmount: OrderOption;
    cookieFlavor: string;
    cookieFrosting: string;
    cookieFilling: string;
    cookieFruitFilling: string;
    cookieFruitTopping: string;
    isCookieFormSubmitted: boolean;
    // Error Handling
    cookieShapeError: string;
    cookieAmountError: string;
    cookieSizeError: string;
    cookieFlavorError: string;

    // Setters
    submitCookieForm: (submitted: boolean) => void;
    setCookieSize: (selected: OrderOption | null) => void;
    setCookieAmount: (selected: OrderOption | null) => void;
    // Handlers
    handleCookieFlavor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFrosting: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFilling: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFruitFilling: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFruitTopping: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useCookieStore = create<CookieStore>((set, get) => ({
    // STATE
    cookieSize: { value: "", label: "" },
    cookieAmount: { value: "", label: "" },
    cookieFlavor: "",
    cookieFrosting: "",
    cookieFilling: "",
    cookieFruitFilling: "",
    cookieFruitTopping: "",
    isCookieFormSubmitted: false,
    // Error Handling
    cookieShapeError: "",
    cookieAmountError: "",
    cookieSizeError: "",
    cookieFlavorError: "",

    // Setters
    submitCookieForm: (submitted: boolean) => {
        // Cookie Property Validation Check
        const isSizeValid = get().cookieSize.value !== "";
        const isAmountValid = get().cookieAmount.value !== "";
        const isFlavorValid = get().cookieFlavor !== "";

        // Entire Cookie Form Validation Check
        const isCookieFormValid = isSizeValid && isAmountValid && isFlavorValid;

        // Setting State for Cookie Properties
        set({
            // Cookie Validation
            isCookieFormSubmitted: isCookieFormValid ? submitted : !submitted,
            cookieSizeError: isSizeValid ? "" : "Cookie Size is required.",
            cookieAmountError: isAmountValid ? "" : "Cookie Amount is required.",
            cookieFlavorError: isFlavorValid ? "" : "Cookie Flavor is required.",
        });
    },
    setCookieSize: (selected: OrderOption | null) => set({ cookieSize: selected! }),
    setCookieAmount: (selected: OrderOption | null) => set({ cookieAmount: selected! }),

    // Handlers
    handleCookieFlavor: (e: React.ChangeEvent<HTMLInputElement>) =>
        set({
            cookieFlavor: e.target.value,
        }),
    handleCookieFrosting: (e: React.ChangeEvent<HTMLInputElement>) =>
        set({
            cookieFrosting: e.target.value,
        }),
    handleCookieFilling: (e: React.ChangeEvent<HTMLInputElement>) =>
        set({
            cookieFilling: e.target.value,
        }),
    handleCookieFruitFilling: (e: React.ChangeEvent<HTMLInputElement>) =>
        set({
            cookieFruitFilling: e.target.value,
        }),
    handleCookieFruitTopping: (e: React.ChangeEvent<HTMLInputElement>) =>
        set({
            cookieFruitTopping: e.target.value,
        }),
}));

export default useCookieStore;
