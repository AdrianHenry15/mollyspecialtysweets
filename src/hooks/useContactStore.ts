import { create } from "zustand";
import { OrderOption } from "../lib/GlobalOptions";

interface ContactStore {
    // STATE
    firstName: string;
    lastName: string;
    contactOption: string;
    // altContactOption: string
    date: string;
    deliveryOption: OrderOption | null;
    deliveryAddress: string;
    theme: string;
    colors: string;
    details: string;
    isContactFormSubmitted: boolean;
    // Error Handling
    firstNameError: string;
    lastNameError: string;
    contactOptionError: string;
    dateError: string;
    deliveryOptionError: string;
    themeError: string;
    colorsError: string;
    // Setters
    submitContactForm: (submitted: boolean) => void;
    setDeliveryOption: (selected: any) => void;
    // Handlers
    handleFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleContactOption: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // handleAltContactOption: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeliveryAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTheme: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // handleRecipient: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleColors: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDetails: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const useContactStore = create<ContactStore>((set, get) => ({
    firstName: "",
    lastName: "",
    contactOption: "",
    date: "",
    deliveryOption: { value: "", label: "" },
    deliveryAddress: "",
    theme: "",
    colors: "",
    details: "",
    isContactFormSubmitted: false,
    // Error Validation
    firstNameError: "",
    lastNameError: "",
    contactOptionError: "",
    dateError: "",
    deliveryOptionError: "",
    themeError: "",
    colorsError: "",
    // Setters
    submitContactForm: (submitted: boolean) => {
        const { ...state } = get();
        // Unique Validation Variables
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
        const phoneRegex = /^(?:\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

        // Contact Property Validation Check
        const isFirstNameValid = state.firstName !== "";
        const isLastNameValid = state.lastName !== "";
        // const isEmailValid = state.email !== "" && emailRegex.test(state.email);
        // const isPhoneValid = state.phone !== "" && phoneRegex.test(state.phone);
        const isContactOptionValid =
            (state.contactOption !== "" && emailRegex.test(state.contactOption)) || phoneRegex.test(state.contactOption);
        const isDateValid = state.date !== "" && dateRegex.test(state.date);
        const isDeliveryOptionValid = state.deliveryOption?.value !== "";
        // const isDeliveryAddressValid = state.deliveryOption?.value !== "delivery" && state.deliveryAddress !== "";
        const isThemeValid = state.theme !== "";
        // const isRecipientValid = state.recipient !== "";
        const isColorsValid = state.colors !== "";

        // Entire Contact Form Validation Check
        const isContactFormValid =
            isFirstNameValid &&
            isLastNameValid &&
            // isEmailValid &&
            // isPhoneValid &&
            isContactOptionValid &&
            isDateValid &&
            isDeliveryOptionValid &&
            isThemeValid &&
            // isRecipientValid &&
            isColorsValid;

        // Setting State for Contact Properties
        set({
            // Contact Validation
            isContactFormSubmitted: isContactFormValid ? submitted : !submitted,
            firstNameError: isFirstNameValid ? "" : "First Name is required.",
            lastNameError: isLastNameValid ? "" : "Last Name is required.",
            // emailError: isEmailValid ? "" : "Please enter valid Email Address. abc@123.com",
            // phoneError: isPhoneValid ? "" : "Please enter valid Phone Number.",
            contactOptionError: isContactOptionValid ? "" : "Please enter Phone Number or Email",
            dateError: isDateValid ? "" : "Please enter valid Date. 01/01/2014",
            deliveryOptionError: isDeliveryOptionValid ? "" : "Delivery Option is required.",
            // deliveryAddressError: isDeliveryAddressValid ? "" : "Please enter valid Address.",
            themeError: isThemeValid ? "" : "Party Theme is required.",
            // recipientError: isRecipientValid ? "" : "Recipient is required.",
            colorsError: isColorsValid ? "" : "Your Preferred Colors for the party is required.",
        });
    },
    setDeliveryOption: (selected: OrderOption | null) =>
        set({
            deliveryOption: selected,
        }),
    // Handlers
    handleDeliveryAddress: (e: React.ChangeEvent<HTMLInputElement>) =>
        set({
            deliveryAddress: e.target.value,
        }),
    handleTheme: (e: React.ChangeEvent<HTMLInputElement>) => set({ theme: e.target.value }),
    handleColors: (e: React.ChangeEvent<HTMLInputElement>) => set({ colors: e.target.value }),
    handleDetails: (e: React.ChangeEvent<HTMLTextAreaElement>) => set({ details: e.target.value }),
    handleFirstName: (e: React.ChangeEvent<HTMLInputElement>) => set({ firstName: e.target.value }),
    handleLastName: (e: React.ChangeEvent<HTMLInputElement>) => set({ lastName: e.target.value }),
    handleContactOption: (e: React.ChangeEvent<HTMLInputElement>) => set({ contactOption: e.target.value }),
    // handleAltContactOption: (e: React.ChangeEvent<HTMLInputElement>) => set({ contactOption: e.target.value }),
    handleDate: (e: React.ChangeEvent<HTMLInputElement>) => set({ date: e.target.value }),
}));

export default useContactStore;
