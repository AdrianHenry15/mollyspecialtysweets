"use client";

import { UserType, ReceiptType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Loader } from "@/components/loader";
import ReceiptItem from "./receipt-item";
import { useUserStore } from "@/stores/useUserStore";

const UserReceipts = () => {
    const { user } = useUser();
    const { users, setUsers } = useUserStore((state) => ({
        users: state.users,
        setUsers: state.setUsers,
    }));
    const [loading, setLoading] = React.useState(true);

    const publicMetadata = user?.publicMetadata;
    const receipts = publicMetadata?.receipts as ReceiptType[];

    React.useEffect(() => {
        if (!user?.id) return;

        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/users`, {
                    method: "GET",
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Error response text: ${errorText}`);
                    throw new Error("Failed to fetch users");
                }
                const data: UserType[] = await response.json();
                setUsers(data); // Update Zustand store
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user, setUsers]);

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
                <Loader />
            </div>
        );
    }

    // Check if the receipts are available from Zustand store
    const userReceipts = users?.find((u) => u.id === user?.id)?.publicMetadata?.receipts || [];

    if (userReceipts.length === 0) {
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
            {userReceipts.map((item: ReceiptType, index: number) => (
                <ReceiptItem receipts={item} key={index} />
            ))}
        </div>
    );
};

export default UserReceipts;
