"use client";

import { ReceiptType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { BsCheck2Circle, BsXCircle } from "react-icons/bs";

const getContentItem = (title: string, content: string | React.ReactNode) => {
    return (
        <div className="flex flex-1 justify-between my-1">
            <h5 className="mr-2 font-semibold">{title}</h5>
            <p className="font-semibold">{content}</p>
        </div>
    );
};

const UserReceipts = () => {
    const { user } = useUser();
    const [receipts, setReceipts] = useState<ReceiptType[]>([]);
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
        return <div>Loading...</div>;
    }

    if (receipts.length === 0) {
        return <div>No receipts found.</div>;
    }

    const isAdmin = user?.publicMetadata?.role === "admin";

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
                            {getContentItem("Name: ", item.name)}
                            {isAdmin && (
                                <>
                                    {getContentItem("User Name", item.userName!)}
                                    {getContentItem("Email Address", item.email!)}
                                    {getContentItem("Phone Number", item.phone!)}
                                </>
                            )}
                            {getContentItem("Price: ", item.price)}
                            {getContentItem("Created At: ", item.date)}
                            {getContentItem("Verified: ", item.verified ? <BsCheck2Circle /> : <BsXCircle />)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserReceipts;
