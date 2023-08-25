import { OrderOption } from "../../_costants/GlobalOptions";

export interface ContactStore {
    // STATE
    firstName: string;
    lastName: string;
    // email: string;
    // phone: string;
    contactOption: string;
    date: string;
    deliveryOption: OrderOption | null;
    deliveryAddress: string;
    theme: string;
    // recipient: string;
    colors: string;
    details: string;
    isContactFormSubmitted: boolean;
    // Error Handling
    firstNameError: string;
    lastNameError: string;
    // emailError: string;
    // phoneError: string;
    contactOptionError: string;
    dateError: string;
    deliveryOptionError: string;
    // deliveryAddressError: string;
    themeError: string;
    // recipientError: string;
    colorsError: string;
    // Setters
    submitContactForm: (submitted: boolean) => void;
    setDeliveryOption: (selected: any) => void;
    // Handlers
    handleFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // handlePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleContactOption: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeliveryAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTheme: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // handleRecipient: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleColors: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDetails: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
