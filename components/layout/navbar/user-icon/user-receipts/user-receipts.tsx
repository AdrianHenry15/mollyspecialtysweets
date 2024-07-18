"use client";

import { ReceiptType } from "@/lib/types";
import { Protect, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import { BsArrowRight, BsCheck2Circle, BsXCircle } from "react-icons/bs";
import CreateReceipt from "./create-receipt";
import { FaPlus, FaUser } from "react-icons/fa6";
import { Loader } from "@/components/loader";
import Image from "next/image";

const UserReceipts = () => {
    // VARIABLES
    const { user } = useUser();

    // STATE
    const [receipts, setReceipts] = useState<ReceiptType[]>([]);
    const [newReceipt, setNewReceipt] = useState(false);
    const [loading, setLoading] = useState(true);

    // This useEffect hook fetches receipts data from the server when the component mounts.
    useEffect(() => {
        // It defines an asynchronous function `fetchReceipts` that makes a GET request to "/api/receipts".
        const fetchReceipts = async () => {
            // If the request is successful, it parses the response JSON and updates the `receipts` state.
            try {
                const response = await fetch("/api/receipts");
                if (!response.ok) {
                    throw new Error("Failed to fetch receipts");
                }
                const data = await response.json();
                setReceipts(data);
                // If an error occurs during the fetch operation, it logs the error to the console.
            } catch (error) {
                console.error(error);
            } finally {
                // The `setLoading` state is updated to `false` once the fetch operation is complete, whether successful or not.
                setLoading(false);
            }
        };

        fetchReceipts();
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
                    onClick={() => setNewReceipt(true)}
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

    // IF THERE ARE NO RECEIPTS...
    if (receipts.length === 0) {
        <div>
            <p>No Receipts Found.</p>
            {renderCreateReceiptButton()}
        </div>;
    }

    // RENDER CREATE RECEIPTS COMPONENT
    if (newReceipt) {
        return (
            <Protect role="org:admin">
                <CreateReceipt newReceipt={newReceipt} closeReceiptForm={() => setNewReceipt(false)} />
            </Protect>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Receipts</h3>
                <aside className="text-zinc-400 text-sm">A list of your completed order receipts</aside>
            </div>
            {/* CONTENT */}
            <div className="flex text-sm flex-col my-2 border-b-[1px] border-zinc-300">
                {receipts.map((item, index) => {
                    // TODO: IF USER IS ADMIN RENDER USER INFO; IF USER IS NOT ADMIN DO NOT RENDER USER INFO
                    return (
                        <div key={index}>
                            {getContentItem("Receipt ID: ", item.id)}
                            {getContentItem("Item Name: ", item.itemName)}
                            {getContentItem("User Name: ", item.username || "N/A")}
                            {getContentItem("Email Address", item.email || "N/A")}
                            {getContentItem("Phone Number", item.phoneNumber || "N/A")}
                            {getContentItem("Price: ", `$${parseFloat(item.price).toFixed(2)}`)}
                            {getContentItem("Date Created: ", new Date(item.createdAt!).toLocaleString())}
                            {getContentItem(
                                "Verified: ",
                                item.verified ? (
                                    <BsCheck2Circle fontWeight={900} size={18} color="green" />
                                ) : (
                                    <BsXCircle fontWeight={900} size={18} color="red" />
                                ),
                            )}
                        </div>
                    );
                })}
            </div>
            {/* BUTTON TO CREATE NEW RECEIPTS */}
            {renderCreateReceiptButton()}
        </div>
    );
};

export default UserReceipts;
