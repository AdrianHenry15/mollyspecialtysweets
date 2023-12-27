import Link from "next/link";
import React from "react";

interface ICurtainBtnProps {
    href: string;
    name: string;
}

const CurtainBtn = (props: ICurtainBtnProps) => {
    return (
        <Link
            href={props.href}
            className="before:ease relative h-12 w-40 overflow-hidden border rounded-full border-black bg-black py-8 px-36 whitespace-nowrap text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-pink-500 before:duration-300 hover:text-white hover:shadow-pink-500 hover:before:h-64 hover:before:-translate-y-32"
        >
            <span className="relative z-10 text-center w-full flex items-center justify-center h-full">{props.name}</span>
        </Link>
    );
};

export default CurtainBtn;
