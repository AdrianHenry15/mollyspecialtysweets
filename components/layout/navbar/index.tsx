import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { NavMenuItems } from "@/lib/constants";
import { NavMenu } from "@/lib/types";

export default async function Navbar() {
    return (
        <nav className="flex p-2 w-full fixed top-0 z-50">
            {/* MOBILE CONTAINER */}
            <div className="fixed md:hidden">
                <MobileMenu />
            </div>
            {/* TITLE & LINKS  */}
            <div className="flex w-full mt-2">
                <Link href="/" className="flex w-full justify-center md:w-auto">
                    {/* TODO: LOGO */}
                    <h5 className="flex uppercase">{`Molly's Specialty Sweets`}</h5>
                </Link>
                {/* LINKS  */}
                <ul className="hidden md:flex">
                    {NavMenuItems.map((item: NavMenu) => (
                        <li key={item.title}>
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
