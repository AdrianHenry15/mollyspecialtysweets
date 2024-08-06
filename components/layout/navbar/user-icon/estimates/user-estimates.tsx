"use client";

import { EstimateType, UserType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import EstimateItem from "./estimate-item";
import toast from "react-hot-toast";

const UserEstimates = () => {
    const { user } = useUser();
    const [users, setUsers] = useState<UserType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        let didCancel = false;
        const fetchUsers = async () => {
            try {
                console.log(`Fetching user data for user ID: ${user?.id}`); // Log the user ID
                const response = await fetch(`/api/users/${user?.id}`, {
                    method: "GET",
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Error response text: ${errorText}`);
                    throw new Error("Failed to fetch users");
                }
                const data: UserType = await response.json();
                if (didCancel) {
                    setUsers(data);
                }
            } catch (error) {
                if (!didCancel) {
                    console.error("Fetch users error:", error);
                    toast.error("Failed to fetch user data.");
                }
            } finally {
                if (!didCancel) {
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
        return <div>Loading...</div>;
    }

    if (!users || !users.estimates || users!.estimates.length === 0) {
        return (
            <div>
                <p>No Estimates Found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Estimates</h3>
                <aside className="text-zinc-400 text-sm">A list of your fufilled estimates</aside>
            </div>
            {users!.estimates.map((item, index) => (
                <EstimateItem user={users} estimates={item} key={index} />
            ))}
        </div>
    );
};

export default UserEstimates;
