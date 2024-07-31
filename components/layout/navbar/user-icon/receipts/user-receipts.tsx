"use client";

import { UserType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import { Loader } from "@/components/loader";
import ReceiptItem from "./receipt-item";

const UserReceipts = () => {
    const { user } = useUser();
    // STATE
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserType | null>(null);

    // This useEffect hook fetches users data from the server when the component mounts.
    useEffect(() => {
        if (!user?.id) return;

        let didCancel = false;
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users/${user?.id}`, {
                    method: "GET",
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Error response text: ${errorText}`);
                    throw new Error("Failed to fetch user");
                }
                const data: UserType = await response.json();
                if (didCancel) {
                    setUsers(data);
                }
                // If an error occurs during the fetch operation, it logs the error to the console.
            } catch (error) {
                if (!didCancel) {
                    console.error(error);
                }
            } finally {
                if (!didCancel) {
                    // The `setLoading` state is updated to `false` once the fetch operation is complete, whether successful or not.
                    setLoading(false);
                }
            }
        };

        fetchUsers();

        return () => {
            didCancel = true;
        };
    }, [user]);

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
                <Loader />
            </div>
        );
    }

    if (!users || users.receipts.length === 0) {
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
            {/* CONTENT */}
            {users?.receipts.map((item, index) => <ReceiptItem users={users} receipts={item} key={index} />)}
        </div>
    );
};

export default UserReceipts;
