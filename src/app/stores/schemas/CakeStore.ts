import { OrderOption } from "@/app/costants/GlobalOptions"

export interface CakeStore {
  // STATE
  cakeShape?: OrderOption
  cakeTier?: OrderOption
  cakeSize?: OrderOption
  cakeFlavorInput?: string
  cakeFrostingInput?: string
  cakeFillingInput?: string
  cakeFruitFilling?: OrderOption
  cakeFruitTopping?: OrderOption
  cakeFruitFillingInput?: string
  cakeFruitToppingInput?: string

  cakeFormSubmit?: boolean

  // ACTIONS
  setCakeShape?: (selected: OrderOption | null) => void
  setCakeTier?: (selected: OrderOption | null) => void
  setCakeSize?: (selected: OrderOption | null) => void
  handleCakeFlavorInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCakeFrostingInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCakeFillingInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  setCakeFruitFilling?: (selected: OrderOption | null) => void
  setCakeFruitTopping?: (selected: OrderOption | null) => void
  handleCakeFruitFillingInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCakeFruitToppingInput?: (e: React.ChangeEvent<HTMLInputElement>) => void

  setCakeFormSubmit?: (formSubmit: boolean) => void
}
