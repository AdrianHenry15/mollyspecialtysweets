import Link from "next/link";
import React from "react";

import { SiClerk } from "react-icons/si";
import { CgSquare } from "react-icons/cg";
import { SiNextdotjs } from "react-icons/si";
import { GrReactjs } from "react-icons/gr";
import EmailJsIcon from "@/public/emailjs.png";
import Image from "next/image";

const PoweredBy = () => {
    return (
        <div className="flex flex-col w-full justify-center py-10 border-t-[1px] border-zinc-900">
            <h5 className="italic text-sm text-white flex items-center justify-center mb-10">Powered By:</h5>
            <div className="flex items-center justify-around w-full">
                {/* Clerk */}
                <Link target="_blank" href="https://clerk.com">
                    <SiClerk className="hover:scale-125 transition-all duration-300 ease-in-out" size={25} />
                </Link>
                {/* Square */}
                <Link target="_blank" href="https://square.com">
                    <CgSquare className="hover:scale-125 transition-all duration-300 ease-in-out" size={50} />
                </Link>
                {/* Emailjs */}
                <Link target="_blank" href="https://www.emailjs.com/">
                    <Image
                        src={EmailJsIcon}
                        alt="emailjs-icon"
                        className="hover:scale-125 transition-all duration-300 ease-in-out w-[32px] text-white"
                    />
                </Link>
                {/* Nextjs */}
                <Link target="_blank" href="https://nextjs.org/">
                    <SiNextdotjs className="hover:scale-125 transition-all duration-300 ease-in-out" size={35} />
                </Link>
                {/* Reactjs */}
                <Link target="_blank" href="https://react.dev/">
                    <GrReactjs className="hover:scale-125 transition-all duration-300 ease-in-out" size={35} />
                </Link>
            </div>
        </div>
    );
};

export default PoweredBy;
