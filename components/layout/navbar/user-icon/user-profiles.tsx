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
import { BsArrowRight, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const UserProfiles = () => {
    // CONSTANTS
    const { user } = useUser();
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const isAdmin =
        user?.primaryEmailAddress?.emailAddress === "adrianhenry2115@gmail.com" ||
        user?.primaryEmailAddress?.emailAddress === "mollyspecialtysweets@gmail.com";

    // ======================= STATE =======================
    // DROPDOWN STATE
    const [openEstimates, setOpenEstimates] = useState(false);
    const [openReceipts, setOpenReceipts] = useState(false);

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

    const renderCreateReceiptButton = () => {
        if (isAdmin) {
            return (
                // <Protect role="org:admin">
                <div
                    // onClick={() => setIsCreatingReceipt(true)}
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
                // </Protect>
            );
        }
    };

    if (users.length === 0) {
        return <div>No users found.</div>;
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
