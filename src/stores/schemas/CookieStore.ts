import { OrderOption } from "../../lib/GlobalOptions";

export interface CookieStore {
    // STATE
    cookieSize: OrderOption;
    cookieAmount: OrderOption;
    cookieFlavorInput: string;
    cookieFrostingInput: string;
    cookieFillingInput: string;
    cookieFruitFillingInput: string;
    cookieFruitToppingInput: string;
    isCookieFormSubmitted: boolean;
    // Error Handling
    cookieShapeError: string;
    cookieAmountError: string;
    cookieSizeError: string;
    cookieFlavorInputError: string;

    // Setters
    submitCookieForm: (submitted: boolean) => void;
    setCookieSize: (selected: OrderOption | null) => void;
    setCookieAmount: (selected: OrderOption | null) => void;
    // Handlers
    handleCookieFlavorInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFrostingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFruitFillingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCookieFruitToppingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
