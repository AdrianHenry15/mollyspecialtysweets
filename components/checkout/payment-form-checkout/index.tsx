"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { PaymentForm, CreditCard, ApplePay, GooglePay } from "react-square-web-payments-sdk";
import { Card, Client, Environment } from "square";

import { useCartStore } from "@/stores/cart-store";
import { FaPlus } from "react-icons/fa6";
import SavedCardItem from "./saved-card-item";
import NewCardModal from "./new-card-modal";
import { fetchSavedCards } from "@/lib/api/card-functions";
import { randomUUID } from "crypto";
import StripePaymentForm from "./stripe-payment-form";

const { paymentsApi } = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN as string,
    environment: Environment.Sandbox,
});

const PaymentFormCheckout = () => {
    // Store
    const { items } = useCartStore();

    // State
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [tip, setTip] = useState<number>(0);
    const [useSavedCard, setUseSavedCard] = useState(false);
    const [savedCards, setSavedCards] = useState<Card[]>([]); // Update to handle saved cards
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
    const [customerId, setCustomerId] = useState<string | null>(null);

    // Constants
    const APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID as string;
    const LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID as string;
    // Total
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalWithTip = totalAmount + tip;

    // Fetch saved cards for the user
    useEffect(() => {
        if (customerId) {
            const getSavedCards = async () => {
                const cards = await fetchSavedCards(customerId);
                setSavedCards(cards);
            };
            getSavedCards();
        }
    }, [customerId]);

    // Handlers
    const handlePaymentSuccess = async (sourceId: any) => {
        setLoading(true);
        setPaymentError(null);

        try {
            // const { token } = tokenResult;
            // const response = await axios.post("/api/square/payment", {
            //     nonce: token,
            //     amount: totalWithTip * 100, // Total in cents
            //     billingContact: {}, // Add billing contact info here
            //     shippingContact: {}, // Add shipping contact info here
            // });

            // if (response.data.error) {
            //     throw new Error(response.data.error);
            // }
            const { result } = await paymentsApi.createPayment({
                idempotencyKey: randomUUID(),
                sourceId,
                amountMoney: {
                    currency: "USD",
                    amount: BigInt(totalAmount),
                },
            });
            alert("Payment successful!");
            return result;
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

    // Renders
    const renderModal = () => {
        setIsNewCardModalOpen(true);
    };

    const renderSavedCards = () => {
        if (savedCards && savedCards.length > 0) {
            return savedCards.map((item, index) => {
                return <SavedCardItem card={item} key={index} />;
            });
        } else {
            return (
                <div className="flex items-center justify-center w-full h-full py-24">
                    <h5 className="font-semibold">No Cards Saved</h5>
                </div>
            );
        }
    };

    // Main Render
    return (
        <div className="flex flex-col border-t border-gray-300 my-4 py-4">
            {/* {isNewCardModalOpen && <NewCardModal isOpen={isNewCardModalOpen} onClose={() => setIsNewCardModalOpen(false)} />} */}
            {/* <h2 className="text-3xl text-black pb-2 mb-2 border-b border-gray-300">Payment</h2> */}
            {/* Saved Cards */}
            {/* <div>
                <h5 className="font-semibold pb-1 border-b border-gray-300 text-lg">Saved Cards</h5>
                {renderSavedCards()}
            </div>
            <button
                onClick={renderModal}
                className="hover:bg-blue-700 ease-in-out duration-300 transition-colors my-4 flex items-center justify-center relative bg-blue-500 text-white font-semibold rounded-md py-2"
            >
                <FaPlus className="absolute left-2" />
                <p className="text-white">Add New Card</p>
            </button> */}

            {/* <label>
                <input type="radio" name="" checked={!useSavedCard} onChange={() => setUseSavedCard(false)} />
                Use New Card
            </label>
            <label>
                <input type="radio" checked={useSavedCard} onChange={() => setUseSavedCard(true)} />
                Use Saved Card
            </label> */}

            {/* Saved Card Option */}
            {/* {useSavedCard && savedCards.length > 0 ? (
                <div>
                    <h3>Saved Cards</h3>
                    {savedCards.map((card) => (
                        <div key={card.id}>
                            <input type="radio" name="saved-card" value={card.id} onChange={() => setSelectedCard(card.id as string)} />
                            {card.cardBrand} ending in {card.last4}
                        </div>
                    ))}
                    <button
                        // onClick={handleSavedCardPayment}
                        disabled={!selectedCard || loading}
                    >
                        Pay with Saved Card
                    </button>
                </div>
            ) : ( */}
            {/* // Payment form for a new card */}
            {/* <PaymentForm
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
                })}
            >
                <ApplePay />
                <GooglePay />
                <CreditCard />
            </PaymentForm> */}
            <StripePaymentForm />
            {/* )} */}

            {/* Error Handling */}
            {paymentError && <p className="error">{paymentError}</p>}

            {/* Loading State */}
            {loading && <p>Processing payment...</p>}
        </div>
    );
};

export default PaymentFormCheckout;
