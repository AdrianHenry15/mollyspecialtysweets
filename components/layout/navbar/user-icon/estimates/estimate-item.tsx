"use client";

import { EstimateType } from "@/lib/types";
import React from "react";

interface IEstimateItemProps {
    estimates: EstimateType;
}

const EstimateItem = (props: IEstimateItemProps) => {
    // CONSTANTS
    const { estimates } = props;

    // FUNCTIONS
    const getContentItem = (title: string, content: string) => {
        return (
            <div className="flex flex-col flex-1 w-full justify-between my-2 md:flex-row">
                <h5 className="mr-2 font-semibold flex flex-1 justify-start">{title}</h5>
                <p className="font-semibold flex justify-start text-zinc-400 text-xs">{content}</p>
            </div>
        );
    };

    if (!estimates) {
        return <div>No estimates found.</div>;
    }

    return (
        <div className="flex flex-col px-10">
            {/* CONTENT */}
            <div className="flex text-sm flex-col my-2">
                <div className="border-b-[1px] border-zinc-300">
                    {getContentItem("Estimate ID: ", estimates.id)}
                    {getContentItem("Item Name: ", estimates.itemName)}
                    {getContentItem("User Name", estimates?.fullName)}
                    {getContentItem("Email Address", estimates.primaryEmailAddress)}
                    {getContentItem("Phone Number", estimates.primaryPhoneNumber || "N/A")}
                    {getContentItem("Date Created: ", estimates.createdAt ? new Date(estimates.createdAt).toLocaleString() : "N/A")}
                </div>
            </div>
        </div>
    );
};

export default EstimateItem;
