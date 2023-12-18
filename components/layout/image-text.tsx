"use client";

import Image from "next/image";
import React from "react";

import useScrollAnimation from "hooks/useScrollAnimation";

import Cupcakes from "@/public/cupcakes.jpg";
import Link from "next/link";

const ImageText = () => {
    const { ref, animationClass } = useScrollAnimation();

    return (
        <section ref={ref} className={`${animationClass} flex flex-col py-32 self-center text-center w-[90%] md:py-48 md:flex-row`}>
            <div className="border-black rounded-lg border-4 md:flex-1">
                <Image src={Cupcakes} alt="cupcakes" />
            </div>
            <div className="flex flex-col w-full md:flex-1">
                {/* CAPTION/HEADER TEXT */}
                <div className="my-16">
                    <h5 className="tracking-wider">Caption</h5>
                    <h2 className="text-2xl tracking-wider">Title Header</h2>
                </div>
                {/* DESCRIPTION */}
                <p className="mb-16 md:w-2/3 self-center">
                    Unlock sweet rewards and exclusive treats with the Taharka Bros Loyalty App. Join now for a scoop of loyalty, where
                    every purchase brings you close to indulgent perks!
                </p>
                {/* LINK BUTTON */}
                <Link
                    className="bg-black rounded-full text-white w-[200px] self-center py-4 transition-colors duration-1000 ease-in-out hover:bg-pink-500"
                    href={"/stuff"}
                >
                    Link Button
                </Link>
            </div>
        </section>
    );
};

export default ImageText;
