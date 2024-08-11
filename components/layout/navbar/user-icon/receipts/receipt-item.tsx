import { ReceiptType } from "@/lib/types";
import React from "react";
import { BsCheck2Circle, BsXCircle } from "react-icons/bs";

interface IReceiptItemProps {
    receipts: ReceiptType;
}

const ReceiptItem = (props: IReceiptItemProps) => {
    // CONSTANTS
    const { receipts } = props;

    const getContentItem = (title: string, content: string | React.ReactNode) => {
        return (
            <div className="flex flex-col flex-1 w-full justify-between my-2 md:flex-row">
                <h5 className="mr-2 font-semibold flex flex-1 justify-start">{title}</h5>
                <p className="font-semibold flex justify-start text-zinc-400 text-xs">{content}</p>
            </div>
        );
    };

    if (!receipts) {
        return null;
    }

    // RECEIPT ITEM
    return (
        <div className="flex flex-col px-10">
            {/* CONTENT */}
            <div className="flex text-sm flex-col my-2">
                <div className="border-b-[1px] border-zinc-300">
                    {getContentItem("Receipt ID: ", receipts.id)}
                    {getContentItem("Item Name: ", receipts.itemName)}
                    {getContentItem("Price: ", `${receipts.price}`)}
                    {getContentItem("Full Name: ", receipts.fullName)}
                    {getContentItem("Email Address", receipts.primaryEmailAddress || "")}
                    {getContentItem("Phone Number", receipts.primaryPhoneNumber || "N/A")}
                    {getContentItem("Date Created: ", receipts.createdAt ? new Date(receipts.createdAt).toLocaleString() : "N/A")}
                    {getContentItem(
                        "Verified: ",
                        receipts.verified ? (
                            <BsCheck2Circle fontWeight={900} size={18} color="green" />
                        ) : (
                            <BsXCircle fontWeight={900} size={18} color="red" />
                        ),
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReceiptItem;
