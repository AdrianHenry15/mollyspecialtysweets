import { create } from "zustand";

// Load order method data from localStorage
const loadDeliveryMethodFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const orderDate = localStorage.getItem("orderDate");
        const deliveryAddress = localStorage.getItem("deliveryAddress");
        const deliveryMethod = localStorage.getItem("deliveryMethod") as "pickup" | "delivery" | null;

        return {
            orderDate: orderDate ? orderDate : null,
            deliveryAddress: deliveryAddress ? deliveryAddress : null,
            deliveryMethod: deliveryMethod ? deliveryMethod : null,
        };
    }
    return {
        orderDate: null,
        deliveryAddress: null,
        deliveryMethod: null,
    };
};

// Save order method data to localStorage
const saveDeliveryMethodToLocalStorage = (state: {
    orderDate: string | null;
    deliveryAddress: string | null;
    deliveryMethod: "pickup" | "delivery" | null;
}) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("orderDate", state.orderDate || "");
        localStorage.setItem("deliveryAddress", state.deliveryAddress || "");
        localStorage.setItem("deliveryMethod", state.deliveryMethod || "");
    }
};

interface deliveryMethodState {
    orderDate: string | null;
    deliveryAddress: string | null;
    deliveryMethod: "pickup" | "delivery" | null;
    setOrderDate: (date: string) => void;
    setDeliveryAddress: (address: string) => void;
    setDeliveryMethod: (method: "pickup" | "delivery") => void;
    clearDeliveryMethod: () => void;
}

const useDeliveryMethodStore = create<deliveryMethodState>((set, get) => ({
    ...loadDeliveryMethodFromLocalStorage(), // Initialize state from localStorage

    setOrderDate: (date: string) => {
        set((state) => {
            const newState = { ...state, orderDate: date };
            saveDeliveryMethodToLocalStorage(newState);
            return newState;
        });
    },

    setDeliveryAddress: (address: string) => {
        set((state) => {
            const newState = { ...state, deliveryAddress: address };
            saveDeliveryMethodToLocalStorage(newState);
            return newState;
        });
    },

    setDeliveryMethod: (method: "pickup" | "delivery") => {
        set((state) => {
            const newState = { ...state, deliveryMethod: method };
            saveDeliveryMethodToLocalStorage(newState);
            return newState;
        });
    },

    clearDeliveryMethod: () => {
        set(() => {
            const newState = {
                orderDate: null,
                deliveryAddress: null,
                deliveryMethod: null,
            };
            saveDeliveryMethodToLocalStorage(newState);
            return newState;
        });
    },
}));

export default useDeliveryMethodStore;
