import { OrderOption } from "@/app/costants/GlobalOptions"

export interface CupcakeStore {
  // STATE
  cupcakeSize: OrderOption
  cupcakeAmount: OrderOption
  cupcakeFlavorInput: string
  cupcakeFrostingInput: string
  cupcakeFillingInput: string
  cupcakeFruitFilling: OrderOption
  cupcakeFruitTopping: OrderOption
  cupcakeFruitFillingInput: string
  cupcakeFruitToppingInput: string

  cupcakeFormSubmit: boolean

  // ACTIONS
  setCupcakeSize: (selectedSize: OrderOption | null) => void
  setCupcakeAmount: (selectedAmount: OrderOption | null) => void
  handleCupcakeFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCupcakeFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCupcakeFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  setCupcakeFruitFilling: (selectedFruit: OrderOption | null) => void
  setCupcakeFruitTopping: (selectedFruit: OrderOption | null) => void
  handleCupcakeFruitFillingInput: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  handleCupcakeFruitToppingInput: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void

  setCupcakeFormSubmit: (formSubmit: boolean) => void
}
