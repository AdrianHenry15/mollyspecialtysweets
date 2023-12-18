"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { NavMenuItems } from "@/lib/constants";
import { NavMenu } from "@/lib/types";

import { MdOutlineCopyright } from "react-icons/md";

const Footer = () => {
    const pathname = usePathname();

    return (
        <section className="flex flex-col bg-black text-zinc-400 px-4 py-10">
            <h1 className="text-white">Company</h1>
            <ul>
                {NavMenuItems.map((item: NavMenu) => (
                    <li
                        className={`mx-2 my-4 transition-all duration-300 ease-in-out hover:text-zinc-500 hover:underline ${
                            pathname === item.link ? "underline" : ""
                        }`}
                        key={item.title}
                    >
                        <Link href={item.link} className="">
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <h1 className="text-white">Contact Information</h1>
                <div className="mx-2">
                    <p className="my-4">For any questions, converns, or comments, please contact us at:</p>
                    <p>Phone: 407-242-4468</p>
                    <p>Email: mollyspecialtysweets@gmail.com</p>
                </div>
            </div>
            <div className="flex items-center justify-center text-center self-center w-full border-t-[1px] mt-10 pt-6 text-xs border-zinc-500">
                <MdOutlineCopyright />
                <h5 className="text-white ml-2">{"Molly's Specialty Sweets"}</h5>
                <p className="mx-2">Created by</p>
                <h5 className="text-white">ThirdGen</h5>
            </div>
        </section>
    );
};

export default Footer;
