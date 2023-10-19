import { create } from "zustand";

interface ModalStore {
    orderModal: boolean;
    loginModal: boolean;
    signUpModal: boolean;
    cakeModal: boolean;
    cupcakeModal: boolean;
    cookieModal: boolean;
    orderModalError: "";
    setOrderModal: (isOpen: boolean) => void;
    setLoginModal: (isOpen: boolean) => void;
    setSignUpModal: (isOpen: boolean) => void;
    setCakeModal: (isOpen: boolean) => void;
    setCupcakeModal: (isOpen: boolean) => void;
    setCookieModal: (isOpen: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
    orderModal: false,
    loginModal: false,
    signUpModal: false,
    cakeModal: false,
    cupcakeModal: false,
    cookieModal: false,
    orderModalError: "",
    setOrderModal: (isOpen: boolean) => set({ orderModal: isOpen }),
    setLoginModal: (isOpen: boolean) => set({ loginModal: isOpen }),
    setSignUpModal: (isOpen: boolean) => set({ signUpModal: isOpen }),
    setCakeModal: (isOpen: boolean) => set({ cakeModal: isOpen }),
    setCupcakeModal: (isOpen: boolean) => set({ cupcakeModal: isOpen }),
    setCookieModal: (isOpen: boolean) => set({ cookieModal: isOpen }),
}));

export default useModalStore;
