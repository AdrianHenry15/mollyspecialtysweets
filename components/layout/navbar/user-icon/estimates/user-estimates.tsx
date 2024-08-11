"use client";

import { useUser } from "@clerk/nextjs";
import React, { useCallback, useState } from "react";
import EstimateItem from "./estimate-item";
import axios from "axios";
import toast from "react-hot-toast";

import { EstimateType } from "@/lib/types";
import ConfirmationModal from "@/components/modals/confirmation-modal";

const UserEstimates = () => {
    const { user } = useUser();
    const unsafeMetadata = user?.unsafeMetadata || {};
    const estimates = unsafeMetadata!["estimates"] as [];
    const isAdmin =
        user?.primaryEmailAddress?.emailAddress === "adrianhenry2115@gmail.com" ||
        user?.primaryEmailAddress?.emailAddress === "mollyspecialtysweets@gmail.com";

    const [deleteReceiptForUserId, setDeleteReceiptForUserId] = useState<string | null>(null);
    const [selectedReceipt, setSelectedReceipt] = useState<EstimateType | null>(null); // New state for selected receipt
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const deleteReceipt = useCallback(async () => {
        if (!deleteReceiptForUserId || !selectedReceipt?.id) {
            console.log(deleteReceiptForUserId, selectedReceipt!.id);
            console.error("Invalid user ID or receipt ID.");
            toast.error("Failed to delete receipt. User ID or receipt ID is invalid.");
            return;
        }

        console.log("Deleting receipt for userId:", deleteReceiptForUserId);
        console.log("Receipt ID:", selectedReceipt.id);

        try {
            await axios.delete(`/api/users/${deleteReceiptForUserId}/receipts/${selectedReceipt.id}`);
            toast.success("Receipt deleted successfully!");
        } catch (error) {
            console.error("Error deleting receipt:", error);
            toast.error("An error occurred while deleting the receipt.");
        } finally {
            setOpenDeleteModal(false);
        }
    }, [selectedReceipt, deleteReceiptForUserId]);

    const openDeleteModalFunction = (userId: string, estimate: EstimateType) => {
        console.log("Setting deleteEstimateForUserId to:", userId);
        console.log("Setting selectedEstimate to:", estimate);

        if (!userId || !estimate) {
            return;
        }

        setDeleteReceiptForUserId(userId);
        setSelectedReceipt(estimate!);
        setOpenDeleteModal(true);
    };

    if (!estimates) {
        return <div>No estimates found.</div>;
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Estimates</h3>
                <aside className="text-zinc-400 text-sm">A list of your completed order estimates</aside>
            </div>
            {estimates.map((item, index) => (
                <div key={index}>
                    <EstimateItem estimates={item} />
                    {isAdmin && (
                        <div className="flex items-center justify-end mb-2 text-sm pr-10">
                            {/* <button
                                                        onClick={() => handleOpenUpdateReceipt(user!.id, receipt)}
                                                        className="flex items-center justify-center text-yellow-500 mx-2 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                                                    >
                                                        Update
                                                    </button> */}
                            <button
                                onClick={() => openDeleteModalFunction(user!.id, item)}
                                className="flex items-center justify-center text-red-500 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
            {openDeleteModal && (
                <ConfirmationModal
                    isOpen={openDeleteModal}
                    closeModal={() => setOpenDeleteModal(false)}
                    confirm={deleteReceipt}
                    title={"Confirm deleting this receipt"}
                    message={"Are you sure you want to delete this receipt?"}
                    buttonText={"Delete Receipt"}
                />
            )}
        </div>
    );
};

export default UserEstimates;
