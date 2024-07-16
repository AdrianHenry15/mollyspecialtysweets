"use client";

import { ReceiptType } from "@/lib/types";
import { Protect, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import { BsArrowRight, BsCheck2Circle, BsXCircle } from "react-icons/bs";
import CreateReceipt from "./create-receipt";
import { FaPlus } from "react-icons/fa6";

const UserReceipts = () => {
    const { user } = useUser();
    const isAdmin = user?.publicMetadata?.role === "admin";
    const [receipts, setReceipts] = useState<ReceiptType[]>([]);
    const [newReceipt, setNewReceipt] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const response = await fetch("/api/receipts");
                if (!response.ok) {
                    throw new Error("Failed to fetch receipts");
                }
                const data = await response.json();
                setReceipts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReceipts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    // IF THERE ARE NO RECEIPTS...
    if (receipts.length === 0) {
        // IF newReceipts IS TRUE, AND USER IS ADMIN RENDER THE CREATE RECEIPTS COMPONENT ELSE JUST RENDER NO RECEIPTS FOUND
        return newReceipt ? (
            <Protect role="org:admin">
                <CreateReceipt newReceipt={newReceipt} closeReceiptForm={() => setNewReceipt(false)} />
            </Protect>
        ) : (
            <div>
                <p>No Receipts Found.</p>

                {/* BUTTON TO CREATE NEW RECEIPTS */}
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

    return (
        <div className="flex flex-col border-b-[1px] border-zinc-400">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Receipts</h3>
                <aside className="text-zinc-400 text-sm">A list of your completed order receipts</aside>
            </div>
            {/* CONTENT */}
            <div className="flex text-sm flex-col my-2">
                {receipts.map((item, index) => {
                    // TODO: IF USER IS ADMIN RENDER USER INFO; IF USER IS NOT ADMIN DO NOT RENDER USER INFO
                    return (
                        <div key={index}>
                            {getContentItem("Receipt ID: ", item.id)}
                            {getContentItem("Name: ", item.itemName)}
                            {isAdmin && (
                                <Protect role="org:admin">
                                    {getContentItem("User Name", item.userName!)}
                                    {getContentItem("Email Address", item.email!)}
                                    {getContentItem("Phone Number", item.phone!)}
                                </Protect>
                            )}
                            {getContentItem("Price: ", item.price)}
                            {getContentItem("Date Created: ", item.date)}
                            {getContentItem("Verified: ", item.verified ? <BsCheck2Circle /> : <BsXCircle />)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserReceipts;
