import React from "react";
import { GiStairsCake, GiCupcake } from "react-icons/gi";
import { AiFillContacts } from "react-icons/ai";
import { PiCookieDuotone } from "react-icons/pi";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav data-testid="navbar" className="mt-12 mb-20 text-center sm:text-sm">
            <span data-testid="app-header-test" className="w-full text-center" id="app-header-text">{`Molly's Specialty Sweets`}</span>
            <div className="mt-10 w-full flex justify-evenly items-center text-4xl">
                {/* <Link href={"/contact"}> */}
                <AiFillContacts />
                {/* </Link> */}
                {/* <Link href={"../order-forms/cake"}> */}
                <GiStairsCake />
                {/* </Link> */}
                {/* <Link href={"../order-forms/cupcake"}> */}
                <GiCupcake />
                {/* </Link> */}
                {/* <Link href={"../order-forms/cookie"}> */}
                <PiCookieDuotone />
                {/* </Link> */}
            </div>
        </nav>
    );
};

export default Navbar;
