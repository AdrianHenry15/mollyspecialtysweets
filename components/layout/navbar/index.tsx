import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { NavMenuItems } from "@/lib/constants";
import { NavMenu } from "@/lib/types";
const { SITE_NAME } = process.env;

export default async function Navbar() {
    return (
        <nav className="relative flex items-center justify-between p-4 lg:px-6">
            <div className="block flex-none md:hidden">
                <MobileMenu />
            </div>
            <div className="flex w-full items-center">
                <div className="flex w-full md:w-1/3">
                    <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
                        {/* TODO: LOGO */}
                        <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">{SITE_NAME}</div>
                    </Link>

                    <ul className="hidden gap-6 text-sm md:flex md:items-center">
                        {NavMenuItems.map((item: NavMenu) => (
                            <li key={item.title}>
                                <Link
                                    href={item.link}
                                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
