"use client";

import React from "react";
import { Protect, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { BsReceipt, BsReceiptCutoff } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa6";

import UserEstimates from "./user-estimates";
import UserReceipts from "./user-receipts";

const UserIcon = () => {
    return (
        <div>
            <SignedIn>
                {/* Mount the UserButton component */}
                <div className="flex relative items-center cursor-pointer">
                    {/* USER IMAGE */}
                    <UserButton>
                        {/* ESTIMATES */}
                        <UserButton.UserProfilePage label="Estimates" url="estimates" labelIcon={<FaMoneyBill />}>
                            <UserEstimates />
                        </UserButton.UserProfilePage>
                        {/* RECEIPTS */}
                        <UserButton.UserProfilePage label="Receipts" url="receipts" labelIcon={<BsReceipt />}>
                            <UserReceipts />
                        </UserButton.UserProfilePage>
                        {/* CREATE RECEIPTS */}
                        <Protect>
                            <UserButton.UserProfilePage label="Create Receipt" url="create-receipt" labelIcon={<BsReceiptCutoff />}>
                                <p>stuff</p>
                            </UserButton.UserProfilePage>
                        </Protect>
                    </UserButton>
                </div>
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <Link href={"/sign-in"} className="bg-pink-200 text-black px-10 py-2 rounded-full shadow-md">
                    <SignInButton />
                </Link>
            </SignedOut>
        </div>
    );
};

export default UserIcon;
