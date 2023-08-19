"use client";
import React, { useState } from "react";
import Select from "react-select";

import { AmountOptions, SizeOptions } from "@/app/costants/GlobalOptions";
import { useGlobalStore } from "@/app/stores/GlobalStore";
import Link from "next/link";

const CookieOrderForm = () => {
    const { ...state } = useGlobalStore().cookieStore;
    const { modalError } = useGlobalStore().modalStore;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        state.setCookieFormSubmit(true);
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
                <input
                    value={state.cookieFlavorInput}
                    onChange={(e) => state.handleCookieFlavorInput(e)}
                    type="text"
                    placeholder="Vanilla, Chocolate, Strawberry etc..."
                    className="w-full"
                    style={{ minHeight: "38px" }}
                />
                {state.cookieFlavorInputError && <div className="text-red-600 absolute my-16">{state.cookieFlavorInputError}</div>}
            </div>
            {/* FROSTING INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Frosting</strong> would you like on your <strong>Cookies</strong>?
                </span>
                <input
                    value={state.cookieFrostingInput}
                    onChange={(e) => state.handleCookieFrostingInput(e)}
                    type="text"
                    placeholder="Vanilla Buttercream..."
                    className="w-full"
                    style={{ minHeight: "38px" }}
                />
            </div>
            {/* FILLING INPUT */}
            <div className="form-item">
                <span>
                    What <strong>Filling</strong> would you like in your <strong>Cookies</strong>?
                </span>
                <input
                    value={state.cookieFillingInput}
                    onChange={(e) => state.handleCookieFillingInput(e)}
                    type="text"
                    placeholder="Vanilla Buttercream..."
                    className="w-full"
                    style={{ minHeight: "38px" }}
                />
            </div>

            {/* FRUIT FILLING  */}
            <div className="form-item">
                <span>
                    Would you like a <strong>Fruit Filling</strong> in your <strong>Cookies</strong>?
                </span>
                <input
                    className="w-full"
                    style={{ minHeight: "38px" }}
                    placeholder="Strawberries Filling..."
                    type="text"
                    value={state.cookieFruitFillingInput}
                    onChange={(e) => state.handleCookieFruitFillingInput(e)}
                />
            </div>

            {/* FRUIT TOPPING  */}
            <div className="form-item">
                <span>
                    Would you like a <strong>Fruit Topping</strong> in your <strong>Cookies</strong>?
                </span>
                <input
                    className="w-full"
                    style={{ minHeight: "38px" }}
                    placeholder="Strawberries..."
                    value={state.cookieFruitToppingInput}
                    onChange={(e) => state.handleCookieFruitToppingInput(e)}
                />
            </div>

            {/* Cookie Form Submit Button */}
            <div className="form-btn-container">
                <Link href={"#cookie"} replace>
                    <button className="order-form-submit" type="submit" onClick={(e) => handleSubmit(e)}>
                        Submit Cookie <br /> Form
                    </button>
                </Link>
                {modalError && <div className="text-red-600 absolute my-16">{modalError}</div>}
            </div>
        </div>
    );
};

export default CookieOrderForm;
