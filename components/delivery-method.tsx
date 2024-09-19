"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

import { TfiTruck } from "react-icons/tfi";
import { HiHomeModern } from "react-icons/hi2";

import useDeliveryMethodStore from "@/stores/delivery-method-store";
import DatePickerInput from "./form-components/date-picker-input"; // Use the updated DatePickerInput component

export const DeliveryMethod = () => {
    const { deliveryAddress, deliveryMethod, orderDate, setDeliveryAddress, setDeliveryMethod, setOrderDate, clearDeliveryMethod } =
        useDeliveryMethodStore();

    const getButtonClass = (method: "pickup" | "delivery") =>
        `${deliveryMethod === method ? "bg-pink-300" : "bg-pink-100"} flex flex-1 items-center justify-center text-lg font-semibold rounded-lg border border-zinc-200 min-h-full mx-1 md:mx-4 shadow-lg hover:scale-105 transition-all ease-in-out duration-300 flex flex-col items-center justify-center`;

    const {
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            orderDate: orderDate, // Initialize form with orderDate from Zustand store
        },
    });

    const [validationError, setValidationError] = useState<string | null>(null);

    const handleOrderMethodChange = (method: "pickup" | "delivery") => {
        setDeliveryMethod(method);
        // Clear the error when the user selects a delivery method
        if (validationError && validationError.includes("deliveryMethod")) {
            setValidationError(null);
        }
    };

    const handleDateChange = (date: string | null) => {
        setOrderDate(date!);
        // Clear the error when the date is set
        if (validationError && validationError.includes("order date")) {
            setValidationError(null);
        }
    };

    const handleAddressChange = (address: string) => {
        setDeliveryAddress(address);
        // Clear the error when the address is updated
        if (validationError && validationError.includes("delivery address")) {
            setValidationError(null);
        }
    };

    const validateAddress = (address: string | undefined) => {
        // Check if address is provided
        if (!address || address.trim() === "") {
            return "Delivery address cannot be empty.";
        }
        // Optional: Add more complex validation rules (e.g., length, format)
        if (address.length < 10) {
            return "Delivery address is too short.";
        }
        // If no errors, return null (valid)
        return null;
    };

    const handleCheckout = () => {
        let isValid = true;

        // Reset validation error state
        setValidationError(null);

        // Validation checks
        if (!orderDate) {
            setValidationError("Please choose an order date.");
            isValid = false;
        }

        if (!deliveryMethod) {
            setValidationError("Please choose a delivery method.");
            isValid = false;
        }

        if (deliveryMethod === "delivery") {
            if (!deliveryAddress) {
                setValidationError("Please enter a valid delivery address.");
                isValid = false;
            } else {
                // Validate address format (must include street, city, state, and ZIP)
                const addressParts = deliveryAddress.trim().split(",");
                if (addressParts.length < 3) {
                    setValidationError("Please provide a full address, including street, city, state, and ZIP code.");
                    isValid = false;
                }
                isValid = true;
                // else {
                //     const city = addressParts[1]?.trim();
                //     const stateAndZip = addressParts[2]?.trim();
                //     const [state, zip] = stateAndZip?.split(" ") || [];

                //     if (!city || !state || !zip) {
                //         setValidationError("Please provide a valid city, state, and ZIP code.");
                //         isValid = false;
                //     }

                //     // Ensure state is "FL" (Florida)
                //     if (state !== "FL") {
                //         setValidationError("We only deliver within Florida. Please enter a valid Florida address.");
                //         isValid = false;
                //     }

                //     // Validate ZIP code (must be 5 digits)
                //     const zipCodeRegex = /^\d{5}$/;
                //     if (!zipCodeRegex.test(zip)) {
                //         setValidationError("Please enter a valid 5-digit ZIP code.");
                //         isValid = false;
                //     }
                // }
            }
        }

        return isValid; // Valid data
    };

    return (
        <div className="relative flex flex-col w-full h-screen lg:h-[725px] my-10 lg:p-10">
            {/* Show current order method */}
            <span className="text-black text-2xl mt-10 flex items-center justify-center font-semibold self-center mb-4">
                <p className="text-black">Delivery Method:</p>
                <p className="italic ml-1 text-black">
                    {deliveryMethod ? deliveryMethod!.charAt(0).toUpperCase() + deliveryMethod!.slice(1) : null}
                </p>
            </span>

            {/* Big Buttons for Order Method */}
            <div className="flex items-center justify-center w-full h-[250px] md:h-[350px]">
                <button className={getButtonClass("pickup")} onClick={() => handleOrderMethodChange("pickup")}>
                    <HiHomeModern className="w-[70px] h-[70px] lg:w-[200px] lg:h-[70px]" />
                    <p className="text-black text-sm lg:text-lg">Pickup</p>
                </button>
                <button className={getButtonClass("delivery")} onClick={() => handleOrderMethodChange("delivery")}>
                    <TfiTruck className="w-[70px] h-[70px] lg:w-[200px] lg:h-[70px]" />
                    <p className="text-black lg:text-lg">Delivery</p>
                </button>
            </div>

            {/* Error Message Container */}
            <div className="absolute top-0 left-0 w-full px-4 mt-4">
                {validationError && <p className="text-red-500 text-center font-semibold mb-4">{validationError}</p>}
            </div>

            {/* Set Delivery Date */}
            <div className="px-4 mt-4">
                <DatePickerInput
                    control={control}
                    errors={errors}
                    selectedDate={orderDate}
                    onChange={(date) => handleDateChange(date)} // Update Zustand store on date change
                />
            </div>

            {/* Set Delivery Address (Only visible if delivery method is selected as "delivery") */}
            <div
                className={`${
                    deliveryMethod === "delivery" ? "" : "opacity-0"
                } px-4 w-full justify-center flex flex-col items-start self-center lg:w-1/2`}
            >
                <label className="font-semibold" htmlFor="deliveryAddress">
                    Delivery Address
                </label>
                <input
                    className="flex justify-center w-full h-12 items-center"
                    type="text"
                    placeholder="Delivery Address"
                    value={deliveryAddress || ""}
                    onChange={(e) => handleAddressChange(e.target.value)}
                />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center w-full self-center flex-col md:flex-row">
                <button
                    className="hover:scale-105 ease-in-out duration-300 transition-transform mx-2 bg-red-500 flex items-center justify-center self-center whitespace-nowrap w-[75%] py-1 mt-4 rounded-lg text-white md:px-10 md:w-min"
                    onClick={clearDeliveryMethod}
                >
                    Clear Order Method
                </button>

                {/* Proceed to Checkout Button */}
                <Link
                    href={"/checkout"}
                    className="hover:scale-105 ease-in-out duration-300 transition-transform mx-2 bg-white shadow-md border border-black text-black cursor-pointer flex items-center justify-center self-center whitespace-nowrap w-[75%] py-1 mt-4 rounded-lg md:px-10 md:w-min"
                    onClick={(e) => {
                        if (!handleCheckout()) {
                            e.preventDefault(); // Prevent navigating to the checkout page if validation fails
                        }
                    }}
                >
                    Continue Checkout Process
                </Link>
            </div>
        </div>
    );
};
