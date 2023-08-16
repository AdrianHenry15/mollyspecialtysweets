import { CakeStore } from "./schemas/CakeStore"
import { ContactStore } from "./schemas/ContactStore"
import { create } from "zustand"
import { CupcakeStore } from "./schemas/CupcakeStore"
import { CookieStore } from "./schemas/CookieStore"
import { OrderTypeStore } from "./schemas/OrderTypeStore"
import { ModalStore } from "./schemas/ModalStore"
import { OrderOption } from "../costants/GlobalOptions"

interface GlobalStore {
  contactStore: ContactStore
  cakeStore: CakeStore
  cupcakeStore: CupcakeStore
  cookieStore: CookieStore
  orderTypeStore: OrderTypeStore
  modalStore: ModalStore
}

export const useGlobalStore = create<GlobalStore>()((set) => ({
  // CONTACT STORE
  contactStore: {
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
    deliveryAddress: "",
    // ACTIONS
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
    setDeliveryOption: (selected: OrderOption | null) =>
      set((state) => ({
        ...state,
        contactStore: {
          ...state.contactStore,
          deliveryOption: selected!,
        },
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
    setContactFormSubmit: (formSubmit: boolean) =>
      set((state) => ({
        ...state,
        contactStore: { ...state.contactStore, contactFormSubmit: formSubmit },
      })),
    contactFormSubmit: false,
  },
  cakeStore: {
    // STATE
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

    cakeFormSubmit: false,

    // ACTIONS
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
    setCakeFormSubmit: (formSubmit: boolean) =>
      set((state) => ({
        ...state,
        cakeStore: { ...state.cakeStore, cakeFormSubmit: formSubmit },
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
}))
