"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface IIconItemProps {
    href: string;
    src: any;
    name: string;
    description: string;
    linkText: string;
}

const IconItem = (props: IIconItemProps) => {
    return (
        <Link
            href={props.href}
            className={`flex flex-col px-4 py-10 justify-center items-center flex-1 rounded-lg hover:bg-zinc-900 ease-in-out duration-300 md:mx-10`}
        >
            <span>
                <Image className="hover:scale-110 duration-300 ease-in-out" src={props.src} alt="cookie-icon" width={75} height={75} />
            </span>
            <h5 className="text-white my-4 font-semibold text-2xl transition-colors duration-500 hover:text-blue-400">{props.name}</h5>
            <p className="text-white font-light w-full transition-colors duration-500 hover:text-blue-400">{props.description}</p>
            <div className="text-pink-500 flex items-center justify-center pt-10 transition-colors duration-500 hover:text-blue-400">
                <aside className="mr-2">{props.linkText}</aside>
                <ChevronRightIcon width={15} />
            </div>
        </Link>
    );
};

export default IconItem;
