import React from "react";
import Link from "next/link";

import { MdCopyright } from "react-icons/md";

import ContactCard from "./contact-card";
import SocialsCard from "./socials-card";
import FooterMenu from "./footer-menu";
import LogoCard from "./logo-card";
import PoweredBy from "./powered-by";

const Footer = () => {
    return (
        // FULL CONTAINER
        <footer className="w-full bg-black text-white flex flex-col justify-center p-4 pb-10">
            {/* FOOTER MENU */}
            <div className="flex flex-col self-center w-full md:flex-row md:py-2">
                <LogoCard />
                <div className="flex flex-col md:flex-row md:w-1/2 md:self-center">
                    <FooterMenu />
                    <ContactCard />
                </div>
            </div>
            {/* SOCIALS  */}
            <SocialsCard />
            {/* Powered By */}
            <PoweredBy />
            {/* CREATED BY */}
            <div className="flex flex-col items-center justify-center text-center self-center w-full border-t-[1px] py-14 text-xs border-zinc-900">
                {/* THIRDGEN LOGO */}
                <div className="flex flex-col items-center">
                    <p className="text-xs text-white">Created by</p>
                    {/* THIRD GEN LOGO */}
                    <Link className="flex items-center" target="_blank" href={"https://www.thirdgenerationstudios.com/"}>
                        <MdCopyright size={12} className="mb-2 mr-1 text-zinc-700" />
                        <p className="text-zinc-500">Third Generation Studios</p>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
