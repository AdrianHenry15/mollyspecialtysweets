import React from "react";
import CheckoutComponentContainer from "./checkout-component-container";
import { useCartStore } from "@/stores/cart-store";
import useDeliveryMethodStore from "@/stores/delivery-method-store";

const OrderDetailsCheckout = () => {
    // Stores
    const { items } = useCartStore();
    const { deliveryMethod } = useDeliveryMethodStore();

    // Constants
    const SALES_TAX_RATE = 0.065;

    // Calculate subtotal
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // Calculate sales tax
    const salesTax = subtotal * SALES_TAX_RATE;

    // Assuming a fixed or dynamic tip (set to 0 for now)
    const tip = 0; // Replace with actual logic if tips are dynamic or user-configurable

    // Calculate total
    const total = subtotal + salesTax + tip;

    // Functions
    const tipButton = (amount: number) => {};
    return (
        <CheckoutComponentContainer title="Order Details">
            {/* Pricing */}
            <div className="flex flex-col w-full">
                {/* Subtotal */}
                <div className="flex items-center justify-between w-full">
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
                <div className="flex items-center"></div>
            </div>
        </CheckoutComponentContainer>
    );
};

export default OrderDetailsCheckout;
