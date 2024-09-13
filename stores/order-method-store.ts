import { create } from "zustand";

// Load order method data from localStorage
const loadOrderMethodFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const deliveryDate = localStorage.getItem("deliveryDate");
        const deliveryAddress = localStorage.getItem("deliveryAddress");
        const orderMethod = localStorage.getItem("orderMethod") as "pickup" | "delivery" | null;

        return {
            deliveryDate: deliveryDate ? deliveryDate : null,
            deliveryAddress: deliveryAddress ? deliveryAddress : null,
            orderMethod: orderMethod ? orderMethod : null,
        };
    }
    return {
        deliveryDate: null,
        deliveryAddress: null,
        orderMethod: null,
    };
};

// Save order method data to localStorage
const saveOrderMethodToLocalStorage = (state: {
    deliveryDate: string | null;
    deliveryAddress: string | null;
    orderMethod: "pickup" | "delivery" | null;
}) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("deliveryDate", state.deliveryDate || "");
        localStorage.setItem("deliveryAddress", state.deliveryAddress || "");
        localStorage.setItem("orderMethod", state.orderMethod || "");
    }
};

interface OrderMethodState {
    deliveryDate: string | null;
    deliveryAddress: string | null;
    orderMethod: "pickup" | "delivery" | null;
    setDeliveryDate: (date: string) => void;
    setDeliveryAddress: (address: string) => void;
    setOrderMethod: (method: "pickup" | "delivery") => void;
    clearOrderMethod: () => void;
}

const useOrderMethodStore = create<OrderMethodState>((set, get) => ({
    ...loadOrderMethodFromLocalStorage(), // Initialize state from localStorage

    setDeliveryDate: (date: string) => {
        set((state) => {
            const newState = { ...state, deliveryDate: date };
            saveOrderMethodToLocalStorage(newState);
            return newState;
        });
    },

    setDeliveryAddress: (address: string) => {
        set((state) => {
            const newState = { ...state, deliveryAddress: address };
            saveOrderMethodToLocalStorage(newState);
            return newState;
        });
    },

    setOrderMethod: (method: "pickup" | "delivery") => {
        set((state) => {
            const newState = { ...state, orderMethod: method };
            saveOrderMethodToLocalStorage(newState);
            return newState;
        });
    },

    clearOrderMethod: () => {
        set(() => {
            const newState = {
                deliveryDate: null,
                deliveryAddress: null,
                orderMethod: null,
            };
            saveOrderMethodToLocalStorage(newState);
            return newState;
        });
    },
}));

export default useOrderMethodStore;
