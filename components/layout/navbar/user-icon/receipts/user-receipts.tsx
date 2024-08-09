"use client";

import { ReceiptType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React from "react";
import ReceiptItem from "./receipt-item";

const UserReceipts = () => {
    const { user } = useUser();

    const publicMetadata = user?.publicMetadata;
    const receipts = publicMetadata!["receipts"] as [];

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Receipts</h3>
                <aside className="text-zinc-400 text-sm">A list of your completed order receipts</aside>
            </div>
            {receipts.map((item: ReceiptType, index: number) => (
                <ReceiptItem receipts={item} key={index} />
            ))}
        </div>
    );
};

export default UserReceipts;
