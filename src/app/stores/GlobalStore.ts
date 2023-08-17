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
      // Contact Property Validation Check
      const isFirstNameValid = get().contactStore.firstName !== "";
      const isLastNameValid = get().contactStore.lastName !== "";
      const isEmailValid = get().contactStore.email !== "";
      const isPhoneValid = get().contactStore.phone !== "";
      const isDateValid = get().contactStore.date !== "";
      const isDeliveryOptionValid = get().contactStore.deliveryOption.value !== "";
      const isOccasionValid = get().contactStore.occasion !== "";
      const isRecipientValid = get().contactStore.recipient !== "";
      const isColorsValid = get().contactStore.colors !== "";

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
          emailError: isEmailValid ? "" : "Email is required.",
          phoneError: isPhoneValid ? "" : "Phone Number is required | 321-123-1234",
          dateError: isDateValid ? "" : "Date is required | 01/01/2014",
          deliveryOptionError: isDeliveryOptionValid ? "" : "Delivery Option is required.",
          occasionError: isOccasionValid ? "" : "Party Type is required.",
          recipientError: isRecipientValid ? "" : "Recipient is required.",
          colorsError: isColorsValid ? "" : "Your Preffered Colors for the party is required.",
        },
      }));
    },
    setDeliveryOption: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        contactStore: {
          ...state.contactStore,
          deliveryOption: selected!,
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
    cakeFruitFilling: "",
    cakeFruitTopping: "",
    cakeFormSubmit: false,
    // Error Handling
    cakeShapeError: "",
    cakeTierError: "",
    cakeSizeError: "",
    cakeFlavorInputError: "",
    cakeFrostingInputError: "",
    cakeFillingInputError: "",
    cakeFruitFillingError: "",
    cakeFruitToppingError: "",

    // ACTIONS
    setCakeFormSubmit: (formSubmit: boolean) => {
      // Cake Property Validation Check
      const isShapeValid = get().cakeStore.cakeShape.value !== "";
      const isTierValid = get().cakeStore.cakeTier.value !== "";
      const isSizeValid = get().cakeStore.cakeSize.value !== "";
      const isFlavorValid = get().cakeStore.cakeFlavorInput !== "";
      const isFrostingValid = get().cakeStore.cakeFrostingInput !== "";
      const isFillingValid = get().cakeStore.cakeFillingInput !== "";
      const isFruitFillingValid = get().cakeStore.cakeFruitFilling !== "";
      const isFruitToppingValid = get().cakeStore.cakeFruitTopping !== "";

      // Entire Cake Form Validation Check
      const isCakeFormValid =
        isShapeValid &&
        isTierValid &&
        isSizeValid &&
        isFlavorValid &&
        isFrostingValid &&
        isFillingValid &&
        isFruitFillingValid &&
        isFruitToppingValid;

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
          cakeFruitFillingError: isFruitFillingValid ? "" : "Cake Fruit Filling is required.",
          cakeFruitToppingError: isFruitToppingValid ? "" : "Cake Fruit Topping is required.",
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
    handleCakeFruitFilling: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFruitFilling: e.target.value },
      })),
    handleCakeFruitTopping: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFruitTopping: e.target.value },
      })),
  },
  cupcakeStore: {
    // STATE
    cupcakeSize: { value: "", label: "" },
    cupcakeAmount: { value: "", label: "" },
    cupcakeFlavorInput: "",
    cupcakeFrostingInput: "",
    cupcakeFillingInput: "",
    cupcakeFruitFilling: { value: "", label: "" },
    cupcakeFruitTopping: { value: "", label: "" },
    cupcakeFruitFillingInput: "",
    cupcakeFruitToppingInput: "",

    cupcakeFormSubmit: false,

    // ACTIONS
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
    setCupcakeFruitFilling: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cupcakeStore: { ...state.cupcakeStore, cupcakeFruitFilling: selected! },
      })),
    setCupcakeFruitTopping: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cupcakeStore: { ...state.cupcakeStore, cupcakeFruitTopping: selected! },
      })),
    handleCupcakeFruitFillingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cupcakeStore: {
          ...state.cupcakeStore,
          cupcakeFruitFillingInput: e.target.value,
        },
      })),
    handleCupcakeFruitToppingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cupcakeStore: {
          ...state.cupcakeStore,
          cupcakeFruitToppingInput: e.target.value,
        },
      })),

    setCupcakeFormSubmit: (formSubmit: boolean) =>
      set((state) => ({
        ...state,
        cupcakeStore: { ...state.cupcakeStore, cupcakeFormSubmit: formSubmit },
      })),
  },
  cookieStore: {
    // STATE
    cookieSize: { value: "", label: "" },
    cookieAmount: { value: "", label: "" },
    cookieFlavorInput: "",
    cookieFrostingInput: "",
    cookieFillingInput: "",
    cookieFruitFilling: { value: "", label: "" },
    cookieFruitTopping: { value: "", label: "" },
    cookieFruitFillingInput: "",
    cookieFruitToppingInput: "",

    cookieFormSubmit: false,

    // ACTIONS
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

    setCookieFormSubmit: (formSubmit: boolean) =>
      set((state) => ({
        ...state,
        cookieStore: { ...state.cookieStore, cookieFormSubmit: formSubmit },
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
