"use client";

import { Loader } from "@/components/loader";
import { ReceiptType, UserType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import EstimateItem from "./estimates/estimate-item";
import ReceiptItem from "./receipts/receipt-item";
import { BsArrowRight, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import CreateReceipt from "./receipts/create-receipt";
import UpdateReceipt from "./receipts/update-receipt"; // Import the UpdateReceipt component
import { useUserStore } from "@/stores/useUserStore"; // Import the Zustand store

const UserProfiles = () => {
    const { user } = useUser();
    const { users, setUsers, updateReceipt, createReceipt } = useUserStore((state) => ({
        users: state.users,
        setUsers: state.setUsers,
        updateReceipt: state.updateReceipt,
        createReceipt: state.createReceipt,
    }));
    const [loading, setLoading] = useState(true);
    const [createReceiptForUserId, setCreateReceiptForUserId] = useState<string | null>(null);
    const [updateReceiptForUserId, setUpdateReceiptForUserId] = useState<string | null>(null);

    const isAdmin =
        user?.primaryEmailAddress?.emailAddress === "adrianhenry2115@gmail.com" ||
        user?.primaryEmailAddress?.emailAddress === "mollyspecialtysweets@gmail.com";

    const [openEstimates, setOpenEstimates] = useState<{ [key: string]: boolean }>({});
    const [openReceipts, setOpenReceipts] = useState<{ [key: string]: boolean }>({});

    const toggleEstimateDropdown = (userId: string) => {
        setOpenEstimates((prevState) => ({ ...prevState, [userId]: !prevState[userId] }));
        setOpenReceipts((prevState) => ({ ...prevState, [userId]: false }));
    };

    const toggleReceiptDropdown = (userId: string) => {
        setOpenReceipts((prevState) => ({ ...prevState, [userId]: !prevState[userId] }));
        setOpenEstimates((prevState) => ({ ...prevState, [userId]: false }));
    };

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get("/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    }, [setUsers]);

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

    const renderUserProfile = (img: string, name: string, email: string, phoneNumber: string) => {
        return (
            <div className="flex justify-center py-14 bg-gray-100/50">
                <Image className="rounded-full mr-4" width={50} height={50} src={img || ""} alt="user-img" />
                <div className="flex flex-col items-start justify-center">
                    <p className="font-bold text-black">{name}</p>
                    <p className="text-sm">{email}</p>
                    <p className="text-sm">{phoneNumber}</p>
                </div>
            </div>
        );
    };

    const renderNotFoundText = (text: string) => {
        return <p className="text-sm text-zinc-300 ml-4">{text} not found.</p>;
    };

    const handleReceiptUpdated = (updatedReceipt: ReceiptType) => {
        updateReceipt(updatedReceipt.userId, updatedReceipt.id, updatedReceipt);
    };

    const renderDropdownElement = (toggleDropdown: () => void, isOpen: boolean, title: string, item: UserType) => {
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
                            item.publicMetadata.estimates && item.publicMetadata.estimates.length > 0 ? (
                                item.publicMetadata.estimates.map((estimate, index) => (
                                    <EstimateItem key={index} user={item} estimates={estimate} />
                                ))
                            ) : (
                                <div>{renderNotFoundText("Estimates")}</div>
                            )
                        ) : title === "Receipts" ? (
                            <div className="mr-4">
                                {item.publicMetadata.receipts && item.publicMetadata.receipts.length > 0 ? (
                                    item.publicMetadata.receipts.map((receipt, index) => <ReceiptItem key={index} receipts={receipt} />)
                                ) : (
                                    <div>{renderNotFoundText("Receipts")}</div>
                                )}
                                {renderCreateReceiptButton(item.id)}
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
        if (isAdmin) {
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
        } else {
            return null;
        }
    };

    if (users.length === 0) {
        return <div>No users found.</div>;
    }

    const selectedUserForCreate = users.find((item) => item.id === createReceiptForUserId) || null;
    const selectedUserForUpdate = users.find((item) => item.id === updateReceiptForUserId) || null;

    return (
        <div>
            {createReceiptForUserId && selectedUserForCreate ? (
                <CreateReceipt users={selectedUserForCreate} closeReceiptForm={() => setCreateReceiptForUserId(null)} />
            ) : updateReceiptForUserId && selectedUserForUpdate ? (
                <UpdateReceipt
                    receipt={selectedUserForUpdate.publicMetadata.receipts.find((item) => item.id === updateReceiptForUserId)!}
                    closeUpdatedReceiptForm={() => setUpdateReceiptForUserId(null)}
                />
            ) : (
                <div>
                    <div className="flex flex-col items-start border-b-[1px] border-zinc-300">
                        <h3 className="text-xl">Users</h3>
                        <p className="text-zinc-400 text-sm">Find all of the users here</p>
                    </div>
                    {users.map((item) => {
                        const userId = item.id;
                        return (
                            <div key={userId}>
                                {renderUserProfile(item.image, item.fullName, item.email, item.phoneNumber!)}
                                {renderDropdownElement(
                                    () => toggleEstimateDropdown(userId),
                                    openEstimates[userId] || false,
                                    "Estimates",
                                    item,
                                )}
                                {renderDropdownElement(
                                    () => toggleReceiptDropdown(userId),
                                    openReceipts[userId] || false,
                                    "Receipts",
                                    item,
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UserProfiles;
