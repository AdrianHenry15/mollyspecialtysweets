import { OrderOption } from "@/app/costants/GlobalOptions";

export interface CupcakeStore {
  // STATE
  cupcakeSize: OrderOption;
  cupcakeAmount: OrderOption;
  cupcakeFlavorInput: string;
  cupcakeFrostingInput: string;
  cupcakeFillingInput: string;
  cupcakeFruitFillingInput: string;
  cupcakeFruitToppingInput: string;
  cupcakeFormSubmit: boolean;
  // Error Handling
  cupcakeShapeError: string;
  cupcakeAmountError: string;
  cupcakeTierError: string;
  cupcakeSizeError: string;
  cupcakeFlavorInputError: string;
  cupcakeFrostingInputError: string;

  // Setters
  setCupcakeFormSubmit: (formSubmit: boolean) => void;
  setCupcakeSize: (selectedSize: OrderOption | null) => void;
  setCupcakeAmount: (selectedAmount: OrderOption | null) => void;
  // Handlers
  handleCupcakeFruitFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCupcakeFruitToppingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCupcakeFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCupcakeFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCupcakeFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
