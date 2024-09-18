import React, { useState, useEffect } from "react";
import CheckoutComponentContainer from "./checkout-component-container";
import useDeliveryMethodStore from "@/stores/delivery-method-store";
import { useCartStore } from "@/stores/cart-store";

type TipAmount = 2 | 3 | 4 | "Other";

const OrderDetailsCheckout = () => {
    // Stores
    const { salesTax, deliveryFee, tip, total, setTip, setTotal } = useCartStore();
    const { deliveryMethod } = useDeliveryMethodStore();

    // State
    const [selectedTipAmount, setSelectedTipAmount] = useState<TipAmount | null>(null);
    const [customTipAmount, setCustomTipAmount] = useState(0);

    // Update subtotal and total when items or tip changes
    useEffect(() => {
        setTotal(); // Recalculate total when cart items change
    }, [setTotal]);

    useEffect(() => {
        if (selectedTipAmount === "Other") {
            setTip(customTipAmount);
        } else {
            setTip(selectedTipAmount || 0);
        }
    }, [selectedTipAmount, customTipAmount, setTip]);

    // Functions
    const renderTipButton = (amount: TipAmount) => (
        <button
            onClick={() => setSelectedTipAmount(amount)}
            className={`${selectedTipAmount === amount ? "bg-pink-300" : "hover:bg-pink-200 hover:scale-105"} ease-in-out duration-300 transition-all flex items-center justify-center px-10 py-4 border border-black rounded-md`}
        >
            {amount !== "Other" ? "$" : ""}
            {amount}
        </button>
    );

    const handleCustomTip = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomTipAmount(parseInt(e.target.value) || 0);
    };

    return (
        <CheckoutComponentContainer title="Order Details">
            {/* Pricing */}
            <div className="flex flex-col w-full">
                {/* Subtotal */}
                <div className="flex items-center justify-between w-full text-lg">
                    <h5 className="text-black font-semibold">Subtotal</h5>
                    <p className="text-black font-semibold">${total.toFixed(2)}</p>
                </div>
                {/* Sales Tax */}
                <div className="flex items-center justify-between w-full">
                    <p>Sales Tax (6.50%)</p>
                    <p>${salesTax.toFixed(2)}</p>
                </div>
                {/* Delivery Fee */}
                {deliveryMethod === "delivery" && (
                    <div className="flex items-center justify-between w-full text-sm">
                        <p>Delivery Fee (10%)</p>
                        <p>${deliveryFee.toFixed(2)}</p>
                    </div>
                )}
                {/* Tip */}
                {/* <div className="flex flex-col w-full">
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
                                type="number"
                                value={customTipAmount}
                                onChange={handleCustomTip}
                                className="self-start w-full lg:w-1/2"
                                placeholder="Enter Amount..."
                            />
                        </div>
                    )}
                </div> */}
                {/* Total */}
                <div className="flex items-center justify-between my-4 text-lg font-semibold">
                    <h5>Total</h5>
                    <h5>${total.toFixed(2)}</h5>
                </div>
            </div>
        </CheckoutComponentContainer>
    );
};

export default OrderDetailsCheckout;
