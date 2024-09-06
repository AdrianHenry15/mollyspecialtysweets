import Link from "next/link";
import React from "react";

import { AiOutlineInstagram } from "react-icons/ai";

const SocialsCard = () => {
    return (
        <div className="flex flex-col w-full justify-center py-10 border-t-[1px] border-zinc-900">
            <h5 className="text-white flex justify-center items-center italic mb-10">Connect With Us</h5>
            <Link
                className="flex justify-center items-center w-full"
                target="_blank"
                href="https://www.instagram.com/mollyspecialtysweets/"
            >
                <AiOutlineInstagram className="flex hover:scale-125 transition-all duration-300 ease-in-out" size={25} />
            </Link>
        </div>
    );
};

export default SocialsCard;
