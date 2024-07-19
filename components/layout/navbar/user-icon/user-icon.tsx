"use client";

import React from "react";
import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { BsReceipt } from "react-icons/bs";
import { FaMoneyBill, FaTowerBroadcast } from "react-icons/fa6";

import UserEstimates from "./user-estimates";
import UserReceipts from "./user-receipts/user-receipts";

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
                        {/* REWARDS */}
                        {/* <UserButton.UserProfilePage label="Rewards" url="rewards" labelIcon={<GiWantedReward />}>
                            <p>stuff</p>
                        </UserButton.UserProfilePage> */}
                    </UserButton>
                    {/* ORG OPTION */}
                    <div className="ml-4">
                        <OrganizationSwitcher />
                    </div>
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