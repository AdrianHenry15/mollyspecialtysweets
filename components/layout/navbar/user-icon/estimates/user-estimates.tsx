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

    const [deleteEstimateForUserId, setDeleteEstimateForUserId] = useState<string | null>(null);
    const [selectedEstimate, setSelectedEstimate] = useState<EstimateType | null>(null); // New state for selected receipt
    const [openDeleteEstimateModal, setOpenDeleteEstimateModal] = useState(false);

    const deleteEstimate = useCallback(async () => {
        if (!deleteEstimateForUserId || !selectedEstimate?.id) {
            console.log(deleteEstimateForUserId, selectedEstimate!.id);
            console.error("Invalid user ID or estimate ID.");
            toast.error("Failed to delete estimate. User ID or estimate ID is invalid.");
            return;
        }

        console.log("Deleting estimate for userId:", deleteEstimateForUserId);
        console.log("Estimate ID:", selectedEstimate.id);

        try {
            await axios.delete(`/api/users/${deleteEstimateForUserId}/receipts/${selectedEstimate.id}`);
            toast.success("Estimate deleted successfully!");
        } catch (error) {
            console.error("Error deleting estimate:", error);
            toast.error("An error occurred while deleting the estimate.");
        } finally {
            setOpenDeleteEstimateModal(false);
        }
    }, [selectedEstimate, deleteEstimateForUserId]);

    const onOpenDeleteEstimateModal = (userId: string, estimate: EstimateType) => {
        console.log("Setting deleteEstimateForUserId to:", userId);
        console.log("Setting selectedEstimate to:", estimate);

        if (!userId || !estimate) {
            return;
        }

        setDeleteEstimateForUserId(userId);
        setSelectedEstimate(estimate!);
        setOpenDeleteEstimateModal(true);
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
                                onClick={() => onOpenDeleteEstimateModal(user!.id, item)}
                                className="flex items-center justify-center text-red-500 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
            {openDeleteEstimateModal && (
                <ConfirmationModal
                    isOpen={openDeleteEstimateModal}
                    closeModal={() => setOpenDeleteEstimateModal(false)}
                    confirm={deleteEstimate}
                    title={"Confirm deleting this estimate"}
                    message={"Are you sure you want to delete this estimate?"}
                    buttonText={"Delete Estimate"}
                />
            )}
        </div>
    );
};

export default UserEstimates;
