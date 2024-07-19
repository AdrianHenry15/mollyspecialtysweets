"use client";

import { ReceiptType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { BsReceipt } from "react-icons/bs";

interface ICreateReceiptProps {
    closeReceiptForm: () => void;
}

const CreateReceipt = (props: ICreateReceiptProps) => {
    // CLERK
    const { user } = useUser();

    // PROPS
    const { closeReceiptForm } = props;

    // STATE
    const [itemName, setItemName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [image, setImage] = useState("");

    const getUserInfo = () => {
        if (user?.fullName === username) {
            setUserId(user.id);
            setEmail(user.primaryEmailAddress?.emailAddress || "");
            setPhoneNumber(user.primaryPhoneNumber?.phoneNumber || "");
            setImage(user.imageUrl);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        getUserInfo();
        const newReceipt: Omit<ReceiptType, "id" | "createdAt" | "updatedAt"> = {
            itemName,
            price,
            userId,
            image,
            username,
            email,
            phoneNumber,
            verified: true,
        };

        try {
            const response = await fetch("/api/receipts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newReceipt),
            });

            if (response.ok) {
                // Handle success
                const result = await response.json();
                console.log("Receipt created:", result);
                // Clear the form
                setItemName("");
                setPrice("$");
                setUsername("");
                setEmail("");
                setPhoneNumber("");
                setUserId("");
                setImage("");

                // Toast
                toast.success("You have successfully created a receipt");

                // close the form
                closeReceiptForm();
            } else {
                // Handle error
                console.error("Failed to create receipt");
                // Toast
                toast.error("Can not create a receipt");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const renderInput = (label: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, type: string = "text") => (
        <div className="flex flex-col my-4">
            <label className="text-xs font-semibold mb-1">{label}</label>
            <input type={type} value={value} onChange={onChange} />
            {!value && (label === "Item Name" || label === "Price" || label === "User Name") && (
                <span className="text-red-500 text-xs mt-1">This value is needed for this form.</span>
            )}
        </div>
    );

    {
        return (
            <div className="flex flex-col">
                {/* BREADCRUMBS */}
                <div className="flex items-center text-sm">
                    <BsReceipt color="gray" />
                    <button onClick={closeReceiptForm} className="ml-2 text-gray-500 hover:underline underline-offset-2">
                        Receipts
                    </button>
                    <p className="mx-3 text-gray-500">/</p>
                    <p className="text-black">Create new receipt</p>
                </div>
                {/* TITLE */}
                <h5 className="text-4xl font-semibold my-6">Create New Receipt</h5>
                {/* INPUT FORM */}
                <form onSubmit={handleSubmit}>
                    {renderInput("Item Name", itemName, (e) => setItemName(e.target.value))}
                    {renderInput("Price", price, (e) => setPrice(e.target.value))}
                    {renderInput("User Name", username, (e) => setUsername(e.target.value))}
                    {renderInput("Email", email, (e) => setEmail(e.target.value), "email")}
                    {renderInput("Phone", phoneNumber, (e) => setPhoneNumber(e.target.value), "tel")}
                    <div className="flex items-center justify-end">
                        <button
                            className="flex text-xs py-2 px-4 items-center rounded-md justify-center text-blue-600 hover:bg-blue-400/50 transition-colors ease-in-out duration-300"
                            onClick={closeReceiptForm}
                        >
                            Cancel
                        </button>
                        <button
                            className="mx-4 py-2 px-4 rounded-md text-xs flex items-center justify-center bg-blue-600 text-white hover:bg-blue-800 transition-colors ease-in-out duration-300"
                            type="submit"
                        >
                            Create Receipt
                        </button>
                    </div>
                </form>
            </div>
        );
    }
};

export default CreateReceipt;
