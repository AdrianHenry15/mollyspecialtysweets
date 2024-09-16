import React, { useState } from "react";
import CheckoutComponentContainer from "./checkout-component-container";
import { useCartStore } from "@/stores/cart-store";
import useDeliveryMethodStore from "@/stores/delivery-method-store";

type TipAmount = 2 | 3 | 4 | "Other";

const OrderDetailsCheckout = () => {
    // Stores
    const { items } = useCartStore();
    const { deliveryMethod } = useDeliveryMethodStore();

    // State
    const [selectedTipAmount, setSelectedTipAmount] = useState<TipAmount | null>(null);
    const [customTipAmount, setCustomTipAmount] = useState(0);

    // Constants
    const SALES_TAX_RATE = 0.065;

    // Calculate subtotal
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // Calculate sales tax
    const salesTax = subtotal * SALES_TAX_RATE;

    // Assuming a fixed or dynamic tip (set to 0 for now)
    const tip = selectedTipAmount !== "Other" && selectedTipAmount ? selectedTipAmount : customTipAmount | 0; // Replace with actual logic if tips are dynamic or user-configurable

    // Calculate total
    const total = subtotal + salesTax + tip;

    // Functions
    const renderTipButton = (amount: TipAmount) => {
        return (
            <button
                onClick={() => setSelectedTipAmount(amount)}
                className={`${selectedTipAmount === amount ? "bg-pink-300" : "hover:bg-pink-200 hover:scale-105"}  ease-in-out duration-300 transition-all flex items-center justify-center px-10 py-4 border border-black rounded-md`}
            >
                {amount !== "Other" ? "$" : ""}
                {amount}
            </button>
        );
    };

    const handleCustomTip = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomTipAmount(parseInt(e.target.value));
    };
    return (
        <CheckoutComponentContainer title="Order Details">
            {/* Pricing */}
            <div className="flex flex-col w-full">
                {/* Subtotal */}
                <div className="flex items-center justify-between w-full text-lg">
                    <h5 className="text-black font-semibold">Subtotal</h5>
                    <p className="text-black font-semibold">${subtotal.toFixed(2)}</p>
                </div>
                {/* Sales Tax */}
                <div className="flex items-center justify-between w-full">
                    <p className="">Sales Tax (6.50%)</p>
                    <p className="">${salesTax.toFixed(2)}</p>
                </div>
                {/* Tip */}
                <div className="flex items-center justify-between w-full">
                    <p className="">Tip</p>
                    <p className="">${tip.toFixed(2)}</p>
                </div>
                {/* Tip Buttons */}
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-evenly">
                        {renderTipButton(2)}
                        {renderTipButton(3)}
                        {renderTipButton(4)}
                        {renderTipButton("Other")}
                    </div>
                    {selectedTipAmount === "Other" && (
                        <div className="flex flex-col items-start my-4">
                            <label className="font-semibold text-sm">Enter Tip Amount here:</label>
                            <input
                                onChange={(e) => handleCustomTip(e)}
                                className="self-start w-full lg:w-1/2"
                                placeholder="Enter Amount..."
                            />
                            {/* <button className="hover:scale-105 ease-in-out duration-300 transition-transform bg-pink-300 flex items-center justify-center px-8 py-1 text-white rounded-md my-2 text-sm">
                                Confirm
                            </button> */}
                        </div>
                    )}
                </div>
                {/* Total */}
                <div className="flex items-center justify-between my-4 text-lg font-semibold">
                    <h5>Total</h5>
                    <h5>${total}</h5>
                </div>
            </div>
        </CheckoutComponentContainer>
    );
};

export default OrderDetailsCheckout;
