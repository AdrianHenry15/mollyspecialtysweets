"use client";

import { ReceiptType, UserType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { BsReceipt } from "react-icons/bs";
import axios from "axios";

interface ICreateReceiptProps {
    fetchUsers: () => void;
    selectedUser: UserType;
    closeReceiptForm: () => void;
}

const CreateReceipt = (props: ICreateReceiptProps) => {
    // CONSTANTS
    const { selectedUser, closeReceiptForm, fetchUsers } = props;

    // STATE
    const [itemName, setItemName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [username, setUsername] = useState<string>(selectedUser.fullName || "");
    const [email, setEmail] = useState<string>(selectedUser.email || "");
    const [phoneNumber, setPhoneNumber] = useState<string>(selectedUser.phoneNumber || "");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!itemName || !price || !username || !email) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            // Prepare the new receipt data
            const newReceipt: Omit<ReceiptType, "id" | "createdAt" | "updatedAt"> = {
                userId: selectedUser.id,
                itemName,
                price,
                fullName: username,
                primaryEmailAddress: email,
                primaryPhoneNumber: phoneNumber,
                verified: true,
            };

            // Send the new receipt data to the API endpoint
            const response = await axios.post(`/api/users/${selectedUser!.id}/receipts`, newReceipt);

            if (response.status === 200) {
                fetchUsers();
                toast.success("Receipt created successfully!");
                closeReceiptForm(); // Close the form after successful submission
            } else {
                throw new Error("Failed to create receipt");
            }
        } catch (error) {
            console.error("Error creating receipt:", error);
            toast.error("An error occurred while creating the receipt.");
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
        <div className="flex flex-col mb-4">
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
};

export default CreateReceipt;
