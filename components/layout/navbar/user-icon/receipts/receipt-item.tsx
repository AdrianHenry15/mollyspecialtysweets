import ConfirmationModal from "@/components/modals/confirmation-modal";
import { ReceiptType } from "@/lib/types";
import { Protect, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { BsArrowRight, BsCheck2Circle, BsXCircle } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import CreateReceipt from "./create-receipt";
import UpdateReceipt from "./update-receipt";

interface IReceiptItemProps {
    receipts: ReceiptType;
    handleUpdate?: (item: ReceiptType) => void;
    confirmDelete?: (item: string) => void;
    setIsCreatingReceipt?: () => void;
    modalVisible?: boolean;
    setModalVisible?: () => void;
    handleDelete?: (item: string) => void;
}

const ReceiptItem = (props: IReceiptItemProps) => {
    const { receipts, handleUpdate, confirmDelete, setIsCreatingReceipt, modalVisible, setModalVisible, handleDelete } = props;
    const { user } = useUser();
    const isAdmin =
        user?.primaryEmailAddress?.emailAddress === "adrianhenry2115@gmail.com" ||
        user?.primaryEmailAddress?.emailAddress === "mollyspecialtysweets@gmail.com";

    const getContentItem = (title: string, content: string | React.ReactNode) => {
        return (
            <div className="flex flex-1 justify-between my-1">
                <h5 className="mr-2 font-semibold">{title}</h5>
                <p className="font-semibold">{content}</p>
            </div>
        );
    };

    const renderCreateReceiptButton = () => {
        return (
            <Protect role="org:admin">
                <div
                    onClick={setIsCreatingReceipt}
                    className="flex w-full items-center text-sm text-blue-800 p-2 cursor-pointer rounded-md hover:bg-blue-300 ease-in-out duration-300 transition-colors"
                >
                    <div className="flex items-center w-full justify-start">
                        <FaPlus size={11} />
                        <p className="text-blue-800 ml-1">Add New Receipt</p>
                    </div>
                    <div className="flex justify-end w-full">
                        <BsArrowRight size={15} color="white" />
                    </div>
                </div>
            </Protect>
        );
    };
    return (
        <div className="flex flex-col">
            {/* CONTENT */}
            <div className="flex text-sm flex-col my-2">
                {/* TODO: IF USER IS ADMIN RENDER USER INFO; IF USER IS NOT ADMIN DO NOT RENDER USER INFO */}
                <div className="border-b-[1px] border-zinc-300">
                    {getContentItem("Receipt ID: ", receipts.id)}
                    {getContentItem("Item Name: ", receipts.itemName)}
                    {getContentItem("Price: ", `$${receipts.price}`)}
                    {getContentItem("User Name: ", receipts.user.name || "N/A")}
                    {getContentItem("Email Address", receipts.user.email || "N/A")}
                    {getContentItem("Phone Number", receipts.user.phoneNumber! || "N/A")}
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
                                onClick={() => handleUpdate!(receipts)}
                                className="flex items-center justify-center text-yellow-500 mx-2 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => confirmDelete!(receipts.id)}
                                className="flex items-center justify-center text-red-500 hover:underline transition-all duration-300 ease-in-out underline-offset-2"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                    {/* CONFIRMATION MODAL */}
                    <ConfirmationModal
                        isOpen={modalVisible!}
                        closeModal={setModalVisible!}
                        confirm={() => handleDelete!(receipts.id)}
                        title={"Confirm deleting this receipt"}
                        message={"Are you sure you want to delete this receipt?"}
                        buttonText={"Delete Receipt"}
                    />
                </div>
            </div>
            {/* BUTTON TO CREATE NEW RECEIPTS */}
            {renderCreateReceiptButton()}
        </div>
    );
};

export default ReceiptItem;
