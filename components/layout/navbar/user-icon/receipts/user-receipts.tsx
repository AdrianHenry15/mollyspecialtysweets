"use client";

import { ReceiptType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Loader } from "@/components/loader";
import ReceiptItem from "./receipt-item";

const UserReceipts = () => {
    const { user } = useUser();
    const [receipts, setReceipts] = React.useState<ReceiptType[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!user?.id) return;

        const fetchReceipts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/users/${user.id}/receipts`, {
                    method: "GET",
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Error response text: ${errorText}`);
                    throw new Error("Failed to fetch receipts");
                }
                const data: { receipts: ReceiptType[] } = await response.json();
                setReceipts(data.receipts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReceipts();
    }, [user]);

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
                <Loader />
            </div>
        );
    }

    if (receipts.length === 0) {
        return (
            <div>
                <p>No Receipts Found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Receipts</h3>
                <aside className="text-zinc-400 text-sm">A list of your completed order receipts</aside>
            </div>
            {receipts.map((item: ReceiptType, index: number) => (
                <ReceiptItem onUpdate={() => {}} receipts={item} key={index} />
            ))}
        </div>
    );
};

export default UserReceipts;
