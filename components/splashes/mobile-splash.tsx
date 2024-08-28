import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import Logo from "@/public/mollys-logo-pink.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

interface MobileSplashProps {
    img: string | StaticImport;
    title: string;
    link1: string;
    link2: string;
    link_title_1: string;
    link_title_2: string;
}

const MobileSplash = (props: MobileSplashProps) => {
    return (
        <motion.div
            className="w-full text-white bg-black h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="w-full h-full relative flex md:hidden">
                <div className="absolute w-full h-full bg-gradient-to-r from-black flex"></div>
                <span>
                    <Image className="w-full h-full object-cover object-top" src={props.img} alt={props.title} />
                </span>
                {/* TEXT CONTAINER */}
                <div className="flex flex-col w-full justify-center h-full p-4 absolute text-sm">
                    <span>
                        <Image src={Logo} alt="logo" className="w-24 py-2" />
                    </span>
                    <h1 className="text-white text-3x1 md:text-5xl">{props.title}</h1>
                    <div className="my-4 text-xs">
                        <Link href={props.link1} className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
                            {props.link_title_1}
                        </Link>
                        <Link href={props.link2} className="border  text-white border-gray-300 py-2 px-5 ml-4">
                            {props.link_title_2}
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MobileSplash;
