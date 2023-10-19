import { create } from "zustand";
import { OrderOption } from "../lib/GlobalOptions";

interface OrderTypeStore {
    cakeType: boolean;
    cupcakeType: boolean;
    cookieType: boolean;
    isOrderFormSubmitted: boolean;

    orderType: OrderOption[] | null;
    setOrderType: (selected: OrderOption[] | null) => void;

    submitOrderForm: (submitted: boolean) => void;
    setCakeType: (selected: boolean) => void;
    setCupcakeType: (selected: boolean) => void;
    setCookieType: (selected: boolean) => void;
}

const useOrderTypeStore = create<OrderTypeStore>((set) => ({
    cakeType: false,
    cupcakeType: false,
    cookieType: false,
    orderType: [],
    isOrderFormSubmitted: false,
    setOrderType: (selected: OrderOption[] | null) => {
        set({
            orderType: selected || [],
        });
    },
    submitOrderForm: (submitted: boolean) =>
        set({
            isOrderFormSubmitted: submitted,
        }),
    setCakeType: (selected: boolean) => {
        set({ cakeType: selected });
    },
    setCupcakeType: (selected: boolean) => {
        set({ cupcakeType: selected });
    },
    setCookieType: (selected: boolean) => {
        set({ cookieType: selected });
    },
}));

export default useOrderTypeStore;
