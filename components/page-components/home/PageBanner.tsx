import React from "react";
import Link from "next/link";

import { BsTruck, BsShop, BsCreditCard2Back } from "react-icons/bs";
import { PiCallBell, PiArrowsCounterClockwiseFill } from "react-icons/pi";
import { GiBalloons, GiFlowers, GiPartyPopper, GiTrophyCup } from "react-icons/gi";

const PageBanner = () => {
    const btnClass =
        "flex items-center text-black font-semibold bg-white rounded-lg flex-1 m-1 py-6 w-1/2 min-w-[170px] max-w-[170px] justify-start pr-10 lg:bg-black lg:text-white lg:w-full";

    return (
        <section
            id="home-banner"
            className="flex flex-col justify-center items-center text-center w-full py-6 px-2 bg-black text-white font-light"
        >
            <h2 className="font-bold text-3xl">Specialty Cakes</h2>
            <p className="text-sm my-4">
                Whether you need cake delivery*, or want to pick it up, we make it easy to order your cakes online.
            </p>
            <aside className="text-xs text-zinc-400 mb-4">*Delivery only available in Orlando, Florida</aside>
            <div className="flex flex-wrap py-4 justify-center">
                {/* DELIVERY  */}
                <Link href={"/delivery"} className={btnClass}>
                    <>
                        <BsTruck className="mx-2" size={35} />
                        Delivery
                    </>
                </Link>
                {/* PICKUP  */}
                <Link href={"/pickup"} className={btnClass}>
                    <>
                        <BsShop className="mx-2" size={35} />
                        Pickup
                    </>
                </Link>
                {/* CATERING  */}
                <Link href={"/weddings"} className={btnClass}>
                    <GiFlowers className="mx-2" size={35} />
                    Weddings
                </Link>
                {/* GIFTS  */}
                <Link href={"/birthdays"} className={btnClass}>
                    <>
                        <GiBalloons className="mx-2" size={35} />
                        Birthdays
                    </>
                </Link>
                {/* SHIPPING  */}
                <Link href={"/parties"} className={btnClass}>
                    <>
                        <GiPartyPopper className="mx-2" size={35} />
                        Parties
                    </>
                </Link>
                {/* SUBSCRIPTIONS  */}
                <Link href={"/rewards"} className={btnClass}>
                    <>
                        <GiTrophyCup className="mx-2" size={35} />
                        Rewards
                    </>
                </Link>
            </div>
        </section>
    );
};

export default PageBanner;
