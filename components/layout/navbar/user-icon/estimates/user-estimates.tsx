"use client";

import { EstimateType, UserType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import EstimateItem from "./estimate-item";

const UserEstimates = () => {
    const { user } = useUser();
    const [estimates, setEstimates] = useState<EstimateType[]>([]);
    const [users, setUsers] = useState<UserType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEstimates = async () => {
            try {
                const response = await fetch("/api/estimates");
                if (!response.ok) {
                    throw new Error("Failed to fetch estimates");
                }
                const data = await response.json();
                setEstimates(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEstimates();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (estimates.length === 0) {
        return <div>No estimates found.</div>;
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Estimates</h3>
                <aside className="text-zinc-400 text-sm">A list of your fufilled estimates</aside>
            </div>
            {estimates.find((item) => item.user.clerkId === user?.id) &&
                estimates.map((item, index) => {
                    return <EstimateItem user={users!} estimates={item} key={index} />;
                })}
        </div>
    );
};

export default UserEstimates;
