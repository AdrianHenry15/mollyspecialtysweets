export interface ModalStore {
    modal: boolean;
    modalError: string;
    setModal: (isOpen: boolean) => void;
}
