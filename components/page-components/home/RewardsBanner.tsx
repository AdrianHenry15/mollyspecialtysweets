import React from "react";
import Image from "next/image";
import Link from "next/link";

import IPhone from "../../../public/transparent-iphone.png";

const RewardsBanner = () => {
    return (
        <section
            id="rewards-banner"
            className="flex flex-col justify-center items-center bg-[url('/cupcakes.jpg')] bg-cover py-20 w-full object-top bg-bottom md:py-10 md:px-20 lg:py-20"
        >
            <div className="flex w-1/2 self-center">
                <div className="flex flex-1">
                    <Image src={IPhone} alt="phone" className="flex-1" width={0} height={0} />
                </div>
                {/* REWARDS DESCRIPTION/ **ONLY ON LG SCREENS** */}
                {/* <div className="hidden flex-col items-start flex-1 lg:flex"> */}
                <p className="text-black items-center text-lg font-bold hidden lg:flex md:text-2xl lg:text-4xl">
                    Earn Loyalty Points toward FREE cupcakes with our loyalty system!
                </p>
            </div>
            {/* <Button isLink containerClass="mb-0 mt-6" text={"Earn Taharka Points"} onClick={() => {}} path={"/rewards"} /> */}
            {/* </div> */}
            <Link href={"/rewards"} className="mt-6 mb-0 flex bg-black rounded-full text-white px-10 py-2">
                Earn Sweet Points
            </Link>
        </section>
    );
};

export default RewardsBanner;
