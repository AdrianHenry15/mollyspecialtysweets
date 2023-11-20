import Image from "next/image";
import React from "react";

import Link from "next/link";

const Banner = () => {
    return (
        <section className="flex flex-col items-center h-min bg-main p-10 md:flex-row md:justify-center">
            <div className="flex flex-col items-center md:flex-1">
                <h1 className="font-semibold text-4xl text-center">A whole new way to treat yourself</h1>
                <p className="font-light py-4">{`Don't miss out on FREE ice cream!`}</p>
            </div>
            {/* REWARDS LOGO */}
            <div className="flex flex-col items-center md:flex-1">
                <Link className="bg-black flex text-center text-white px-20 rounded-full py-2" href={"/sign-in"}>
                    Sign In
                </Link>
            </div>
        </section>
    );
};

export default Banner;
