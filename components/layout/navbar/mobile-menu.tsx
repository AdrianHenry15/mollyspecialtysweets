"use client";

import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { BsCake } from "react-icons/bs";
import { GiCupcake } from "react-icons/gi";

import PopoverPanelItem from "./popover-panel-item";
import { FaCookieBite } from "react-icons/fa6";
import UserIcon from "./user-icon/user-icon";

const MobileMenu = () => {
    return (
        <div className="top-16 w-full max-w-sm px-4">
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`
                    ${open ? "text-white" : "text-white/90"}
                    group inline-flex items-center px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                        >
                            <Bars3Icon className="h-6 text-black" />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-[100] mt-1 w-screen max-w-sm -translate-x-[351px] translate-y-[0px] transform ml-7">
                                <div className="flex flex-col relative shadow-lg rounded-lg bg-zinc-200 pt-4">
                                    <div className="flex justify-center">
                                        <UserIcon />
                                    </div>
                                    <div className="flex flex-col border-y-2 bg-gray-100 border-white pt-2 mt-4">
                                        <PopoverPanelItem
                                            onClick={close}
                                            icon={<BsCake size={25} />}
                                            page={{
                                                title: "Create A Cake",
                                                link: "/order/cakes",
                                            }}
                                            description={"Your Custom Cakes"}
                                        />
                                        <PopoverPanelItem
                                            onClick={close}
                                            icon={<GiCupcake size={25} />}
                                            page={{
                                                title: "Order Cupcakes",
                                                link: "/order/cupcakes",
                                            }}
                                            description={"Order Cupcakes Here"}
                                        />
                                        <PopoverPanelItem
                                            onClick={close}
                                            icon={<FaCookieBite size={25} />}
                                            page={{
                                                title: "Order Cookies",
                                                link: "/order/cookies",
                                            }}
                                            description={"Order Cookies Here"}
                                        />
                                    </div>
                                    {/* POPOVER FOOTER */}
                                    <div className="px-4 py-6  rounded-b-lg flex justify-evenly">
                                        {/* CONTACT US BUTTON */}
                                        <Link
                                            onClick={close}
                                            className="bg-pink-500/90 px-10 py-2 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out"
                                            href={"/contact-us"}
                                        >
                                            <h5 className="hover:text-white transition-colors duration-300 ease-in-out">Contact Us</h5>
                                        </Link>
                                        {/* ESTIMATE BUTTON */}
                                        <Link
                                            onClick={close}
                                            className="bg-pink-500/90 px-10 py-2 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out"
                                            href={"/estimate"}
                                        >
                                            <h5 className="hover:text-white transition-colors duration-300 ease-in-out">Estimate</h5>
                                        </Link>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default MobileMenu;
