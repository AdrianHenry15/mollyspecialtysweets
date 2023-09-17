import { OrderOption } from "../../lib/GlobalOptions";

export interface CakeStore {
    // STATE
    cakeShape: OrderOption;
    cakeTier: OrderOption;
    cakeSize: OrderOption;
    cakeFlavorInput: string;
    cakeFrostingInput: string;
    cakeFillingInput: string;
    cakeFruitFillingInput: string;
    cakeFruitToppingInput: string;
    isCakeFormSubmitted: boolean;
    // Error Handling
    cakeShapeError: string;
    cakeTierError: string;
    cakeSizeError: string;
    cakeFlavorInputError: string;
    cakeFrostingInputError: string;
    cakeFillingInputError: string;

    // Setters
    setCakeShape: (selected: OrderOption | null) => void;
    setCakeTier: (selected: OrderOption | null) => void;
    setCakeSize: (selected: OrderOption | null) => void;
    submitCakeForm: (submitted: boolean) => void;

    // Handlers
    handleCakeFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCakeFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCakeFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCakeFruitFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCakeFruitToppingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
