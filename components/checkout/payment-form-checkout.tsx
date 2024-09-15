"use client";

import { useCartStore } from "@/stores/cart-store";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";

const PaymentFormCheckout = () => {
    // Store
    const { items } = useCartStore();

    // State
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState<number>(0);
    const [useSavedCard, setUseSavedCard] = useState(false);
    const [savedCards, setSavedCards] = useState<any[]>([]); // Update to handle saved cards
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    // Constants
    const APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID as string;
    const LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID as string;
    // Total
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalWithTip = totalAmount + tip;

    // Fetch saved cards for the user
    useEffect(() => {
        const fetchSavedCards = async () => {
            try {
                const response = await axios.get("/api/square/get-saved-cards"); // Example route
                setSavedCards(response.data.cards);
            } catch (error) {
                console.error("Failed to fetch saved cards", error);
            }
        };

        fetchSavedCards();
    }, []);

    const handlePaymentSuccess = async (tokenResult: any) => {
        setLoading(true);
        setPaymentError(null);

        try {
            const { token } = tokenResult;
            const response = await axios.post("/api/square/payment", {
                nonce: token,
                amount: totalWithTip * 100, // Total in cents
                billingContact: {}, // Add billing contact info here
                shippingContact: {}, // Add shipping contact info here
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

    const handleSavedCardPayment = async () => {
        setLoading(true);
        setPaymentError(null);

        try {
            const response = await axios.post("/api/square/charge-saved-card", {
                cardId: selectedCard,
                amount: totalWithTip * 100, // Total in cents
            });

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            alert("Payment successful with saved card!");
        } catch (error: any) {
            setPaymentError(error.message || "Payment failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col border-t border-gray-300 my-4 py-4">
            <h2 className="font-semibold text-2xl text-black">Payment</h2>

            <label>
                <input type="radio" name="" checked={!useSavedCard} onChange={() => setUseSavedCard(false)} />
                Use New Card
            </label>
            <label>
                <input type="radio" checked={useSavedCard} onChange={() => setUseSavedCard(true)} />
                Use Saved Card
            </label>

            {/* Saved Card Option */}
            {useSavedCard && savedCards.length > 0 ? (
                <div>
                    <h3>Saved Cards</h3>
                    {savedCards.map((card) => (
                        <div key={card.id}>
                            <input type="radio" name="saved-card" value={card.id} onChange={() => setSelectedCard(card.id)} />
                            {card.brand} ending in {card.last4}
                        </div>
                    ))}
                    <button onClick={handleSavedCardPayment} disabled={!selectedCard || loading}>
                        Pay with Saved Card
                    </button>
                </div>
            ) : (
                // Payment form for a new card
                <PaymentForm
                    applicationId={APP_ID}
                    locationId={LOCATION_ID}
                    cardTokenizeResponseReceived={(tokenResult) =>
                        tokenResult.errors ? setPaymentError("Payment failed") : handlePaymentSuccess(tokenResult)
                    }
                    createPaymentRequest={() => ({
                        countryCode: "US",
                        currencyCode: "USD",
                        total: {
                            amount: totalWithTip.toFixed(2),
                            label: "Total",
                        },
                        requestBillingContact: true,
                        requestShippingContact: true,
                    })}
                >
                    <CreditCard />
                </PaymentForm>
            )}

            {/* Error Handling */}
            {paymentError && <p className="error">{paymentError}</p>}

            {/* Loading State */}
            {loading && <p>Processing payment...</p>}
        </div>
    );
};

export default PaymentFormCheckout;
