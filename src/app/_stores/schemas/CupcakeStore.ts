import { OrderOption } from "../../_costants/GlobalOptions";

export interface CupcakeStore {
    // STATE
    cupcakeSize: OrderOption;
    cupcakeAmount: OrderOption;
    cupcakeFlavorInput: string;
    cupcakeFrostingInput: string;
    cupcakeFillingInput: string;
    cupcakeFruitFillingInput: string;
    cupcakeFruitToppingInput: string;
    isCupcakeFormSubmitted: boolean;
    // Error Handling
    cupcakeSizeError: string;
    cupcakeAmountError: string;
    cupcakeFlavorInputError: string;
    cupcakeFrostingInputError: string;

    // Setters
    submitCupcakeForm: (submitted: boolean) => void;
    setCupcakeSize: (selected: OrderOption | null) => void;
    setCupcakeAmount: (selected: OrderOption | null) => void;
    // Handlers
    handleCupcakeFruitFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCupcakeFruitToppingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCupcakeFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCupcakeFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCupcakeFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
