"use client";

import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { Card } from "square";

import VisaCardLogo from "@/public/card-imgs/visa-logo-png-transparent.png";
import AmericanExpressCardLogo from "@/public/card-imgs/american-express.png";
import DiscoverCardLogo from "@/public/card-imgs/discover-card.png";
import MastercardCardLogo from "@/public/card-imgs/mastercard-logo.png";

import { useCartStore } from "@/stores/cart-store";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import NewCardModal from "./new-card-modal";

type CardName = "Visa" | "Mastercard" | "American Express" | "Discover";

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

    // Handlers
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

    // Renders
    const renderModal = () => {
        setIsNewCardModalOpen(true);
    };
    const renderSavedCards = () => {
        if (savedCards.length > 0) {
            return savedCards.map((item, index) => {
                return (
                    <div key={index} className="flex flex-col border-b border-gray-300 py-4 mb-2">
                        {/* Card Info */}
                        <div className="flex items-start justify-start mb-4">
                            {/* Card Brand */}
                            <span className="flex items-start justify-start">
                                <Image
                                    // src={VisaCardLogo}
                                    className="w-[60px]"
                                    src={getCardImage(item.cardBrand as CardName) || ""}
                                    alt="card-brand-img"
                                />
                            </span>
                            {/* Card Info */}
                            <div className="flex flex-col items-start ml-2 mt-[15px]">
                                {/* <h5>Visa ****1607</h5> */}
                                <h5>{`${item.cardBrand} ****${item.last4}`}</h5>
                                <p>Expires 05/25</p>
                            </div>
                        </div>
                        {/* Card Actions */}
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center text-blue-500 text-sm">
                                <button className="mr-2">Edit</button>
                                <p>|</p>
                                <button className="ml-2">Delete</button>
                            </div>
                            <p>Default</p>
                        </div>
                    </div>
                );
            });
        } else {
            return (
                <div className="flex items-center justify-center w-full h-full py-24">
                    <h5 className="font-semibold">No Cards Saved</h5>
                </div>
            );
        }
    };

    // Functions
    const getCardImage = (name: CardName) => {
        switch (name) {
            case "Visa":
                return VisaCardLogo;
            case "American Express":
                return AmericanExpressCardLogo;
            case "Discover":
                return DiscoverCardLogo;
            case "Mastercard":
                return MastercardCardLogo;
            default:
                break;
        }
    };

    if (isNewCardModalOpen) {
        return <NewCardModal />;
    }

    return (
        <div className="flex flex-col border-t border-gray-300 my-4 py-4">
            <h2 className="text-3xl text-black pb-2 mb-2 border-b border-gray-300">Payment</h2>
            {/* Saved Cards */}
            <div>
                <h5 className="font-semibold pb-1 border-b border-gray-300 text-lg">Saved Cards</h5>
                {renderSavedCards()}
            </div>
            <button
                onClick={renderModal}
                className="hover:bg-blue-700 ease-in-out duration-300 transition-colors my-4 flex items-center justify-center relative bg-blue-500 text-white font-semibold rounded-md py-2"
            >
                <FaPlus className="absolute left-2" />
                <p className="text-white">Add New Card</p>
            </button>

            {/* <label>
                <input type="radio" name="" checked={!useSavedCard} onChange={() => setUseSavedCard(false)} />
                Use New Card
            </label>
            <label>
                <input type="radio" checked={useSavedCard} onChange={() => setUseSavedCard(true)} />
                Use Saved Card
            </label> */}

            {/* Saved Card Option */}
            {useSavedCard && savedCards.length > 0 ? (
                <div>
                    <h3>Saved Cards</h3>
                    {savedCards.map((card) => (
                        <div key={card.id}>
                            <input type="radio" name="saved-card" value={card.id} onChange={() => setSelectedCard(card.id as string)} />
                            {card.cardBrand} ending in {card.last4}
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
