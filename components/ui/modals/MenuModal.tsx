"use client";

import React, { useContext, useEffect, useRef } from "react";
import Link from "next/link";

import ModalContainer from "./ModalContainer";
import { useMenuModalStore } from "@/hooks/useModal";

import { AiOutlineClose, AiOutlineYoutube } from "react-icons/ai";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { BsTwitter, BsTiktok } from "react-icons/bs";

const pages = ["Home", "Order", "Rewards", "Our Story"];
const altPages = ["Weddings", "Birthdays", "Holidays", "Parties", "Rewards"];

const MainModal = () => {
    const { isOpen, closeModal } = useMenuModalStore();
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Tailwind Styles
    const borderBottom = "border-b-[1px] border-opacity-50 border-zinc-500";

    // if you click outside of the modal the modal closes
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, closeModal]);

    if (isOpen) {
        return (
            <ModalContainer>
                <div
                    ref={modalRef}
                    className="flex flex-col h-screen bg-black text-white overflow-y-scroll p-6 w-9/12 sm:w-[275px]"
                    id="menu-modal"
                >
                    {/* MODAL HEADER  */}
                    <div className={`flex items-center justify-between pb-2 ${borderBottom}`}>
                        <AiOutlineClose className="cursor-pointer" onClick={closeModal} />
                        <Link className="font=bold text-zinc-500" href={"/account"}>
                            Sign In
                        </Link>
                    </div>
                    {/* MODAL NAV */}
                    <div className={`flex flex-col font-semibold text-xl ${borderBottom}`}>
                        {pages.map((value, index) => {
                            const link = value === "Gifting" ? "gifts" : value.toLowerCase().replace(" ", "-");
                            return (
                                <Link key={index} className="my-4" href={`/${link}`}>
                                    {value}
                                </Link>
                            );
                        })}
                    </div>
                    {/* SOCIAL MEDIA */}
                    <div className={`flex justify-evenly w-full py-4 ${borderBottom}`}>
                        <SiFacebook size={25} />
                        {/* <BsTwitter size={25} /> */}
                        <SiInstagram size={25} />
                        {/* <BsTiktok size={25} /> */}
                        {/* <AiOutlineYoutube size={25} /> */}
                    </div>
                    {/* ALT PAGES */}
                    <div className={`flex flex-col font-light text-md text-zinc-500 ${borderBottom}`}>
                        {altPages.map((value, index) => {
                            const link = value === "Gifting" ? "gifts" : value.toLowerCase().replace(" ", "-");
                            return (
                                <Link key={index} className="my-4" href={`/${link}`}>
                                    {value}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </ModalContainer>
        );
    } else {
        return <div></div>;
    }
};

export default MainModal;
