"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { NavMenuItems } from "../../../lib/constants";
import { NavMenu } from "../../../lib/types";
import Button from "@/components/buttons/button";

export default function MobileMenu() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const openMobileMenu = () => setIsOpen(true);
    const closeMobileMenu = () => setIsOpen(false);

    return (
        <div className="relative">
            <button
                onClick={openMobileMenu}
                aria-label="Open mobile menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-black transition-colors overflow-hidden lg:hidden"
            >
                <Bars3Icon className="h-6 text-black" />
            </button>
            <Transition show={isOpen}>
                <Dialog onClose={closeMobileMenu} className="relative z-50">
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="opacity-0 backdrop-blur-none"
                        enterTo="opacity-100 backdrop-blur-[.5px]"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="opacity-100 backdrop-blur-[.5px]"
                        leaveTo="opacity-0 backdrop-blur-none"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="translate-x-[100%]"
                        enterTo="translate-x-[0%]"
                        leave="transition-all ease-in-out duration-300"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-[-100%]"
                    >
                        <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full flex-col bg-white pb-6 w-full">
                            <div className="p-4">
                                <button
                                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-md text-black transition-colors"
                                    onClick={closeMobileMenu}
                                    aria-label="Close mobile menu"
                                >
                                    <XMarkIcon className="h-6" />
                                </button>

                                <ul className="flex w-full flex-col h-full">
                                    {NavMenuItems.map((item: NavMenu) => (
                                        <Link
                                            key={item.title}
                                            href={item.link}
                                            onClick={closeMobileMenu}
                                            className={`${pathname === item.link ? "underline" : ""}`}
                                        >
                                            <li className={`py-4 text-xl text-black transition-colors hover:text-neutral-500`}>
                                                {item.title}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                            {/* NAV BUTTONS */}
                            <ul className="bottom-0 mb-36 fixed flex flex-col self-center w-full">
                                <Link onClick={closeMobileMenu} className="w-full px-10 flex justify-center" href={"/contact-us"}>
                                    <Button
                                        roundedFull
                                        className="mb-4 w-full py-4 flex justify-center md:w-1/2"
                                        name="Contact Us"
                                        altColor
                                    />
                                </Link>
                                <Link onClick={closeMobileMenu} className="w-full px-10 flex justify-center" href={"/estimate"}>
                                    <Button
                                        roundedFull
                                        className="mb-4 w-full py-4 flex justify-center md:w-1/2"
                                        name="Get Your Free Estimate"
                                    />
                                </Link>
                            </ul>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    );
}
