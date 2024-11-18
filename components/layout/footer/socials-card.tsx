import Link from "next/link";
import React from "react";

import { AiOutlineInstagram } from "react-icons/ai";

const SocialsCard = () => {
    return (
        <div className="flex flex-col w-full justify-around items-center py-10 border-t-[1px] border-zinc-900">
            {/* <Link target="_blank" href="">
                <AiFillFacebook size={35} />
            </Link> */}
            <h5 className="italic text-white mb-10">Connect With Us:</h5>
            <Link target="_blank" href="https://www.instagram.com/mollyspecialtysweets/">
                <AiOutlineInstagram className="hover:scale-125 transition-all duration-300 ease-in-out" size={35} />
            </Link>
        </div>
    );
};

export default SocialsCard;
