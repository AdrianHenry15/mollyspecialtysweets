import { OrderOption } from "@/app/costants/GlobalOptions"

export interface CookieStore {
  // STATE
  cookieSize: OrderOption
  cookieAmount: OrderOption
  cookieFlavorInput: string
  cookieFrostingInput: string
  cookieFillingInput: string
  cookieFruitFilling: OrderOption
  cookieFruitTopping: OrderOption
  cookieFruitFillingInput: string
  cookieFruitToppingInput: string
  isCookieFormSubmitted: boolean

  // ACTIONS
  setCookieSize: (selectedSize: OrderOption | null) => void
  setCookieAmount: (selectedAmount: OrderOption | null) => void
  handleCookieFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCookieFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCookieFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  setCookieFruitFilling: (selectedFruit: OrderOption | null) => void
  setCookieFruitTopping: (selectedFruit: OrderOption | null) => void
  handleCookieFruitFillingInput?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  handleCookieFruitToppingInput?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  submitCookieForm?: (formSubmit: boolean) => void
}
