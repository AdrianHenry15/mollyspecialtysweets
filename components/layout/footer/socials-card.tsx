import Link from "next/link";
import React from "react";

import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";

const SocialsCard = () => {
    return (
        <div className="flex w-full justify-around py-10 border-t-[1px] border-zinc-900">
            {/* <Link target="_blank" href="">
                <AiFillFacebook size={35} />
            </Link> */}
            <Link target="_blank" href="">
                <AiOutlineInstagram size={35} />
            </Link>
        </div>
    );
};

export default SocialsCard;
