import Image from "next/image";
import React from "react";

import PinkSplash from "@/public/aesthetic-pink.jpg";

const Banner = () => {
    return (
        <section className="relative flex items-center justify-center">
            <Image src={PinkSplash} alt="pink-splash" className="object-cover w-full h-[23rem]" />
            {/* <h5 className="text-4xl absolute">Title</h5> */}
        </section>
    );
};

export default Banner;
