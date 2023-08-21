import { OrderOption } from "../../_costants/GlobalOptions";

export interface CookieStore {
    // STATE
    cookieSize: OrderOption;
    cookieAmount: OrderOption;
    cookieFlavorInput: string;
    cookieFrostingInput: string;
    cookieFillingInput: string;
    cookieFruitFillingInput: string;
    cookieFruitToppingInput: string;
    cookieFormSubmit: boolean;
    // Error Handling
    cookieShapeError: string;
    cookieAmountError: string;
    cookieSizeError: string;
    cookieFlavorInputError: string;

    // Setters
    setCookieFormSubmit: (formSubmit: boolean) => void;
    setCookieSize: (selectedSize: OrderOption | null) => void;
    setCookieAmount: (selectedAmount: OrderOption | null) => void;
    // Handlers
    handleCookieFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFruitFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFruitToppingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
