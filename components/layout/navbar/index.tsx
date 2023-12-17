"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import MobileMenu from "./mobile-menu";

import { NavMenuItems } from "@/lib/constants";
import { NavMenu } from "@/lib/types";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={`flex pt-2 pb-4 w-10/12 self-center rounded-b-lg sticky top-0 z-50`}>
            {/* MOBILE CONTAINER */}
            <div className="fixed lg:hidden">
                <MobileMenu />
            </div>
            {/* TITLE & LINKS  */}
            <div className="flex w-full mt-2 justify-evenly">
                <Link href="/" className="flex w-full justify-center md:w-auto">
                    {/* TODO: LOGO */}
                    <h5 className="flex uppercase">{`Molly's Specialty Sweets`}</h5>
                </Link>
                {/* LINKS  */}
                <ul className="hidden lg:flex">
                    {NavMenuItems.map((item: NavMenu) => (
                        <li
                            className={`mx-2 transition-all duration-300 ease-in-out hover:text-zinc-500 hover:underline ${
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
                {/* END OF LINKS  */}
            </div>
        </nav>
    );
}
