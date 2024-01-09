import React from "react";

import ContactCard from "./contact-card";
import SocialsCard from "./socials-card";
import FooterMenu from "./footer-menu";
import LogoCard from "./logo-card";

import Image from "next/image";

import Logo from "@/public/mollys-logo-pink.png";
import ThirdGen from "@/public/thirdgenstudios-logo.png";
import Link from "next/link";

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
            <div className="flex flex-col items-center justify-center text-center self-center w-full border-t-[1px] py-14 text-xs border-zinc-500">
                {/* <h5 className="text-white ml-2">{"Molly's Specialty Sweets"}</h5> */}
                <div className="w-64 pb-10">
                    <Image loading="eager" src={Logo} alt="logo" />
                </div>
                <div className="flex flex-col pt-4 items-center">
                    <p className="mb-2">Created by</p>
                    {/* <h5 className="text-white">Third Generation Studios</h5> */}
                    <Link href={"thirdgenerationstudios.com"}>
                        <Image className="w-36" src={ThirdGen} alt="third-gen-logo" />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
