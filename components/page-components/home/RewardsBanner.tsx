import React from "react";

import { BsPhoneFill } from "react-icons/bs";
import Button from "../../ui/Button";

const RewardsBanner = () => {
    return (
        <section
            id="rewards-banner"
            className="flex flex-col justify-center items-center bg-[url('/imgs/ice-cream-bg-3.jpg')] bg-cover py-20 w-full object-top bg-bottom md:py-10 md:px-20 lg:py-20"
        >
            <div className="flex w-1/2 self-center">
                <div className="flex flex-1">
                    <BsPhoneFill className="flex-1" size={200} />
                </div>
                {/* REWARDS DESCRIPTION/ **ONLY ON LG SCREENS** */}
                {/* <div className="hidden flex-col items-start flex-1 lg:flex"> */}
                <p className="text-black items-center text-lg font-bold hidden lg:flex md:text-2xl lg:text-4xl">
                    Earn Loyalty Points toward FREE ice cream with the Taharka App!
                </p>
            </div>
            {/* <Button isLink containerClass="mb-0 mt-6" text={"Earn Taharka Points"} onClick={() => {}} path={"/rewards"} /> */}
            {/* </div> */}
            <Button containerClass="mt-6 mb-0" isLink text={"Earn Taharka Points"} path={"/rewards"} />
        </section>
    );
};

export default RewardsBanner;
