"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

import Logo from "@/public/mollys-logo-black.png";
import { saveCreditCard } from "@/lib/api/card-functions";
import toast from "react-hot-toast";

interface INewCardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewCardModal: React.FC<INewCardModalProps> = ({ isOpen, onClose }) => {
    // Local State for card
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [nonce, setNonce] = useState(""); // Store nonce from Square Payment Form
    const [customerId, setCustomerId] = useState(""); // Store customerId if needed
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Handlers
    const handleSaveCard = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setErrorMessage(null);

        try {
            // Call the saveCreditCard function
            const response = await saveCreditCard({
                nonce, // ensure none is obtained from Square Payment Form
                customerId, // Ensure customerId is available
            });

            if (response.error) {
                // Handle error if card save fails
                setErrorMessage(response.error);
            } else {
                // Handle successful card save
                console.log("Card saved successfully!");
                // Toast
                toast.success("Card saved successfully!");
                onClose(); // Close modal on success
            }
        } catch (error) {
            toast.error("Failed to save card: ");
            console.error("Error saving card:", error);
            setErrorMessage("An error occured while saving the card.");
        } finally {
            setIsSaving(false);
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic to save the card here
        handleSaveCard(e);
        console.log({ cardNumber, expirationDate, securityCode, country, zipCode });
        onClose(); // Close the modal on successful submission
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center">
                <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
                    {/* Logo */}
                    <span className="w-full flex items-center justify-center pb-4 mb-2">
                        <Image className="w-[100px] self-center" src={Logo} alt="logo" />
                    </span>
                    <Dialog.Title className="text-lg font-medium text-gray-900">Add New Card</Dialog.Title>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-group">
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                                Card Number
                            </label>
                            <input
                                id="cardNumber"
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                                    Expiration Date
                                </label>
                                <input
                                    id="expirationDate"
                                    type="text"
                                    placeholder="MM/YY"
                                    value={expirationDate}
                                    onChange={(e) => setExpirationDate(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700">
                                    Security Code
                                </label>
                                <input
                                    id="securityCode"
                                    type="text"
                                    value={securityCode}
                                    onChange={(e) => setSecurityCode(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Country
                                </label>
                                <input
                                    id="country"
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                                    ZIP Code
                                </label>
                                <input
                                    id="zipCode"
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="inline-flex justify-center rounded-md border border-transparent bg-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                Save Card
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default NewCardModal;
