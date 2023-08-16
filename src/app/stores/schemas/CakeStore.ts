import { OrderOption } from "@/app/costants/GlobalOptions"

export interface CakeStore {
  // STATE
  cakeShape: OrderOption
  cakeTier: OrderOption
  cakeSize: OrderOption
  cakeFlavorInput: string
  cakeFrostingInput: string
  cakeFillingInput: string
  cakeFruitFilling: OrderOption
  cakeFruitTopping: OrderOption
  cakeFruitFillingInput?: string
  cakeFruitToppingInput?: string
  isCakeFormSubmitted: boolean
  // // Validation

  cakeShapeError: string
  cakeTierError: string
  cakeSizeError: string
  cakeFlavorError: string
  cakeFrostingError: string
  cakeFillingError: string
  cakeFruitFillingError: string
  cakeFruitToppingError: string
  cakeFruitFillingInputError?: string
  cakeFruitToppingInputError?: string

  handlers: {
    // Handlers
    handleCakeFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleCakeFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleCakeFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleCakeFruitFillingInput: (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void
    handleCakeFruitToppingInput: (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void
  }
  setters: {
    setCakeShape: (selected: OrderOption | null) => void
    setCakeTier: (selected: OrderOption | null) => void
    setCakeSize: (selected: OrderOption | null) => void
    setCakeFruitFilling: (selected: OrderOption | null) => void
    setCakeFruitTopping: (selected: OrderOption | null) => void
    submitCakeForm?: (formSubmit: boolean) => void
  }
}
