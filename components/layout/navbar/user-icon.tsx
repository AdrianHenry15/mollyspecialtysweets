import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const UserIcon = () => {
    return (
        <div>
            <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton />
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <div className="bg-pink-500 px-10 py-2 rounded-full text-white shadow-md">
                    <SignInButton />
                </div>
            </SignedOut>
        </div>
    );
};

export default UserIcon;
