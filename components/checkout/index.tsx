"use client";

import DeliveryMethodCheckout from "./delivery-method-checkout";
import CartCheckout from "./cart-checkout";
import OrderDetailsCheckout from "./order-details-checkout";
import GetEstimateCheckout from "./get-estimate-checkout";
import { useState } from "react";
import ExtraDetailsCheckout from "./extra-details-checkout";

const CheckoutPage = () => {
    // State
    const [extraDetails, setExtraDetails] = useState("");

    // Handlers
    const handleExtraDetails = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExtraDetails(e.target.value);
    };

    return (
        <div className="flex flex-col w-full lg:flex-row py-20 lg:self-center lg:w-[75%] lg:justify-evenly">
            <div className="flex flex-col flex-[3]">
                <h5 className="text-4xl font-semibold pl-6 lg:pl-0">Checkout</h5>
                {/* Order Method */}
                <div className="p-4 border border-gray-400 m-4 rounded-md">
                    <DeliveryMethodCheckout />
                </div>
                {/* Cart Items */}
                <div className="p-4 border border-gray-400 m-4 rounded-md">
                    <CartCheckout />
                </div>
            </div>
            <div className="p-4 border border-gray-400 m-4 rounded-md">
                <ExtraDetailsCheckout value={extraDetails} onChange={handleExtraDetails} />
            </div>
            {/* Order Details / Payment */}
            <div className="p-4 border border-gray-400 m-4 rounded-md flex flex-col flex-1">
                <OrderDetailsCheckout />
                {/* Get Estimate Instead of Pay Form */}
                <GetEstimateCheckout extraDetails={extraDetails} />
            </div>
        </div>
    );
};

export default CheckoutPage;
