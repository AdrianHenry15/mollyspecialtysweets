import { OrderOption } from "@/app/costants/GlobalOptions";

export interface CakeStore {
  // STATE
  cakeShape: OrderOption;
  cakeTier: OrderOption;
  cakeSize: OrderOption;
  cakeFlavorInput: string;
  cakeFrostingInput: string;
  cakeFillingInput: string;
  cakeFruitFilling: string;
  cakeFruitTopping: string;
  cakeFormSubmit: boolean;
  // Error Handling
  cakeShapeError: string;
  cakeTierError: string;
  cakeSizeError: string;
  cakeFlavorInputError: string;
  cakeFrostingInputError: string;
  cakeFillingInputError: string;
  cakeFruitFillingError: string;
  cakeFruitToppingError: string;

  // Setters
  setCakeShape: (selected: OrderOption | null) => void;
  setCakeTier: (selected: OrderOption | null) => void;
  setCakeSize: (selected: OrderOption | null) => void;
  setCakeFormSubmit: (formSubmit: boolean) => void;

  // Handlers
  handleCakeFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCakeFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCakeFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCakeFruitFilling: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCakeFruitTopping: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
