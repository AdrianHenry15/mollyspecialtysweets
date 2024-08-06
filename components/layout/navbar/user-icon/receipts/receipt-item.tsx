import ConfirmationModal from "@/components/modals/confirmation-modal";
import { ReceiptType, UserType } from "@/lib/types";
import { Protect, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { BsArrowRight, BsCheck2Circle, BsXCircle } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import CreateReceipt from "./create-receipt";
import UpdateReceipt from "./update-receipt";
import { deleteReceipt, updateReceipt } from "@/lib/receipt-crud-operations";
import toast from "react-hot-toast";

interface IReceiptItemProps {
    users: UserType;
    receipts: ReceiptType;
}

const ReceiptItem = (props: IReceiptItemProps) => {
    // CONSTANTS
    const { receipts, users } = props;
    const { user } = useUser();
    const isAdmin =
        user?.primaryEmailAddress?.emailAddress === "adrianhenry2115@gmail.com" ||
        user?.primaryEmailAddress?.emailAddress === "mollyspecialtysweets@gmail.com";
    // STATE
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // CREATE
    const [openCreater, setOpenCreater] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newUser, setNewUser] = useState<UserType>();
    // UPDATE
    const [openUpdater, setOpenUpdater] = useState(false);
    const [updatedItemName, setUpdatedItemName] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState("");
    const [updatedUserId, setUpdatedUserId] = useState("");
    //DELETE
    const [selectedReceiptId, setSelectedReceiptId] = useState("");

    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const getContentItem = (title: string, content: string | React.ReactNode) => {
        return (
            <div className="flex flex-1 justify-between my-1">
                <h5 className="mr-2 font-semibold">{title}</h5>
                <p className="font-semibold">{content}</p>
            </div>
        );
    };

    async function handleUpdateReceipt(id: string) {
        try {
            const updatedReceipt = await updateReceipt(id, {
                itemName: updatedItemName,
                price: updatedPrice,
                userId: updatedUserId!,
                verified: true,
            });
            console.log("Updated receipt:", updatedReceipt);
        } catch (error) {
            console.error(error);
        }
    }

    // Function to delete a receipt
    const handleDelete = async (id: string) => {
        if (!selectedReceiptId) return;

        try {
            const response = await fetch(`/api/receipts/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                toast.error("Can not delete this receipt");
                throw new Error("Failed to delete receipt");
            }
            // Toast at top of screen
            toast.success("You have successfully deleted this receipt");
        } catch (error) {
            console.error(error);
        } finally {
            setDeleteModalOpen(false);
            setSelectedReceiptId("");
        }
    };

    const confirmDelete = (id: string) => {
        setSelectedReceiptId(id);
        setDeleteModalOpen(true);
    };

    const renderCreateReceiptButton = () => {
        if (isAdmin) {
            return (
                // <Protect role="org:admin">
                <div
                    // onClick={setIsCreatingReceipt}
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
                // </Protect>
            );
        }
    };

    // CREATE RECEIPT
    if (openCreater) {
        return <CreateReceipt receipt={receipts} closeReceiptForm={() => setOpenCreater(false)} />;
    }

    // UPDATE RECEIPT
    if (openUpdater) {
        return <UpdateReceipt closeUpdatedReceiptForm={() => setOpenUpdater(false)} receipt={receipts} />;
    }

    // DELETE RECEIPT
    if (deleteModalOpen) {
        return (
            <ConfirmationModal
                isOpen={deleteModalOpen}
                closeModal={() => setDeleteModalOpen(false)}
                confirm={() => confirmDelete(receipts.id)}
                title={"Confirm deleting this receipt"}
                message={"Are you sure you want to delete this receipt?"}
                buttonText={"Delete Receipt"}
            />
        );
    }

    // RECEIPT ITEM
    if (!openCreater && !openUpdater) {
        return (
            <div className="flex flex-col">
                {/* CONTENT */}
                <div className="flex text-sm flex-col my-2">
                    {/* TODO: IF USER IS ADMIN RENDER USER INFO; IF USER IS NOT ADMIN DO NOT RENDER USER INFO */}
                    <div className="border-b-[1px] border-zinc-300">
                        {getContentItem("Receipt ID: ", receipts.id)}
                        {getContentItem("Item Name: ", receipts.itemName)}
                        {getContentItem("Price: ", `$${receipts.price}`)}
                        {getContentItem("User Name: ", receipts.user.fullName || "N/A")}
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
                                    // onClick={() => setOpenUpdater(true)}
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
                {/* BUTTON TO CREATE NEW RECEIPTS */}
                {renderCreateReceiptButton()}
            </div>
        );
    }
};

export default ReceiptItem;
