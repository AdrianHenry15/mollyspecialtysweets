import ConfirmationModal from "@/components/modals/confirmation-modal";
import { ReceiptType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { BsArrowRight, BsCheck2Circle, BsXCircle } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import CreateReceipt from "./create-receipt";
import UpdateReceipt from "./update-receipt";
import toast from "react-hot-toast";

interface IReceiptItemProps {
    receipts: ReceiptType;
    onUpdate: () => void;
}

const ReceiptItem = (props: IReceiptItemProps) => {
    // CONSTANTS
    const { receipts } = props;
    const { user } = useUser();
    const isAdmin =
        user?.primaryEmailAddress?.emailAddress === "adrianhenry2115@gmail.com" ||
        user?.primaryEmailAddress?.emailAddress === "mollyspecialtysweets@gmail.com";

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [openUpdater, setOpenUpdater] = useState(false);

    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    // DELETE RECEIPT
    if (deleteModalOpen) {
        return (
            <ConfirmationModal
                isOpen={deleteModalOpen}
                closeModal={() => setDeleteModalOpen(false)}
                confirm={() => {}}
                title={"Confirm deleting this receipt"}
                message={"Are you sure you want to delete this receipt?"}
                buttonText={"Delete Receipt"}
            />
        );
    }

    // UPDATE RECEIPT
    if (openUpdater) {
        return (
            <UpdateReceipt
                users={user}
                onReceiptUpdated={() => {}}
                closeUpdatedReceiptForm={() => setOpenUpdater(false)}
                receipt={receipts}
            />
        );
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
                    {getContentItem("Email Address", receipts.primaryEmailAddress)}
                    {getContentItem("Phone Number", receipts.primaryPhoneNumber! || "N/A")}
                    {getContentItem("Date Created: ", new Date(receipts.createdAt!).toLocaleString())}
                    {getContentItem(
                        "Verified: ",
                        receipts.verified ? (
                            <BsCheck2Circle fontWeight={900} size={18} color="green" />
                        ) : (
                            <BsXCircle fontWeight={900} size={18} color="red" />
                        ),
                    )}
                    {/* DELETE/UPDATE BUTTONS */}
                    {isAdmin && (
                        <div className="flex items-center justify-end mb-2">
                            <button
                                onClick={() => setOpenUpdater(true)}
                                className="flex items-center justify-center text-yellow-500 mx-2 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={openDeleteModal}
                                className="flex items-center justify-center text-red-500 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const getContentItem = (title: string, content: string | React.ReactNode) => {
    return (
        <div className="flex flex-col flex-1 w-full justify-between my-2 md:flex-row">
            <h5 className="mr-2 font-semibold flex flex-1 justify-start">{title}</h5>
            <p className="font-semibold flex justify-start text-zinc-400 text-xs">{content}</p>
        </div>
    );
};

export default ReceiptItem;
