"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { motion } from "framer-motion";

import Logo from "@/public/mollys-logo-pink.png";
import MobileSplash from "./mobile-splash";

interface ISplashProps {
    img: string | StaticImport;
    title: string;
    link1: string;
    link2: string;
    link_title_1: string;
    link_title_2: string;
}

const Splash = (props: ISplashProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            threshold: 0.1, // Adjust the threshold as needed (percentage of element visibility)
        };

        const callback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    containerRef.current?.classList.add("show");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect(); // Cleanup observer on component unmount
    }, []);

    return (
        <motion.div
            className="w-full text-white bg-black md:h-[750px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* LARGE SCREEN VIEW */}
            <div className="w-full h-full relative hidden md:flex">
                <div className="absolute w-full h-[750px] bg-gradient-to-r from-black hidden md:flex"></div>
                <span className="w-full">
                    <Image className="w-full h-full object-cover object-top" src={props.img} alt={props.title} />
                </span>
                {/* TEXT CONTAINER */}
                <div className="flex flex-col w-full p-4 justify-center h-full md:absolute md:p-8">
                    <span>
                        <Image src={Logo} alt="logo" className="w-24 py-2" />
                    </span>
                    <h1 className="text-white text-3x1 md:text-5xl">{props.title}</h1>
                    <div className="my-6">
                        <Link href={props.link1} className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
                            {props.link_title_1}
                        </Link>
                        <Link href={props.link2} className="border  text-white border-gray-300 py-2 px-5 ml-4">
                            {props.link_title_2}
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <MobileSplash
                    img={props.img}
                    title={props.title}
                    link1={props.link1}
                    link2={props.link2}
                    link_title_1={props.link_title_1}
                    link_title_2={props.link_title_2}
                />
            </div>
        </motion.div>
    );
};

export default Splash;
