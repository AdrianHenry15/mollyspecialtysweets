import { AmountOptions, SizeOptions } from "../../lib/GlobalOptions";
import React from "react";
import Select from "react-select";
import Input from "../inputs/Input";
import useCookieStore from "../../hooks/useCookieStore";
import FormButton from "../buttons/FormButton";

const CookieOrderForm = () => {
    const { ...state } = useCookieStore();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.submitCookieForm(true);
    };

    const handleFlavor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCookieFlavor(value);
    };

    const handleFrosting = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCookieFrosting(value);
    };

    const handleFilling = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCookieFilling(value);
    };

    const handleFruitFilling = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCookieFruitFilling(value);
    };

    const handleFruitTopping = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        state.setCookieFruitTopping(value);
    };

    return (
        <div id="cookie" className="flex flex-col justify-center">
            <h5>Cookie Order Form</h5>
            {/* SIZE  */}
            <div className="form-item">
                <span>
                    What <strong>Size</strong> would you like your <strong>Cookies</strong> to be?
                </span>
                <Select
                    value={state.cookieSize.value === "" ? "Select..." : state.cookieSize}
                    onChange={(selectedSize: any) => state.setCookieSize(selectedSize)}
                    className="w-full"
                    name="order-options"
                    options={SizeOptions}
                />
                {state.cookieSizeError && <div className="text-red-600 absolute my-16">{state.cookieSizeError}</div>}
            </div>
            {/* AMOUNT  */}
            <div className="form-item">
                <span>
                    How many <strong>Cookies</strong> would you like?
                </span>
                <Select
                    value={state.cookieAmount.value === "" ? "Select..." : state.cookieAmount}
                    onChange={(selected: any) => state.setCookieAmount(selected)}
                    className="w-full"
                    name="order-options"
                    options={AmountOptions}
                />
                {state.cookieAmountError && <div className="text-red-600 absolute my-16">{state.cookieAmountError}</div>}
            </div>
            {/* FLAVOR INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Flavor</strong> would you like your <strong>Cookies</strong> to be?
                </span>
                <Input value={state.cookieFlavor} onChange={(e) => handleFlavor(e)} placeholder="Vanilla, Chocolate, Strawberry etc..." />
                {state.cookieFlavorError && <div className="text-red-600 absolute my-16">{state.cookieFlavorError}</div>}
            </div>
            {/* FROSTING INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Frosting</strong> would you like on your <strong>Cookies</strong>?
                </span>
                <Input value={state.cookieFrosting} onChange={(e) => handleFrosting(e)} placeholder="Vanilla Buttercream..." />
            </div>
            {/* FILLING INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Filling</strong> would you like in your <strong>Cookies</strong>?
                </span>
                <Input value={state.cookieFilling} onChange={(e) => handleFilling(e)} placeholder="Vanilla Buttercream..." />
            </div>

            {/* FRUIT FILLING  */}
            <div className="form-item">
                <span>
                    Would you like a <strong>Fruit Filling</strong> in your <strong>Cookies</strong>?
                </span>
                <Input placeholder="Strawberries Filling..." value={state.cookieFruitFilling} onChange={(e) => handleFruitFilling(e)} />
            </div>

            {/* FRUIT TOPPING  */}
            <div className="form-item">
                <span>
                    Would you like a <strong>Fruit Topping</strong> in your <strong>Cookies</strong>?
                </span>
                <Input placeholder="Strawberries..." value={state.cookieFruitTopping} onChange={(e) => handleFruitTopping(e)} />
            </div>

            {/* Cookie Form Submit Button */}
            <FormButton href="#cookie" handleSubmit={(e) => handleSubmit(e)} />
        </div>
    );
};

export default CookieOrderForm;