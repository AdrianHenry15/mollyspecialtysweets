"use client";

import { ReceiptType } from "@/lib/types";
import { Protect, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import { BsArrowRight, BsCheck2Circle, BsXCircle } from "react-icons/bs";
import CreateReceipt from "./create-receipt";
import { FaPlus, FaUser } from "react-icons/fa6";
import { Loader } from "@/components/loader";
import Image from "next/image";

const UserReceipts = () => {
    // VARIABLES
    const { user } = useUser();

    // STATE
    const [receipts, setReceipts] = useState<ReceiptType[]>([]);
    const [newReceipt, setNewReceipt] = useState(false);
    const [loading, setLoading] = useState(true);

    // This useEffect hook fetches receipts data from the server when the component mounts.
    useEffect(() => {
        // It defines an asynchronous function `fetchReceipts` that makes a GET request to "/api/receipts".
        const fetchReceipts = async () => {
            // If the request is successful, it parses the response JSON and updates the `receipts` state.
            try {
                const response = await fetch("/api/receipts");
                if (!response.ok) {
                    throw new Error("Failed to fetch receipts");
                }
                const data = await response.json();
                setReceipts(data);
                // If an error occurs during the fetch operation, it logs the error to the console.
            } catch (error) {
                console.error(error);
            } finally {
                // The `setLoading` state is updated to `false` once the fetch operation is complete, whether successful or not.
                setLoading(false);
            }
        };

        fetchReceipts();
    }, []);

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
                <Loader />
            </div>
        );
    }

    // IF THERE ARE NO RECEIPTS...
    if (receipts.length === 0) {
        // IF newReceipts IS TRUE, AND USER IS ADMIN RENDER THE CREATE RECEIPTS COMPONENT ELSE JUST RENDER NO RECEIPTS FOUND
        return newReceipt ? (
            <Protect role="org:admin">
                <CreateReceipt newReceipt={newReceipt} closeReceiptForm={() => setNewReceipt(false)} />
            </Protect>
        ) : (
            <div>
                <p>No Receipts Found.</p>

                {/* BUTTON TO CREATE NEW RECEIPTS */}
                <Protect role="org:admin">
                    <div
                        onClick={() => setNewReceipt(true)}
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
            </div>
        );
    }

    const getContentItem = (title: string, content: string | React.ReactNode) => {
        return (
            <div className="flex flex-1 justify-between my-1">
                <h5 className="mr-2 font-semibold">{title}</h5>
                <p className="font-semibold">{content}</p>
            </div>
        );
    };

    const getUsersReceiptInfo = (image: string, name: string, email: string, phoneNumber: string) => {
        // Find the receipt where the userId matches the current user's ID
        const receipt = receipts.find((item) => item.user.id === user?.id);

        // If a matching receipt is found, render the user information
        if (receipt) {
            return (
                <div className="flex items-start py-10 border-b-[1px] border-zinc-300">
                    {/* PIC */}
                    <Image className="rounded-full" src={user?.hasImage ? user.imageUrl : ""} alt="profile-pic" width={60} height={60} />
                    {/* NAME/INFO */}
                    <div className="flex flex-col justify-start items-start text-zinc-900 text-xs ml-4">
                        {/* FIRST NAME/LAST NAME */}
                        <h5 className="text-xl font-semibold text-black">{user?.fullName}</h5>
                        {/* MEMBER/GUEST */}
                        <p className="text-zinc-400">{user?.id === null ? "Guest" : "Member"}</p>
                        {/* EMAIL */}
                        <p>{user?.primaryEmailAddress?.emailAddress}</p>
                        {/* PHONE NUMBER */}
                        <p>{user?.primaryPhoneNumber?.phoneNumber}</p>
                    </div>
                </div>
            );
        }

        // If no matching receipt is found, return null or an appropriate message
        return <p>No matching receipt found for the user.</p>;
    };

    return (
        <div className="flex flex-col border-b-[1px] border-zinc-400">
            <div className="flex flex-col border-b-[1px] border-zinc-300">
                <h3 className="text-xl">Receipts</h3>
                <aside className="text-zinc-400 text-sm">A list of your completed order receipts</aside>
            </div>
            {/* PROFILE PIC/NAME/INFO */}
            {/* <div className="flex items-start py-10 border-b-[1px] border-zinc-300"> */}
            {/* PIC */}
            {/* <Image className="rounded-full" src={user?.hasImage ? user.imageUrl : ""} alt="profile-pic" width={60} height={60} /> */}
            {/* NAME/INFO */}
            {/* <div className="flex flex-col justify-start items-start text-zinc-900 text-xs ml-4"> */}
            {/* FIRST NAME/LAST NAME */}
            {/* <h5 className="text-xl font-semibold text-black">{user?.fullName}</h5> */}
            {/* MEMBER/GUEST */}
            {/* <p className="text-zinc-400">{user?.id === null ? "Guest" : "Member"}</p> */}
            {/* EMAIL */}
            {/* <p>{user?.primaryEmailAddress?.emailAddress}</p> */}
            {/* PHONE NUMBER */}
            {/* <p>{user?.primaryPhoneNumber?.phoneNumber}</p> */}
            {/* </div> */}
            {/* </div> */}
            {/* CONTENT */}
            <div className="flex text-sm flex-col my-2">
                {receipts.map((item, index) => {
                    // TODO: IF USER IS ADMIN RENDER USER INFO; IF USER IS NOT ADMIN DO NOT RENDER USER INFO
                    return (
                        <div key={index}>
                            {getContentItem("Receipt ID: ", item.id)}
                            {getContentItem("Item Name: ", item.name)}
                            {getContentItem("User Name", item.user.name!)}
                            {getContentItem("Email Address", item.user.email!)}
                            {getContentItem("Phone Number", item.user.phone!)}
                            {getContentItem("Price: ", `$${parseInt(item.price).toPrecision(3)}`)}
                            {getContentItem("Date Created: ", item.date)}
                            {getContentItem(
                                "Verified: ",
                                item.verified ? (
                                    <BsCheck2Circle fontWeight={900} size={18} color="green" />
                                ) : (
                                    <BsXCircle fontWeight={900} size={18} color="red" />
                                ),
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserReceipts;
