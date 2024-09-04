"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import MobileHeader from "@/components/layout/navbar/mobile-menu";
import logo from "@/public/mollys-logo-black.png";
import { NavMenuItems } from "@/lib/constants";
import { NavMenuType } from "@/lib/types";
import Button from "@/components/buttons/button";
import UserIcon from "./user-icon/user-icon";
import Cart from "@/components/cart";
import { useState } from "react";
import { useCartStore } from "@/stores/cart-store";
import { FaPhone } from "react-icons/fa6";

export default function Navbar() {
    // STATE
    const [isCartOpen, setIsCartOpen] = useState(false);

    // CONSTANTS
    const pathname = usePathname();

    return (
        <nav className={`bg-white text-sm font-semibold flex w-full self-center sticky top-0 z-50 shadow-md`}>
            {/* MOBILE CONTAINER */}
            <div className="absolute self-center right-10 xl:hidden">
                <MobileHeader />
            </div>
            {/* TITLE & LINKS  */}
            <div className="flex w-full my-2 justify-evenly">
                <div className="flex items-center">
                    <Link href="/" className="xl:mr-10">
                        {/* TODO: LOGO */}
                        <Image className="" src={logo} alt="logo" width={100} />
                    </Link>
                    {/* LINKS  */}
                    <ul className="hidden text-gray-600 items-center xl:flex">
                        {NavMenuItems.map((item: NavMenuType) => (
                            <li
                                className={`mx-2 transition-all duration-300 ease-in-out hover:text-blue-700 hover:underline ${
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
                </div>
                {/* NAV BUTTONS */}
                <ul className="hidden items-center lg:flex">
                    <Link
                        // onClick={close}
                        className="bg-pink-300/90 flex mr-4 items-center px-10 py-2 rounded-full hover:bg-pink-400 transition-all duration-300 ease-in-out"
                        href="sms:4072424468"
                    >
                        <FaPhone className="mr-2" />
                        <h5 className="hover:text-white transition-colors duration-300 ease-in-out">(407) 242-4468</h5>
                    </Link>
                    <Link href={"/estimate"}>
                        <Button className="animate-pulse" roundedFull name="Get Your Free Estimate" />
                    </Link>
                    <div className="mx-4">
                        <UserIcon />
                    </div>
                </ul>
            </div>
            <div className="flex justify-center items-center">
                <Cart />
            </div>
        </nav>
    );
}
