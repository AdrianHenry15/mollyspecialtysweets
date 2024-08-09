import { useUser } from "@clerk/nextjs";
import { ChangeEvent, FormEvent, useState } from "react";
import { ReceiptType, UserType } from "@/lib/types";
import toast from "react-hot-toast";
import { BsReceipt } from "react-icons/bs";

interface IUpdateReceiptProps {
    users: any;
    receipt: ReceiptType;
    closeUpdatedReceiptForm: () => void;
    onReceiptUpdated: (updatedReceipt: any) => void;
}

const UpdateReceipt = (props: IUpdateReceiptProps) => {
    const { user } = useUser();
    // TODO: USE THIS TO UPDATE USER
    // user?.update({
    //     unsafeMetadata: {
    //         ['receipts']: "",
    //         ['estimates']: ""
    //     }
    // })
    const { receipt, closeUpdatedReceiptForm } = props;

    const [itemName, setItemName] = useState<string>(receipt.itemName || "");
    const [price, setPrice] = useState<string>(receipt.price || "$");
    const [username, setUsername] = useState<string>(receipt.fullName || "");
    const [phoneNumber, setPhoneNumber] = useState<string>(receipt.primaryPhoneNumber || "");
    const [email, setEmail] = useState<string>(receipt.primaryEmailAddress || "");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const updatedReceipt: Omit<ReceiptType, "id" | "createdAt" | "updatedAt"> = {
            ...receipt,
            itemName,
            price,
            fullName: username,
            primaryEmailAddress: email,
            primaryPhoneNumber: phoneNumber,
            verified: true,
        };

        try {
            const response = await fetch(`/api/receipts/${receipt?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedReceipt),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Receipt updated:", result);

                setItemName("");
                setPrice("$");
                setUsername("");
                setEmail("");
                setPhoneNumber("");

                // Update the receipt in the Zustand store
                // if (user?.id) {
                //     updateReceipt(user.id, receipt.id, updatedReceipt);
                // }

                toast.success("You have successfully updated this receipt");

                closeUpdatedReceiptForm();
            } else {
                console.error("Failed to update receipt");
                toast.error("Cannot update this receipt");
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
            <div className="flex items-center text-sm">
                <BsReceipt color="gray" />
                <button onClick={closeUpdatedReceiptForm} className="ml-2 text-gray-500 hover:underline underline-offset-2">
                    Receipts
                </button>
                <p className="mx-3 text-gray-500">/</p>
                <p className="text-black">Update Receipt</p>
            </div>
            <h5 className="text-4xl font-semibold my-6">Update Receipt</h5>
            <form onSubmit={handleSubmit}>
                {renderInput("Item Name", itemName, (e) => setItemName(e.target.value))}
                {renderInput("Price", price, (e) => setPrice(e.target.value))}
                {renderInput("Full Name", username, (e) => setUsername(e.target.value))}
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
