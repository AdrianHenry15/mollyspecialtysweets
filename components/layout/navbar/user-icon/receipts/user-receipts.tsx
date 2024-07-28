"use client";

import { ReceiptType, UserType } from "@/lib/types";
import { Protect, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import { BsArrowRight, BsCheck2Circle, BsXCircle } from "react-icons/bs";
import CreateReceipt from "./create-receipt";
import { FaPlus } from "react-icons/fa6";
import { Loader } from "@/components/loader";
import UpdateReceipt from "./update-receipt";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import toast from "react-hot-toast";
import ReceiptItem from "./receipt-item";

const UserReceipts = () => {
    const { user } = useUser();
    // STATE
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserType>();

    // UPDATING STATE
    const [isUpdatingReceipt, setIsUpdatingReceipt] = useState(false);
    const [updatedReceipt, setUpdatedReceipt] = useState<ReceiptType | null>(null); // holds specific receipt to update

    // CREATING RECEIPT STATE
    const [isCreatingReceipt, setIsCreatingReceipt] = useState(false);

    // DELETING RECEIPT AND MODALS
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReceiptId, setSelectedReceiptId] = useState<string | null>(null);

    // This useEffect hook fetches receipts data from the server when the component mounts.
    useEffect(() => {
        // It defines an asynchronous function `fetchReceipts` that makes a GET request to "/api/receipts".
        const fetchUsers = async () => {
            // If the request is successful, it parses the response JSON and updates the `receipts` state.
            try {
                const response = await fetch("/api/users/[id]", {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                if (
                    (user?.fullName === users?.receipts.find((item) => item.user.name) &&
                        user?.primaryEmailAddress?.emailAddress === users?.receipts.find((item) => item.user.email)) ||
                    user?.primaryEmailAddress?.emailAddress === "adrianhenry2115@gmail.com" ||
                    user?.primaryEmailAddress?.emailAddress === "mollyspecialtysweets@gmail.com"
                ) {
                    const data = await response.json();
                    setUsers(data);
                }
                // If an error occurs during the fetch operation, it logs the error to the console.
            } catch (error) {
                console.error(error);
            } finally {
                // The `setLoading` state is updated to `false` once the fetch operation is complete, whether successful or not.
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
                <Loader />
            </div>
        );
    }

    const getContentItem = (title: string, content: string | React.ReactNode) => {
        return (
            <div className="flex flex-1 justify-between my-1">
                <h5 className="mr-2 font-semibold">{title}</h5>
                <p className="font-semibold">{content}</p>
            </div>
        );
    };

    const renderCreateReceiptButton = () => {
        return (
            <Protect role="org:admin">
                <div
                    onClick={() => setIsCreatingReceipt(true)}
                    className="flex w-full items-center text-sm text-blue-800 p-2 cursor-pointer rounded-md hover:bg-blue-300 ease-in-out duration-300 transition-colors"
                >
                    <div className="flex items-center w-full justify-start">
                        <FaPlus size={11} />
                        <p className="text-blue-800 ml-1">Add New Receipt</p>
                    </div>
                    <div className="flex justify-end w-full">
                        <BsArrowRight size={15} color="white" />
                    </div>
                </div>
            </Protect>
        );
    };

    // // function to update a receipt
    // const handleUpdate = (receipt: ReceiptType) => {
    //     setIsUpdatingReceipt(true);
    //     setUpdatedReceipt(receipt);
    // };

    // // Function to delete a receipt
    // const handleDelete = async (id: string) => {
    //     if (!selectedReceiptId) return;

    //     try {
    //         const response = await fetch(`/api/receipts/${id}`, {
    //             method: "DELETE",
    //         });
    //         if (!response.ok) {
    //             toast.error("Can not delete this receipt");
    //             throw new Error("Failed to delete receipt");
    //         }
    //         // Update the receipts state after deletion
    //         setReceipts((prevReceipts) => prevReceipts.filter((receipt) => receipt.id === id));
    //         // Toast at top of screen
    //         toast.success("You have successfully deleted this receipt");
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setModalVisible(false);
    //         setSelectedReceiptId(null);
    //     }
    // };

    // const confirmDelete = (id: string) => {
    //     setSelectedReceiptId(id);
    //     setModalVisible(true);
    // };

    // IF THERE ARE NO RECEIPTS...
    if (users?.receipts.length === 0) {
        <div>
            <p>No Receipts Found.</p>
            {renderCreateReceiptButton()}
        </div>;
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Receipts</h3>
                <aside className="text-zinc-400 text-sm">A list of your completed order receipts</aside>
            </div>
            {/* CONTENT */}
            {users?.receipts.find((item) => item.user.id === user?.id) &&
                users?.receipts.map((item, index) => {
                    return <ReceiptItem users={users} receipts={item} key={index} />;
                })}
            {/* BUTTON TO CREATE NEW RECEIPTS */}
            {renderCreateReceiptButton()}
        </div>
    );
};

export default UserReceipts;
