import { create } from "zustand";
import { OrderOption } from "../lib/GlobalOptions";

interface OrderTypeStore {
    orderType: OrderOption[] | null;
    setOrderType: (selected: OrderOption[] | null) => void;
    isOrderFormSubmitted: boolean;
    submitOrderForm: (submitted: boolean) => void;
}

const useOrderTypeStore = create<OrderTypeStore>((set) => ({
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
}));

export default useOrderTypeStore;
