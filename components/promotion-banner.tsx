import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const PromotionBanner = () => {
    const { isSignedIn } = useUser();

    return (
        <div className="bg-pink-200 justify-center items-center text-black text-center absolute top-[79px] font-semibold text-sm py-1 z-50 w-full">
            {!isSignedIn ? (
                <div>
                    <Link href="/sign-up" className="text-blue-500 mx-1">
                        Sign up
                    </Link>
                    <span>today to see your </span>
                    <span className="text-pink-600">Receipts</span>
                    <span className="mx-1">and</span>
                    <span className="text-pink-600">Estimates</span>
                </div>
            ) : (
                <div>
                    <span>Click on your profile to checkout your </span>
                    <span className="text-pink-600">Receipts</span>
                    <span className="mx-1">and</span>
                    <span className="text-pink-600">Estimates</span>
                    <span className="ml-1">now!</span>
                </div>
            )}
        </div>
    );
};

export default PromotionBanner;
