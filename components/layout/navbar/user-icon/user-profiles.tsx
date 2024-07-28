"use client";

import { Loader } from "@/components/loader";
import { ReceiptType, UserType } from "@/lib/types";
import { Protect, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import EstimateItem from "./estimates/estimate-item";
import ReceiptItem from "./receipts/receipt-item";
import CreateReceipt from "./receipts/create-receipt";
import UpdateReceipt from "./receipts/update-receipt";
import toast from "react-hot-toast";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const UserProfiles = () => {
    const { user } = useUser();
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);

    // DROPDOWNS
    const [openEstimates, setOpenEstimates] = useState(false);
    const [openReceipts, setOpenReceipts] = useState(false);
    // UPDATING STATE
    const [isUpdatingReceipt, setIsUpdatingReceipt] = useState(false);
    const [updatedReceipt, setUpdatedReceipt] = useState<ReceiptType | null>(null); // holds specific receipt to update

    // CREATING RECEIPT STATE
    const [isCreatingReceipt, setIsCreatingReceipt] = useState(false);

    // DELETING RECEIPT AND MODALS
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReceiptId, setSelectedReceiptId] = useState<string | null>(null);

    const toggleEstimateDropdown = () => {
        setOpenEstimates(!openEstimates);
    };
    const toggleReceiptDropdown = () => {
        setOpenReceipts(!openReceipts);
    };

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch("/api/users");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
                <Loader />
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
                <Loader />
            </div>
        );
    }

    // function to update a receipt
    const handleUpdate = (receipt: ReceiptType) => {
        setIsUpdatingReceipt(true);
        setUpdatedReceipt(receipt);
    };

    // Function to delete a receipt
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

    const confirmDelete = (id: string) => {
        setSelectedReceiptId(id);
        setModalVisible(true);
    };

    const renderUserProfile = (img: string, name: string, email: string, phoneNumber: string) => {
        return (
            <div className="flex justify-center py-14">
                <Image className="rounded-full mr-2" width={50} height={50} src={img} alt="user-img" />
                <div className="flex flex-col items-start">
                    <p className="font-bold text-black">{name}</p>
                    <p className="text-sm">{email}</p>
                    <p className="text-sm">{phoneNumber}</p>
                </div>
            </div>
        );
    };

    const renderNotFoundText = (text: string) => {
        return <p className="text-sm text-zinc-300 ml-4">No {text} found.</p>;
    };

    const renderDropdownElement = (toggleDropdown: () => void, dropdownState: boolean, title: string) => {
        return (
            <div
                onClick={toggleDropdown}
                className="flex items-center justify-between rounded-lg py-2 px-4 my-2 cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"
            >
                <h5>{title}</h5>
                <div className="text-zinc-500">
                    {dropdownState ? <BsChevronUp size={12} fontWeight={900} /> : <BsChevronDown size={12} fontWeight={900} />}
                </div>
            </div>
        );
    };

    if (users.length === 0) {
        return <div>No users found.</div>;
    }

    // RENDER CREATE RECEIPTS COMPONENT
    if (isCreatingReceipt) {
        return (
            <Protect role="org:admin">
                <CreateReceipt newReceipt={updatedReceipt!} closeReceiptForm={() => setIsCreatingReceipt(false)} />
            </Protect>
        );
    }

    // RENDER UPDATE RECEIPT COMPONENT
    if (isUpdatingReceipt && updatedReceipt) {
        return (
            <Protect role="org:admin">
                <UpdateReceipt newReceipt={updatedReceipt} closeUpdatedReceiptForm={() => setIsUpdatingReceipt(false)} />
            </Protect>
        );
    }

    return (
        <div>
            {/* HEADER */}
            <div className="flex flex-col items-start border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Users</h3>
                <p className="text-zinc-400 text-sm">Find all of the users here</p>
            </div>
            {users.map((item, index) => {
                return (
                    <div key={index}>
                        {/* USER PROFILE */}
                        {renderUserProfile(item.image, item.name, item.email, item.phoneNumber!)}
                        {/* TOGGLE ESTIMATE DROPDOWN */}
                        {renderDropdownElement(toggleEstimateDropdown, openEstimates, "Estimates")}
                        {/* USER ESTIMATES */}
                        {openEstimates &&
                            (item.estimates ? (
                                item.estimates.map((estimate, index) => {
                                    return <EstimateItem key={index} user={item} estimates={estimate} />;
                                })
                            ) : (
                                <div>{renderNotFoundText("estimates")}</div>
                            ))}
                        {/* TOGGLE RECEIPT DROPDOWN */}
                        {renderDropdownElement(toggleReceiptDropdown, openReceipts, "Receipts")}
                        {/* USER RECEIPTS */}
                        {openReceipts &&
                            (item.receipts ? (
                                item.receipts.map((receipt, index) => {
                                    return <ReceiptItem key={index} receipts={receipt} users={item} />;
                                })
                            ) : (
                                // <p className="text-sm text-zinc-300 ml-4">No receipts found.</p>
                                <div>{renderNotFoundText("receipts")}</div>
                            ))}
                    </div>
                );
            })}
        </div>
    );
};

export default UserProfiles;
