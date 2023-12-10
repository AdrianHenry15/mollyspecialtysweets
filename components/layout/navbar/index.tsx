"use client";

import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { NavMenuItems } from "@/lib/constants";
import { NavMenu } from "@/lib/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const isTop = scrollTop < 50;

            setIsScrolled(!isTop);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <nav className={`bg-white flex pt-2 pb-4 w-10/12 self-center rounded-b-lg sticky top-0 z-50`}>
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
                            className={`mx-2 hover:text-zinc-500 hover:underline ${pathname === item.link ? "underline" : ""}`}
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
