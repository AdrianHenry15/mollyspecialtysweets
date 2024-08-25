"use client";

import React from "react";
import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import { BsReceipt } from "react-icons/bs";
import { FaMoneyBill, FaUser } from "react-icons/fa6";

import UserEstimates from "./estimates/user-estimates";
import UserReceipts from "./receipts/user-receipts";
import UserProfiles from "./user-profiles";

const UserIcon = () => {
    const { user } = useUser();
    const isAdmin =
        user?.primaryEmailAddress?.emailAddress === "adrianhenry2115@gmail.com" ||
        user?.primaryEmailAddress?.emailAddress === "mollyspecialtysweets@gmail.com";

    return (
        <div>
            <SignedIn>
                {/* Mount the UserButton component */}
                <div className="flex relative items-center cursor-pointer">
                    {/* USER IMAGE */}
                    {isAdmin ? (
                        <UserButton>
                            {/* USERS */}
                            <UserButton.UserProfilePage label="Users" url="users" labelIcon={<FaUser />}>
                                <UserProfiles />
                            </UserButton.UserProfilePage>
                        </UserButton>
                    ) : (
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
                    )}
                    {/* ORG OPTION */}
                    {/* {isAdmin ? (
                        <div className="ml-4">
                            <OrganizationSwitcher />
                        </div>
                    ) : null} */}
                </div>
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <Link href={"/sign-in"} className="bg-pink-200 text-black px-40 py-1 rounded-full shadow-md lg:py-2 lg:px-10">
                    <SignInButton redirectUrl="/" />
                </Link>
            </SignedOut>
        </div>
    );
};

export default UserIcon;
