"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { RxHamburgerMenu } from "react-icons/rx";

import Logo from "../public/cake-icon.png";
import { useMenuModalStore, useOrderModalStore } from "@/hooks/useModal";

const Header = () => {
    const openMenuModal = useMenuModalStore().openModal;
    const openOrderModal = useOrderModalStore().openModal;
    return (
        <section className="flex items-center justify-between w-full p-4 fixed top-0 bg-white z-10 rounded-b-lg lg:w-4/5">
            {/* HAMBURGER AND LOGO CONTAINER  */}
            <div className="flex items-center w-full">
                <RxHamburgerMenu
                    className="text-zinc-500 font-extrabold fixed left-5 cursor-pointer md:relative"
                    size={30}
                    onClick={openMenuModal}
                />
                <div className="pl-10 flex items-center w-full justify-center md:justify-start">
                    <Image className="mr-4" width={50} src={Logo} alt="logo" />
                    <Link className="whitespace-nowrap" href={"/"}>
                        {`Molly's Specialty Sweets`}
                    </Link>
                </div>
            </div>
            {/* LOCATION AND ORDER NOW CONTAINER */}
            <div className="items-center hidden md:flex">
                <h5
                    onClick={openOrderModal}
                    className="bg-black font-bold rounded-full text-white px-10 py-2 whitespace-nowrap cursor-pointer"
                >
                    Order Now
                </h5>
            </div>
        </section>
    );
};

export default Header;
