import { EstimateType, UserType } from "@/lib/types";
import React from "react";

interface IEstimateItemProps {
    user: UserType;
    estimates: EstimateType;
}

const EstimateItem = (props: IEstimateItemProps) => {
    const { estimates, user } = props;
    const getContentItem = (title: string, content: string) => {
        return (
            <div className="flex flex-1 justify-between my-1">
                <h5 className="mr-2 font-semibold">{title}</h5>
                <p className="font-semibold">{content}</p>
            </div>
        );
    };

    if (!estimates) {
        return <div>No estimates found.</div>;
    }

    return (
        <div className="flex flex-col ">
            {/* CONTENT */}
            <div className="flex text-sm flex-col my-2">
                <div className="border-b-[1px] border-zinc-300">
                    {getContentItem("User Name", user.name)}
                    {getContentItem("Email Address", user.email)}
                    {getContentItem("Phone Number", user.phoneNumber || "")}
                    {getContentItem("Estimate ID: ", estimates.id)}
                    {getContentItem("Item Name: ", estimates.itemName)}
                    {getContentItem("Date Created: ", estimates.createdAt?.toString() || "")}
                </div>
            </div>
        </div>
    );
};

export default EstimateItem;
