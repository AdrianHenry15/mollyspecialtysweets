import React, { useState, ChangeEvent, FormEvent } from "react";
import { BsReceipt } from "react-icons/bs";

interface ICreateReceiptProps {
    newReceipt: boolean;
    closeReceiptForm: () => void;
}

interface Receipt {
    id: string;
    itemName: string;
    price: string;
    userName?: string;
    email?: string;
    phone?: string;
    verified: boolean;
    createdAt: Date;
}

const CreateReceipt = (props: ICreateReceiptProps) => {
    const { newReceipt, closeReceiptForm } = props;
    const [itemName, setItemName] = useState<string>("");
    const [price, setPrice] = useState<string>("$");
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const newReceipt: Omit<Receipt, "id" | "createdAt"> = {
            itemName,
            price,
            userName,
            email,
            phone,
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
                setPrice("");
                setUserName("");
                setEmail("");
                setPhone("");

                closeReceiptForm();
            } else {
                // Handle error
                console.error("Failed to create receipt");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const renderInput = (label: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, type: string = "text") => (
        <div className="flex flex-col my-4">
            <label className="text-xs font-semibold mb-1">{label}</label>
            <input type={type} value={value} onChange={onChange} />
        </div>
    );

    {
        return (
            newReceipt && (
                <div className="flex flex-col">
                    {/* BREADCRUMBS */}
                    <div className="flex items-center text-sm">
                        <BsReceipt />
                        <p className="ml-2">Receipts</p>
                        <p className="mx-3">/</p>
                        <p className="text-black">Create new receipt</p>
                    </div>
                    {/* TITLE */}
                    <h5 className="text-4xl font-semibold my-6">Create New Receipt</h5>
                    {/* INPUT FORM */}
                    <form onSubmit={handleSubmit}>
                        {renderInput("Item Name", itemName, (e) => setItemName(e.target.value))}
                        {renderInput("Price", price, (e) => setPrice(e.target.value))}
                        {renderInput("User Name", userName, (e) => setUserName(e.target.value))}
                        {renderInput("Email", email, (e) => setEmail(e.target.value), "email")}
                        {renderInput("Phone", phone, (e) => setPhone(e.target.value))}
                        {/* <div className="flex flex-col">
                            <div className="flex items-center">
                                <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
                                <label className="ml-2">Verified</label>
                            </div>
                        </div> */}
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
            )
        );
    }
};

export default CreateReceipt;
