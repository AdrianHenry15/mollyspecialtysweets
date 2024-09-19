import { create } from "zustand";

interface ModalState {
    isOpen: boolean;
    title: string;
    message: string;
    buttonText: string;
    onConfirm: () => void;
    onClose: () => void;
    openModal: (title: string, message: string, buttonText: string, onConfirm: () => void) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    title: "",
    message: "",
    buttonText: "",
    onConfirm: () => {},
    onClose: () => set({ isOpen: false }),
    openModal: (title, message, buttonText, onConfirm) => set({ isOpen: true, title, message, buttonText, onConfirm }),
    closeModal: () => set({ isOpen: false }),
}));
