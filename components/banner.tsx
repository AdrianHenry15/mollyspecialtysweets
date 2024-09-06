import Image from "next/image";
import React from "react";

import PinkSplash from "@/public/pink-splash.jpg";

const Banner = () => {
    return (
        <section className="relative flex items-center justify-center">
            <Image src={PinkSplash} alt="pink-splash" className="object-cover w-full h-48" />
            <h5 className="text-4xl absolute">Title</h5>
        </section>
    );
};

export default Banner;
