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

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={`bg-white text-sm font-semibold flex w-full self-center sticky top-0 z-50 shadow-md`}>
            {/* MOBILE CONTAINER */}
            <div className="absolute self-center right-10 lg:hidden">
                <MobileHeader />
            </div>
            {/* TITLE & LINKS  */}
            <div className="flex w-full my-2 justify-evenly">
                <div className="flex items-center">
                    <Link href="/" className="lg:mr-10">
                        {/* TODO: LOGO */}
                        <Image className="" src={logo} alt="logo" width={100} />
                    </Link>
                    {/* LINKS  */}
                    <ul className="hidden text-gray-600 items-center lg:flex">
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
                    <Link className="mr-4" href={"/contact-us"}>
                        <Button roundedFull name="Contact Us" altColor />
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
