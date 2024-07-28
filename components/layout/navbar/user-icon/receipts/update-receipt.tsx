"use client";

import { ReceiptType, UserType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { BsReceipt } from "react-icons/bs";

interface IUpdateReceiptProps {
    newReceipt: ReceiptType;
    closeUpdatedReceiptForm: () => void;
}

const UpdateReceipt = (props: IUpdateReceiptProps) => {
    // CLERK
    const { user } = useUser();

    // PROPS
    const { newReceipt, closeUpdatedReceiptForm } = props;

    // STATE
    const [itemName, setItemName] = useState<string>(newReceipt.itemName || "");
    const [price, setPrice] = useState<string>(newReceipt.price || "$");
    const [username, setUsername] = useState<string>(newReceipt.user?.name || "");
    const [users, setUsers] = useState<UserType[]>([]);
    const [phoneNumber, setPhoneNumber] = useState<string>(newReceipt.user?.phoneNumber || "");
    const [email, setEmail] = useState<string>(newReceipt.user?.email || "");
    const [image, setImage] = useState<string>(newReceipt.user.image || "");

    // Populate user info if username matches
    useEffect(() => {
        const foundUser = users.find((u) => u.email === user?.primaryEmailAddress?.emailAddress);
        if (foundUser) {
            setUsername(foundUser.name);
            setEmail(foundUser.email);
            setPhoneNumber(foundUser.phoneNumber || "");
            setImage(foundUser.image);
        }
    }, [users, user]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const updatedReceipt: Omit<ReceiptType, "createdAt" | "updatedAt"> = {
            ...newReceipt,
            itemName,
            price,
            user: {
                ...newReceipt.user,
                name: username,
                email,
                phoneNumber,
                image,
            },
            verified: true,
        };

        try {
            const response = await fetch(`/api/receipts/${updatedReceipt.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedReceipt),
            });

            if (response.ok) {
                // Handle success
                const result = await response.json();
                console.log("Receipt updated:", result);
                // Clear the form
                setItemName("");
                setPrice("$");
                setUsername("");
                setEmail("");
                setPhoneNumber("");
                setImage("");

                // Toast
                toast.success("You have successfully updated this receipt");

                // Close the form
                closeUpdatedReceiptForm();
            } else {
                // Handle error
                console.error("Failed to update receipt");
                // toast
                toast.error("Can not update this receipt");
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
    return (
        <div className="flex flex-col">
            {/* BREADCRUMBS */}
            <div className="flex items-center text-sm">
                <BsReceipt color="gray" />
                <button onClick={closeUpdatedReceiptForm} className="ml-2 text-gray-500 hover:underline underline-offset-2">
                    Receipts
                </button>
                <p className="mx-3 text-gray-500">/</p>
                <p className="text-black">Update Receipt</p>
            </div>
            {/* TITLE */}
            <h5 className="text-4xl font-semibold my-6">Update Receipt</h5>
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
                        onClick={closeUpdatedReceiptForm}
                    >
                        Cancel
                    </button>
                    <button
                        className="mx-4 py-2 px-4 rounded-md text-xs flex items-center justify-center bg-blue-600 text-white hover:bg-blue-800 transition-colors ease-in-out duration-300"
                        type="submit"
                    >
                        Update Receipt
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateReceipt;
