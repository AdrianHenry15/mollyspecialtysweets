"use client";

import DeliveryMethodCheckout from "./delivery-method-checkout";
import CartCheckout from "./cart-checkout";
import OrderDetailsCheckout from "./order-details-checkout";
import PaymentFormCheckout from "./payment-form-checkout";

const CheckoutPage = () => {
    return (
        <div className="flex flex-col w-full">
            {/* Order Method */}
            <div className="p-4 border border-gray-400 m-4 rounded-md">
                <DeliveryMethodCheckout />
            </div>
            {/* Cart Items */}
            <div className="p-4 border border-gray-400 m-4 rounded-md">
                <CartCheckout />
            </div>
            {/* Order Details / Payment */}
            <div className="p-4 border border-gray-400 m-4 rounded-md">
                <OrderDetailsCheckout />
                {/* Square Payment Form */}
                <PaymentFormCheckout />
            </div>
        </div>
    );
};

export default CheckoutPage;
