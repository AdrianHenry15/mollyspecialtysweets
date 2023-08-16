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
  cookieFormSubmit: boolean
  // Error Handling
  // cookieShapeError: string
  // cookieTierError: string
  // cookieSizeError: string
  // cookieFlavorInputError: string
  // cookieFrostingInputError: string
  // cookieFillingInputError: string
  // cookieFruitFillingError: string
  // cookieFruitToppingError: string
  // cookieFruitFillingInputError: string
  // cookieFruitToppingInputError: string

  // ACTIONS
  setCookieSize: (selectedSize: OrderOption | null) => void
  setCookieAmount: (selectedAmount: OrderOption | null) => void
  handleCookieFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCookieFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCookieFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  setCookieFruitFilling: (selectedFruit: OrderOption | null) => void
  setCookieFruitTopping: (selectedFruit: OrderOption | null) => void
  handleCookieFruitFillingInput: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  handleCookieFruitToppingInput: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  setCookieFormSubmit: (formSubmit: boolean) => void
}
