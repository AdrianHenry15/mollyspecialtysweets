import { CakeStore } from "./schemas/CakeStore";
import { ContactStore } from "./schemas/ContactStore";
import { create } from "zustand";
import { CupcakeStore } from "./schemas/CupcakeStore";
import { CookieStore } from "./schemas/CookieStore";
import { OrderTypeStore } from "./schemas/OrderTypeStore";
import { ModalStore } from "./schemas/ModalStore";
import { OrderOption } from "../costants/GlobalOptions";

interface GlobalStore {
  contactStore: ContactStore;
  cakeStore: CakeStore;
  cupcakeStore: CupcakeStore;
  cookieStore: CookieStore;
  orderTypeStore: OrderTypeStore;
  modalStore: ModalStore;
}

export const useGlobalStore = create<GlobalStore>()((set, get) => ({
  // CONTACT STORE
  contactStore: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    deliveryOption: { value: "", label: "" },
    deliveryAddress: "",
    occasion: "",
    recipient: "",
    colors: "",
    details: "",
    contactFormSubmit: false,
    // Error Validation
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    phoneError: "",
    dateError: "",
    deliveryOptionError: "",
    occasionError: "",
    recipientError: "",
    colorsError: "",
    // Setters
    setContactFormSubmit: (formSubmit: boolean) => {
      const { ...state } = get().contactStore;
      // Unique Validation Variables
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
      const phoneRegex = /^(?:\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

      // Contact Property Validation Check
      const isFirstNameValid = state.firstName !== "";
      const isLastNameValid = state.lastName !== "";
      const isEmailValid = state.email !== "" && emailRegex.test(state.email);
      const isPhoneValid = state.phone !== "" && phoneRegex.test(state.phone);
      const isDateValid = state.date !== "" && dateRegex.test(state.date);
      const isDeliveryOptionValid = state.deliveryOption?.value !== "";
      // const isDeliveryAddressValid = state.deliveryOption?.value !== "delivery" && state.deliveryAddress !== "";
      const isOccasionValid = state.occasion !== "";
      const isRecipientValid = state.recipient !== "";
      const isColorsValid = state.colors !== "";

      // Entire Contact Form Validation Check
      const isContactFormValid =
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isDateValid &&
        isDeliveryOptionValid &&
        isOccasionValid &&
        isRecipientValid &&
        isColorsValid;

      // Setting State for Contact Properties
      set((state) => ({
        ...state,
        contactStore: {
          // Contact Form Submission State
          ...state.contactStore,
          // Contact Validation
          contactFormSubmit: isContactFormValid ? formSubmit : !formSubmit,
          firstNameError: isFirstNameValid ? "" : "First Name is required.",
          lastNameError: isLastNameValid ? "" : "Last Name is required.",
          emailError: isEmailValid ? "" : "Please enter valid Email Address. abc@123.com",
          phoneError: isPhoneValid ? "" : "Please enter valid Phone Number.",
          dateError: isDateValid ? "" : "Please enter valid Date. 01/01/2014",
          deliveryOptionError: isDeliveryOptionValid ? "" : "Delivery Option is required.",
          // deliveryAddressError: isDeliveryAddressValid ? "" : "Please enter valid Address.",
          occasionError: isOccasionValid ? "" : "Party Type is required.",
          recipientError: isRecipientValid ? "" : "Recipient is required.",
          colorsError: isColorsValid ? "" : "Your Preferred Colors for the party is required.",
        },
      }));
    },
    setDeliveryOption: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        contactStore: {
          ...state.contactStore,
          deliveryOption: selected,
        },
      })),
    // Handlers
    handleDeliveryAddress: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        contactStore: {
          ...state.contactStore,
          deliveryAddress: e.target.value,
        },
      })),
    handleOccasion: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        contactStore: { ...state.contactStore, occasion: e.target.value },
      })),
    handleRecipient: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        contactStore: { ...state.contactStore, recipient: e.target.value },
      })),
    handleColors: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        contactStore: { ...state.contactStore, colors: e.target.value },
      })),
    handleDetails: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      set((state) => ({
        ...state,
        contactStore: { ...state.contactStore, details: e.target.value },
      })),
    handleFirstName: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        contactStore: { ...state.contactStore, firstName: e.target.value },
      })),
    handleLastName: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        contactStore: { ...state.contactStore, lastName: e.target.value },
      })),
    handleEmail: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        contactStore: { ...state.contactStore, email: e.target.value },
      })),
    handlePhone: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        contactStore: { ...state.contactStore, phone: e.target.value },
      })),
    handleDate: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        contactStore: { ...state.contactStore, date: e.target.value },
      })),
  },
  cakeStore: {
    // STATE
    cakeShape: { value: "", label: "" },
    cakeTier: { value: "", label: "" },
    cakeSize: { value: "", label: "" },
    cakeFlavorInput: "",
    cakeFrostingInput: "",
    cakeFillingInput: "",
    cakeFruitFillingInput: "",
    cakeFruitToppingInput: "",
    cakeFormSubmit: false,
    // Error Handling
    cakeShapeError: "",
    cakeTierError: "",
    cakeSizeError: "",
    cakeFlavorInputError: "",
    cakeFrostingInputError: "",
    cakeFillingInputError: "",

    // ACTIONS
    setCakeFormSubmit: (formSubmit: boolean) => {
      // Cake Property Validation Check
      const isShapeValid = get().cakeStore.cakeShape.value !== "";
      const isTierValid = get().cakeStore.cakeTier.value !== "";
      const isSizeValid = get().cakeStore.cakeSize.value !== "";
      const isFlavorValid = get().cakeStore.cakeFlavorInput !== "";
      const isFrostingValid = get().cakeStore.cakeFrostingInput !== "";
      const isFillingValid = get().cakeStore.cakeFillingInput !== "";

      // Entire Cake Form Validation Check
      const isCakeFormValid = isShapeValid && isTierValid && isSizeValid && isFlavorValid && isFrostingValid && isFillingValid;

      // Setting State for Cake Properties
      set((state) => ({
        ...state,
        cakeStore: {
          // Cake Form Submission State
          ...state.cakeStore,
          // Cake Validation
          cakeFormSubmit: isCakeFormValid ? formSubmit : !formSubmit,
          cakeShapeError: isShapeValid ? "" : "Cake Shape is required.",
          cakeTierError: isTierValid ? "" : "Cake Tier is required.",
          cakeSizeError: isSizeValid ? "" : "Cake Size is required.",
          cakeFlavorInputError: isFlavorValid ? "" : "Cake Flavor is required.",
          cakeFrostingInputError: isFrostingValid ? "" : "Cake Frosting is required.",
          cakeFillingInputError: isFillingValid ? "" : "Cake Filling is required.",
        },
      }));
    },
    // Setters
    setCakeShape: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeShape: selected! },
      })),
    setCakeTier: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeTier: selected! },
      })),
    setCakeSize: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeSize: selected! },
      })),

    //Handlers
    handleCakeFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFlavorInput: e.target.value },
      })),
    handleCakeFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFrostingInput: e.target.value },
      })),
    handleCakeFillingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFillingInput: e.target.value },
      })),
    handleCakeFruitFillingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFruitFillingInput: e.target.value },
      })),
    handleCakeFruitToppingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFruitToppingInput: e.target.value },
      })),
  },
  cupcakeStore: {
    // STATE
    cupcakeSize: { value: "", label: "" },
    cupcakeAmount: { value: "", label: "" },
    cupcakeFlavorInput: "",
    cupcakeFrostingInput: "",
    cupcakeFillingInput: "",
    cupcakeFruitFillingInput: "",
    cupcakeFruitToppingInput: "",
    cupcakeFormSubmit: false,
    // Error Handling
    cupcakeAmountError: "",
    cupcakeSizeError: "",
    cupcakeFlavorInputError: "",
    cupcakeFrostingInputError: "",

    // Setters
    setCupcakeFormSubmit: (formSubmit: boolean) => {
      // Cupcake Property Validation Check
      const isSizeValid = get().cupcakeStore.cupcakeSize.value !== "";
      const isAmountValid = get().cupcakeStore.cupcakeAmount.value !== "";
      const isFlavorValid = get().cupcakeStore.cupcakeFlavorInput !== "";
      const isFrostingValid = get().cupcakeStore.cupcakeFrostingInput !== "";

      // Entire Cupcake Form Validation Check
      const isCupcakeFormValid = isSizeValid && isAmountValid && isFlavorValid && isFrostingValid;

      // Setting State for Cupcake Properties
      set((state) => ({
        ...state,
        cupcakeStore: {
          // Cupcake Form Submission State
          ...state.cupcakeStore,
          // Cupcake Validation
          cupcakeFormSubmit: isCupcakeFormValid ? formSubmit : !formSubmit,
          cupcakeSizeError: isSizeValid ? "" : "Cupcake Size is required.",
          cupcakeAmountError: isAmountValid ? "" : "Cupcake Amount is required.",
          cupcakeFlavorInputError: isFlavorValid ? "" : "Cupcake Flavor is required.",
          cupcakeFrostingInputError: isFrostingValid ? "" : "Cupcake Frosting is required.",
        },
      }));
    },
    setCupcakeSize: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cupcakeStore: { ...state.cupcakeStore, cupcakeSize: selected! },
      })),
    setCupcakeAmount: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cupcakeStore: { ...state.cupcakeStore, cupcakeAmount: selected! },
      })),

    // Handlers
    handleCupcakeFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cupcakeStore: {
          ...state.cupcakeStore,
          cupcakeFlavorInput: e.target.value,
        },
      })),
    handleCupcakeFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cupcakeStore: {
          ...state.cupcakeStore,
          cupcakeFrostingInput: e.target.value,
        },
      })),
    handleCupcakeFillingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cupcakeStore: {
          ...state.cupcakeStore,
          cupcakeFillingInput: e.target.value,
        },
      })),
    handleCupcakeFruitFillingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cupcakeStore: { ...state.cupcakeStore, cupcakeFruitFillingInput: e.target.value },
      })),
    handleCupcakeFruitToppingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cupcakeStore: { ...state.cupcakeStore, cupcakeFruitToppingInput: e.target.value },
      })),
  },
  cookieStore: {
    // STATE
    cookieSize: { value: "", label: "" },
    cookieAmount: { value: "", label: "" },
    cookieFlavorInput: "",
    cookieFrostingInput: "",
    cookieFillingInput: "",
    cookieFruitFillingInput: "",
    cookieFruitToppingInput: "",
    cookieFormSubmit: false,
    // Error Handling
    cookieShapeError: "",
    cookieAmountError: "",
    cookieSizeError: "",
    cookieFlavorInputError: "",

    // Setters
    setCookieFormSubmit: (formSubmit: boolean) => {
      // Cookie Property Validation Check
      const isSizeValid = get().cookieStore.cookieSize.value !== "";
      const isAmountValid = get().cookieStore.cookieAmount.value !== "";
      const isFlavorValid = get().cookieStore.cookieFlavorInput !== "";

      // Entire Cookie Form Validation Check
      const isCookieFormValid = isSizeValid && isAmountValid && isFlavorValid;

      // Setting State for Cookie Properties
      set((state) => ({
        ...state,
        cookieStore: {
          // Cookie Form Submission State
          ...state.cookieStore,
          // Cookie Validation
          cookieFormSubmit: isCookieFormValid ? formSubmit : !formSubmit,
          cookieSizeError: isSizeValid ? "" : "Cookie Size is required.",
          cookieAmountError: isAmountValid ? "" : "Cookie Amount is required.",
          cookieFlavorInputError: isFlavorValid ? "" : "Cookie Flavor is required.",
        },
      }));
    },
    setCookieSize: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cookieStore: { ...state.cookieStore, cookieSize: selected! },
      })),
    setCookieAmount: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cookieStore: { ...state.cookieStore, cookieAmount: selected! },
      })),
    setCookieFruitFilling: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cookieStore: { ...state.cookieStore, cookieFruitFilling: selected! },
      })),
    setCookieFruitTopping: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cookieStore: { ...state.cookieStore, cookieFruitTopping: selected! },
      })),

    // Handlers
    handleCookieFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cookieStore: {
          ...state.cookieStore,
          cookieFlavorInput: e.target.value,
        },
      })),
    handleCookieFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cookieStore: {
          ...state.cookieStore,
          cookieFrostingInput: e.target.value,
        },
      })),
    handleCookieFillingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cookieStore: {
          ...state.cookieStore,
          cookieFillingInput: e.target.value,
        },
      })),
    handleCookieFruitFillingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cookieStore: {
          ...state.cookieStore,
          cookieFruitFillingInput: e.target.value,
        },
      })),
    handleCookieFruitToppingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cookieStore: {
          ...state.cookieStore,
          cookieFruitToppingInput: e.target.value,
        },
      })),
  },
  orderTypeStore: {
    orderType: [],
    orderFormSubmit: false,
    setOrderType: (selected: OrderOption[] | null) =>
      set((state) => ({
        ...state,
        orderTypeStore: { ...state.orderTypeStore, orderType: selected || [] },
      })),
    setOrderFormSubmit: (formSubmit: boolean) =>
      set((state) => ({
        ...state,
        orderTypeStore: {
          ...state.orderTypeStore,
          orderFormSubmit: formSubmit,
        },
      })),
  },
  modalStore: {
    modal: false,
    setModal: (isOpen: boolean) =>
      set((state) => ({
        ...state,
        modalStore: { ...state.modalStore, modal: isOpen },
      })),
  },
}));
