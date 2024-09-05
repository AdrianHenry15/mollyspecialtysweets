"use client";

import { Loader } from "@/components/loader";
import { EstimateType, ReceiptType, UserType } from "@/lib/types";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import EstimateItem from "./estimates/estimate-item";
import ReceiptItem from "./receipts/receipt-item";
import { BsArrowRight, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import CreateReceipt from "./receipts/create-receipt";
import UpdateReceipt from "./receipts/update-receipt";
import { User } from "@clerk/backend";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import ConfirmationModal from "@/components/modals/confirmation-modal";

const UserProfiles = () => {
    // CONSTANTS
    const { user } = useUser();
    const isAdmin = ["adrianhenry2115@gmail.com", "mollyspecialtysweets@gmail.com"].includes(user?.primaryEmailAddress?.emailAddress || "");
    // STATE
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const [createReceiptForUserId, setCreateReceiptForUserId] = useState<string | null>(null);
    const [updateReceiptForUserId, setUpdateReceiptForUserId] = useState<string | null>(null);
    const [deleteReceiptForUserId, setDeleteReceiptForUserId] = useState<string | null>(null);
    const [deleteEstimateForUserId, setDeleteEstimateForUserId] = useState<string | null>(null);
    const [selectedReceipt, setSelectedReceipt] = useState<ReceiptType | null>(null); // New state for selected receipt
    const [selectedEstimate, setSelectedEstimate] = useState<EstimateType | null>(null); // New state for selected receipt
    const [openEstimates, setOpenEstimates] = useState<{ [key: string]: boolean }>({});
    const [openReceipts, setOpenReceipts] = useState<{ [key: string]: boolean }>({});
    const [openDeleteReceiptModal, setOpenDeleteReceiptModal] = useState(false);
    const [openDeleteEstimateModal, setOpenDeleteEstimateModal] = useState(false);

    // FETCH USERS FROM API
    const fetchUsers = useCallback(async () => {
        try {
            // Simulate fetching users and setting the state
            const response = await axios.get("/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // INITIALIZE FETCH ON COMPONENT MOUNT
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // DELETE RECEIPT
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
            fetchUsers();
        } catch (error) {
            console.error("Error deleting receipt:", error);
            toast.error("An error occurred while deleting the receipt.");
        } finally {
            setOpenDeleteReceiptModal(false);
        }
    }, [selectedReceipt, deleteReceiptForUserId, fetchUsers]);

    // DELETE ESTIMATE
    const deleteEstimate = useCallback(async () => {
        if (!deleteEstimateForUserId || !selectedEstimate?.id) {
            console.log(deleteEstimateForUserId, selectedEstimate!.id);
            console.error("Invalid user ID or estimate ID.");
            toast.error("Failed to delete estimate. User ID or estimate ID is invalid.");
            return;
        }

        console.log("Deleting estimate for userId:", deleteEstimateForUserId);
        console.log("Receipt ID:", selectedEstimate.id);

        try {
            await axios.delete(`/api/users/${deleteEstimateForUserId}/receipts/${selectedEstimate.id}`);
            toast.success("Estimate deleted successfully!");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting estimate:", error);
            toast.error("An error occurred while deleting the estimate.");
        } finally {
            setOpenDeleteEstimateModal(false);
        }
    }, [selectedEstimate, deleteEstimateForUserId, fetchUsers]);

    // HANDLE OPENING DELETE RECEIPT MODAL
    const onOpenDeleteReceiptModal = (userId: string, receipt: ReceiptType) => {
        console.log("Setting deleteReceiptForUserId to:", userId);
        console.log("Setting selectedReceipt to:", receipt);

        if (!userId || !receipt) {
            return;
        }

        setDeleteReceiptForUserId(userId);
        setSelectedReceipt(receipt);
        setOpenDeleteReceiptModal(true);
    };

    // HANDLE OPENING DELETE ESTIMATE MODAL
    const onOpenDeleteEstimateModal = (userId: string, estimate: EstimateType) => {
        console.log("Setting deleteEstimateForUserId to:", userId);
        console.log("Setting selectedEstimate to:", estimate);

        if (!userId || !estimate) {
            return;
        }

        setDeleteEstimateForUserId(userId);
        setSelectedEstimate(estimate);
        setOpenDeleteEstimateModal(true);
    };

    const toggleEstimateDropdown = (userId: string) => {
        setOpenEstimates((prevState) => ({ ...prevState, [userId]: !prevState[userId] }));
        setOpenReceipts((prevState) => ({ ...prevState, [userId]: false }));
    };

    const toggleReceiptDropdown = (userId: string) => {
        setOpenReceipts((prevState) => ({ ...prevState, [userId]: !prevState[userId] }));
        setOpenEstimates((prevState) => ({ ...prevState, [userId]: false }));
    };

    const handleOpenUpdateReceipt = (userId: string, receipt: ReceiptType) => {
        console.log("Opening update for receipt:", receipt); // Log receipt data
        setUpdateReceiptForUserId(userId);
        setSelectedReceipt(receipt);
    };

    const renderUserProfile = (user: UserType) => {
        return (
            <div className="flex justify-center py-14 bg-gray-100/50">
                <Image className="rounded-full mr-4" width={50} height={50} src={user.image || ""} alt="user-img" />
                <div className="flex flex-col items-start justify-center">
                    <p className="font-bold text-black">{user.fullName}</p>
                    <p className="text-sm">{user.email}</p>
                    <p className="text-sm">{user.phoneNumber}</p>
                </div>
            </div>
        );
    };

    const renderNotFoundText = (text: string) => {
        return <p className="text-sm text-zinc-300 ml-4">{text} not found.</p>;
    };

    const renderDropdownElement = (toggleDropdown: () => void, isOpen: boolean, title: string, user: UserType | null) => {
        const itemMetadata = user!.unsafeMetadata || {};
        const estimates = itemMetadata["estimates"] as EstimateType[];
        const receipts = itemMetadata["receipts"] as ReceiptType[];

        return (
            <div>
                <div
                    onClick={toggleDropdown}
                    className="flex items-center justify-between rounded-lg py-2 px-4 my-2 cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                >
                    <h5>{title}</h5>
                    <div className="text-zinc-500">
                        {isOpen ? <BsChevronUp size={12} fontWeight={900} /> : <BsChevronDown size={12} fontWeight={900} />}
                    </div>
                </div>
                {isOpen && (
                    <div>
                        {title === "Estimates" ? (
                            estimates && estimates.length > 0 ? (
                                estimates.map((estimate, index) => (
                                    <div key={index}>
                                        <EstimateItem estimates={estimate} />{" "}
                                        {isAdmin && (
                                            <div className="flex items-center justify-end mb-2 text-sm pr-10">
                                                {/* <button
                                                    onClick={() => handleOpenUpdateReceipt(user!.id, receipt)}
                                                    className="flex items-center justify-center text-yellow-500 mx-2 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                                                >
                                                    Update
                                                </button> */}
                                                <button
                                                    onClick={() => onOpenDeleteEstimateModal(user!.id, estimate! || null)}
                                                    className="flex items-center justify-center text-red-500 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div>{renderNotFoundText("Estimates")}</div>
                            )
                        ) : title === "Receipts" ? (
                            <div className="mr-4">
                                {receipts && receipts.length > 0 ? (
                                    receipts.map((receipt, index) => (
                                        <div key={index}>
                                            <ReceiptItem receipts={receipt} />
                                            {isAdmin && (
                                                <div className="flex items-center justify-end mb-2 text-sm pr-10">
                                                    <button
                                                        onClick={() => handleOpenUpdateReceipt(user!.id, receipt)}
                                                        className="flex items-center justify-center text-yellow-500 mx-2 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        onClick={() => onOpenDeleteReceiptModal(user!.id, receipt)}
                                                        className="flex items-center justify-center text-red-500 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div>{renderNotFoundText("Receipts")}</div>
                                )}
                                {renderCreateReceiptButton(user!.id)}
                            </div>
                        ) : (
                            <div className="mb-4">{renderNotFoundText(title)}</div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const renderCreateReceiptButton = (userId: string) => {
        return (
            <div
                onClick={() => setCreateReceiptForUserId(userId)}
                className="flex w-full items-center text-xs text-blue-600 p-2 m-4 cursor-pointer rounded-md hover:bg-blue-300 ease-in-out duration-300 transition-colors"
            >
                <div className="flex items-center w-full justify-start">
                    <FaPlus size={11} />
                    <p className="text-blue-800 ml-1">Add New Receipt</p>
                </div>
                <div className="flex justify-end w-full">
                    <BsArrowRight size={15} color="white" />
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
                <Loader />
            </div>
        );
    }

    if (users.length === 0) {
        return <div>No users found.</div>;
    }

    return (
        <div>
            {createReceiptForUserId === null && updateReceiptForUserId === null && (
                <div className="flex flex-col items-start border-b-[1px] border-zinc-300">
                    <h3 className="text-xl">Users</h3>
                    <p className="text-zinc-400 text-sm">Find all users here</p>
                </div>
            )}
            {users.map((user) => {
                const userId = user.id;
                const receipts = user.unsafeMetadata?.receipts || [];
                const currentReceipt = receipts.find((receipt) => receipt === selectedReceipt); // Get the current receipt

                if (user.email !== "adrianhenry2115@gmail.com" && user.email !== "mollyspecialtysweets@gmail.com") {
                    return (
                        <div key={userId}>
                            {createReceiptForUserId === null && updateReceiptForUserId === null && (
                                <div>
                                    {renderUserProfile(user)}
                                    {renderDropdownElement(
                                        () => toggleEstimateDropdown(userId),
                                        openEstimates[userId] || false,
                                        "Estimates",
                                        user,
                                    )}
                                    {renderDropdownElement(
                                        () => toggleReceiptDropdown(userId),
                                        openReceipts[userId] || false,
                                        "Receipts",
                                        user,
                                    )}
                                </div>
                            )}
                            {updateReceiptForUserId === userId && selectedReceipt ? (
                                <UpdateReceipt
                                    key={user.id}
                                    selectedUser={user}
                                    currentReceipt={currentReceipt!}
                                    closeUpdatedReceiptForm={() => {
                                        setUpdateReceiptForUserId(null);
                                        setSelectedReceipt(null);
                                    }}
                                    fetchUsers={fetchUsers}
                                    onReceiptUpdated={fetchUsers}
                                />
                            ) : null}
                            {createReceiptForUserId === userId ? (
                                userId ? (
                                    <CreateReceipt
                                        key={user.id}
                                        fetchUsers={fetchUsers}
                                        selectedUser={user}
                                        closeReceiptForm={() => setCreateReceiptForUserId(null)}
                                    />
                                ) : null
                            ) : null}
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            {openDeleteReceiptModal && (
                <ConfirmationModal
                    isOpen={openDeleteReceiptModal}
                    closeModal={() => setOpenDeleteReceiptModal(false)}
                    confirm={deleteReceipt}
                    title={"Confirm deleting this receipt"}
                    message={"Are you sure you want to delete this receipt?"}
                    buttonText={"Delete Receipt"}
                />
            )}
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

export default UserProfiles;
