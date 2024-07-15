import { EstimateType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const getContentItem = (title: string, content: string) => {
    return (
        <div className="flex flex-1 justify-between my-1">
            <h5 className="mr-2 font-semibold">{title}</h5>
            <p className="font-semibold">{content}</p>
        </div>
    );
};

const UserEstimates = () => {
    const { user } = useUser();
    const [estimates, setEstimates] = useState<EstimateType[]>([]);
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

    const isAdmin = user?.publicMetadata?.role === "admin";
    return (
        <div className="flex flex-col border-b-[1px] border-zinc-400">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Estimates</h3>
                <aside className="text-zinc-400 text-sm">A list of your fufilled estimates</aside>
            </div>
            {/* CONTENT */}
            <div className="flex text-sm flex-col my-2">
                {estimates.map((item, index) => {
                    return (
                        <div key={index}>
                            {getContentItem("Estimate ID: ", "378298")}
                            {getContentItem("Name: ", "Demo Title")}
                            {getContentItem("Delivery Method: ", "Delivery")}
                            {getContentItem("Delivery Date: ", "02/02/2020")}
                            {getContentItem("Occasion: ", "Birthday Party")}
                            {getContentItem("Colors: ", "Black and Yellow")}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserEstimates;
