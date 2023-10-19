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
    // setrs
    setCookieFlavor: (text: string) => void;
    setCookieFrosting: (text: string) => void;
    setCookieFilling: (text: string) => void;
    setCookieFruitFilling: (text: string) => void;
    setCookieFruitTopping: (text: string) => void;
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
    setCookieFlavor: (text: string) =>
        set({
            cookieFlavor: text,
        }),
    setCookieFrosting: (text: string) =>
        set({
            cookieFrosting: text,
        }),
    setCookieFilling: (text: string) =>
        set({
            cookieFilling: text,
        }),
    setCookieFruitFilling: (text: string) =>
        set({
            cookieFruitFilling: text,
        }),
    setCookieFruitTopping: (text: string) =>
        set({
            cookieFruitTopping: text,
        }),
}));

export default useCookieStore;
