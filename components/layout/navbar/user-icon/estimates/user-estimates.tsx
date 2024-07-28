"use client";

import { EstimateType, UserType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import EstimateItem from "./estimate-item";

const UserEstimates = () => {
    const { user } = useUser();
    const [users, setUsers] = useState<UserType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users/[id]");
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
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (users?.estimates.length === 0) {
        return <div>No estimates found.</div>;
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Estimates</h3>
                <aside className="text-zinc-400 text-sm">A list of your fufilled estimates</aside>
            </div>
            {users?.estimates.find((item) => item.user.clerkId === user?.id) &&
                users?.estimates.map((item, index) => {
                    return <EstimateItem user={users} estimates={item} key={index} />;
                })}
        </div>
    );
};

export default UserEstimates;
