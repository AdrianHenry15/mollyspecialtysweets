import { create } from "zustand";

interface ModalStore {
    orderModal: boolean;
    loginModal: boolean;
    signUpModal: boolean;
    orderModalError: "";
    setOrderModal: (isOpen: boolean) => void;
    setLoginModal: (isOpen: boolean) => void;
    setSignUpModal: (isOpen: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
    orderModal: false,
    loginModal: false,
    signUpModal: false,
    orderModalError: "",
    setOrderModal: (isOpen: boolean) => set({ orderModal: isOpen }),
    setLoginModal: (isOpen: boolean) => set({ loginModal: isOpen }),
    setSignUpModal: (isOpen: boolean) => set({ signUpModal: isOpen }),
}));

export default useModalStore;
