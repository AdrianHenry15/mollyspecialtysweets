import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const PromotionBanner = () => {
    const { isSignedIn } = useUser();

    return (
        <div className="bg-pink-200 justify-center items-center text-black text-center sticky top-[78px] font-semibold text-xs py-1 z-30 w-full">
            {!isSignedIn ? (
                <div>
                    <Link href="/sign-up" className="text-blue-500 mx-1">
                        Sign up
                    </Link>
                    <span>today to get an </span>
                    <span className="text-pink-600">Estimate</span>
                    <span className="mx-1">and</span>
                    <span className="text-pink-600">Order a treat</span>
                </div>
            ) : (
                <div>
                    <span className="text-pink-600">Molly Specialty Sweets</span>
                    <span> has a new look </span>
                </div>
            )}
        </div>
    );
};

export default PromotionBanner;
