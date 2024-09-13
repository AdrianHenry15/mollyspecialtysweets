import { create } from "zustand";

interface OrderMethodState {
    deliveryDate: string | null;
    deliveryAddress: string | null;
    orderMethod: "pickup" | "delivery" | null;
    setDeliveryDate: (date: string) => void;
    setDeliveryAddress: (address: string) => void;
    setOrderMethod: (method: "pickup" | "delivery") => void;
    clearOrderMethod: () => void;
}

const useOrderMethodStore = create<OrderMethodState>((set) => ({
    deliveryDate: null,
    deliveryAddress: null,
    orderMethod: null,

    setDeliveryDate: (date) => set(() => ({ deliveryDate: date })),
    setDeliveryAddress: (address) => set(() => ({ deliveryAddress: address })),
    setOrderMethod: (method) => set(() => ({ orderMethod: method })),

    clearOrderMethod: () =>
        set(() => ({
            deliveryDate: null,
            deliveryAddress: null,
            orderMethod: null,
        })),
}));

export default useOrderMethodStore;
