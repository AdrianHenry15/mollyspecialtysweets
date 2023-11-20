import Link from "next/link";
import React from "react";

import { BsFacebook, BsInstagram } from "react-icons/bs";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
    return (
        <section className="flex flex-col bg-black text-white px-4 py-10 w-full md:py-0 md:pt-10">
            <div className="flex flex-col md:w-1/2 md:self-center">
                <div className="flex flex-col">
                    <h3 className="font-semibold text-xl">OUR COMPANY</h3>
                    <nav className="text-zinc-500 flex flex-wrap text-md">
                        <Link className="mr-4 my-2" href={"/story"}>
                            Our Story
                        </Link>
                        <Link className="mr-4 my-2" href={"/weddings"}>
                            Weddings
                        </Link>
                        <Link className="mr-4 my-2" href={"/birthdays"}>
                            Birthdays
                        </Link>
                        <Link className="mr-4 my-2" href={"/holidays"}>
                            Holidays
                        </Link>
                        <Link className="mr-4 my-2" href={"/parties"}>
                            Parties
                        </Link>
                        <Link className="mr-4 my-2" href={"/rewards"}>
                            Rewards
                        </Link>
                        <Link className="mr-4 my-2" href={"/faq"}>
                            Support and FAQ
                        </Link>
                    </nav>
                </div>

                <div className="flex justify-around border-b-[1px] border-zinc-600 py-10">
                    <BsFacebook size={30} />
                    <BsInstagram size={30} />
                    {/* <BsTiktok size={30} /> */}
                    {/* <BsTwitter size={30} /> */}
                    {/* <BsYoutube size={30} /> */}
                    {/* <BsLinkedin size={30} /> */}
                </div>
                <div className="flex flex-col justify-center items-center pt-12 pb-28 md:pb-10">
                    <h1 className="font-bold text-3xl text-white">{"Molly's Specialty Sweets"}</h1>
                    <div className="flex items-center text-zinc-600">
                        <BiCopyright />
                        <aside>2023. all rights reserved.</aside>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
