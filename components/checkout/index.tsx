// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useCartStore } from "@/stores/cart-store";
import axios from "axios";
import CartItem from "../cart/cart-item";
import OrderMethodCheckout from "./order-method-checkout";

const CheckoutPage = () => {
    const { items } = useCartStore();
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [billingContact, setBillingContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });
    const [shippingContact, setShippingContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });
    const [tip, setTip] = useState<number>(0);

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalWithTip = totalAmount + tip;

    const handlePaymentSuccess = async (tokenResult: any) => {
        setLoading(true);
        setPaymentError(null);

        try {
            const { token } = tokenResult;
            const response = await axios.post("/api/square", {
                nonce: token,
                amount: totalWithTip * 100, // Total in cents
                billingContact,
                shippingContact,
            });

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            alert("Payment successful!");
        } catch (error: any) {
            setPaymentError(error.message || "Payment failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full">
            {/* Order Method */}
            <div className="p-4 border border-gray-400 m-4 rounded-md">
                <OrderMethodCheckout />
            </div>
            {/* Cart Items */}
            {/* Order Details */}
        </div>
    );

    // return (
    //     <div className="container mx-auto mt-10 flex flex-col">
    //         <h1 className="text-2xl font-bold">Checkout</h1>

    //         {items.length > 0 ? (
    //             <div className="flex flex-col lg:flex-row">
    //                 <ul>
    //                     {items.map((item) => (
    //                         <CartItem product={item} key={item.id} />
    //                     ))}
    //                 </ul>
    //                 <div className="mt-4">
    //                     <h2>Total: ${totalAmount.toFixed(2)}</h2>
    //                     <div className="mt-4">
    //                         <label htmlFor="tip" className="block text-lg font-semibold">
    //                             Tip:
    //                         </label>
    //                         <input
    //                             id="tip"
    //                             type="number"
    //                             min="0"
    //                             step="0.01"
    //                             value={tip}
    //                             onChange={(e) => setTip(parseFloat(e.target.value))}
    //                             className="block mt-2 p-2 border border-gray-300 rounded"
    //                         />
    //                         <p className="mt-2">Total with Tip: ${totalWithTip.toFixed(2)}</p>
    //                     </div>
    //                 </div>

    //                 {/* Billing Contact Information */}
    //                 <div className="mt-6">
    //                     <h2 className="text-xl font-semibold">Billing Contact Information</h2>
    //                     <input
    //                         type="text"
    //                         placeholder="Name"
    //                         value={billingContact.name}
    //                         onChange={(e) => setBillingContact({ ...billingContact, name: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="email"
    //                         placeholder="Email"
    //                         value={billingContact.email}
    //                         onChange={(e) => setBillingContact({ ...billingContact, email: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="tel"
    //                         placeholder="Phone"
    //                         value={billingContact.phone}
    //                         onChange={(e) => setBillingContact({ ...billingContact, phone: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="text"
    //                         placeholder="Address"
    //                         value={billingContact.address}
    //                         onChange={(e) => setBillingContact({ ...billingContact, address: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="text"
    //                         placeholder="City"
    //                         value={billingContact.city}
    //                         onChange={(e) => setBillingContact({ ...billingContact, city: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="text"
    //                         placeholder="State"
    //                         value={billingContact.state}
    //                         onChange={(e) => setBillingContact({ ...billingContact, state: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="text"
    //                         placeholder="Postal Code"
    //                         value={billingContact.postalCode}
    //                         onChange={(e) => setBillingContact({ ...billingContact, postalCode: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="text"
    //                         placeholder="Country"
    //                         value={billingContact.country}
    //                         onChange={(e) => setBillingContact({ ...billingContact, country: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                 </div>

    //                 {/* Shipping Contact Information */}
    //                 <div className="mt-6">
    //                     <h2 className="text-xl font-semibold">Shipping Contact Information</h2>
    //                     <input
    //                         type="text"
    //                         placeholder="Name"
    //                         value={shippingContact.name}
    //                         onChange={(e) => setShippingContact({ ...shippingContact, name: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="email"
    //                         placeholder="Email"
    //                         value={shippingContact.email}
    //                         onChange={(e) => setShippingContact({ ...shippingContact, email: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="tel"
    //                         placeholder="Phone"
    //                         value={shippingContact.phone}
    //                         onChange={(e) => setShippingContact({ ...shippingContact, phone: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="text"
    //                         placeholder="Address"
    //                         value={shippingContact.address}
    //                         onChange={(e) => setShippingContact({ ...shippingContact, address: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="text"
    //                         placeholder="City"
    //                         value={shippingContact.city}
    //                         onChange={(e) => setShippingContact({ ...shippingContact, city: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="text"
    //                         placeholder="State"
    //                         value={shippingContact.state}
    //                         onChange={(e) => setShippingContact({ ...shippingContact, state: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="text"
    //                         placeholder="Postal Code"
    //                         value={shippingContact.postalCode}
    //                         onChange={(e) => setShippingContact({ ...shippingContact, postalCode: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                     <input
    //                         type="text"
    //                         placeholder="Country"
    //                         value={shippingContact.country}
    //                         onChange={(e) => setShippingContact({ ...shippingContact, country: e.target.value })}
    //                         className="block mt-2 p-2 border border-gray-300 rounded"
    //                     />
    //                 </div>

    //                 {/* Square Payment Form */}
    //                 <PaymentForm
    //                     applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID as string}
    //                     locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID as string}
    //                     cardTokenizeResponseReceived={(tokenResult) =>
    //                         tokenResult.errors ? setPaymentError("Payment failed") : handlePaymentSuccess(tokenResult)
    //                     }
    //                     createPaymentRequest={() => ({
    //                         countryCode: "US",
    //                         currencyCode: "USD",
    //                         total: {
    //                             amount: totalAmount.toFixed(2),
    //                             label: "Total",
    //                         },
    //                         requestBillingContact: true,
    //                         requestShippingContact: true,
    //                     })}
    //                 >
    //                     <CreditCard />
    //                 </PaymentForm>

    //                 {paymentError && <p className="text-red-500 mt-2">{paymentError}</p>}
    //             </div>
    //         ) : (
    //             <p>Your cart is empty.</p>
    //         )}
    //     </div>
    // );
};

export default CheckoutPage;
