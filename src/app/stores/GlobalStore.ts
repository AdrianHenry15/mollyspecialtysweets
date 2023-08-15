import { CakeStore } from "./schemas/CakeStore"
import { ContactStore } from "./schemas/ContactStore"
import { create } from "zustand"
import { CupcakeStore } from "./schemas/CupcakeStore"
import { CookieStore } from "./schemas/CookieStore"
import { OrderTypeStore } from "./schemas/OrderTypeStore"
import { ModalStore } from "./schemas/ModalStore"
import { OrderOption } from "../costants/GlobalOptions"

// This interface represents an object of various other stores corresponding to a specific aspect of the app's state
interface GlobalStore {
  contactStore: ContactStore
  cakeStore: CakeStore
  cupcakeStore: CupcakeStore
  cookieStore: CookieStore
  orderTypeStore: OrderTypeStore
  modalStore: ModalStore
}

export const useGlobalStore = create<GlobalStore>()((set) => ({
  // Contact Store
  contactStore: {
    // State Props
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    deliveryOption: { value: "", label: "" },
    occasion: "",
    recipient: "",
    colors: "",
    details: "",
    contactFormSubmit: false,

    // Validation
    validation: {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      phoneError: "",
      dateError: "",
      deliveryOptionError: "",
      deliveryAddressError: "",
    },

    // Handlers
    handlers: {
      handleFirstName: (e: React.ChangeEvent<HTMLInputElement>) =>
        set((state) => {
          const updatedContactStore = {
            ...state.contactStore,
            firstName: e.target.value,
          }

          // Validation logic: Check if firstName is not empty
          const isValid = updatedContactStore.firstName.trim() !== ""

          return {
            ...state,
            contactStore: { ...updatedContactStore, isValid },
          }
        }),

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
    },
    setters: {
      // Setters
      setDeliveryOption: (selected: any) =>
        set((state) => ({
          ...state,
          contactStore: {
            ...state.contactStore,
            deliveryOption: selected || undefined,
          },
        })),
      setContactFormSubmit: (formSubmit: boolean) =>
        set((state) => ({
          ...state,
          contactStore: {
            ...state.contactStore,
            contactFormSubmit: formSubmit,
          },
        })),
    },
    validators: {},
  },
  // Cake Store
  cakeStore: {
    // State Props
    cakeShape: { value: "", label: "" },
    cakeTier: { value: "", label: "" },
    cakeSize: { value: "", label: "" },
    cakeFlavorInput: "",
    cakeFrostingInput: "",
    cakeFillingInput: "",
    cakeFruitFilling: { value: "", label: "" },
    cakeFruitTopping: { value: "", label: "" },
    cakeFruitFillingInput: "",
    cakeFruitToppingInput: "",
    // Validation
    cakeFormSubmit: false,

    // Handlers
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
        cakeStore: {
          ...state.cakeStore,
          cakeFruitFillingInput: e.target.value,
        },
      })),

    handleCakeFruitToppingInput: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((state) => ({
        ...state,
        cakeStore: {
          ...state.cakeStore,
          cakeFruitToppingInput: e.target.value,
        },
      })),

    // Setters
    setCakeFruitFilling: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFruitFilling: selected! },
      })),

    setCakeFruitTopping: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFruitTopping: selected! },
      })),

    setCakeFormSubmit: (formSubmit: boolean) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFormSubmit: formSubmit },
      })),

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
  },
  // Cupcake Store
  cupcakeStore: {
    // State Props
    cupcakeSize: { value: "", label: "" },
    cupcakeAmount: { value: "", label: "" },
    cupcakeFlavorInput: "",
    cupcakeFrostingInput: "",
    cupcakeFillingInput: "",
    cupcakeFruitFilling: { value: "", label: "" },
    cupcakeFruitTopping: { value: "", label: "" },
    cupcakeFruitFillingInput: "",
    cupcakeFruitToppingInput: "",
    // Validation
    cupcakeFormSubmit: false,

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

    // Setters
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

    setCupcakeFormSubmit: (formSubmit: boolean) =>
      set((state) => ({
        ...state,
        cupcakeStore: { ...state.cupcakeStore, cupcakeFormSubmit: formSubmit },
      })),
  },
  // Cookie Store
  cookieStore: {
    // State Props
    cookieSize: { value: "", label: "" },
    cookieAmount: { value: "", label: "" },
    cookieFlavorInput: "",
    cookieFrostingInput: "",
    cookieFillingInput: "",
    cookieFruitFilling: { value: "", label: "" },
    cookieFruitTopping: { value: "", label: "" },
    cookieFruitFillingInput: "",
    cookieFruitToppingInput: "",
    // Validation
    cookieFormSubmit: false,

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

    // Setters
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

    setCookieFormSubmit: (formSubmit: boolean) =>
      set((state) => ({
        ...state,
        cookieStore: { ...state.cookieStore, cookieFormSubmit: formSubmit },
      })),
  },
  // Order Type Store
  orderTypeStore: {
    // State Props
    orderType: [],
    orderFormSubmit: false,

    // Setters
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
  // Modal Store
  modalStore: {
    // State Props
    modal: false,

    // Setters
    setModal: (isOpen: boolean) =>
      set((state) => ({
        ...state,
        modalStore: { ...state.modalStore, modal: isOpen },
      })),
  },
}))
