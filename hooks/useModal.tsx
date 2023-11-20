import { create } from "zustand";

interface IModalStore {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useMenuModalStore = create<IModalStore>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));

export const useOrderModalStore = create<IModalStore>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));
