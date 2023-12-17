import CurtainBtn from "@/components/curtain-btn";
import Link from "next/link";
import React from "react";

const ImgLinkOverlay = () => {
    return (
        <div
            className={`flex w-full items-center justify-center relative bg-cover bg-[url('/cake-splash.jpg')] h-80 md:h-[80vh] lg:h-[50vh]`}
        >
            <CurtainBtn href="/order" name="Order Now" />
        </div>
    );
};

export default ImgLinkOverlay;
