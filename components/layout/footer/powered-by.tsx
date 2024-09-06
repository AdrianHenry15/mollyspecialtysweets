import Link from "next/link";
import React from "react";

import { SiClerk } from "react-icons/si";
import { CgSquare } from "react-icons/cg";

const PoweredBy = () => {
    return (
        <div className="flex flex-col w-full justify-center py-10 border-t-[1px] border-zinc-900">
            <h5 className="italic text-sm text-white flex items-center justify-center mb-10">Powered By:</h5>
            <div className="flex items-center justify-around w-full">
                <Link target="_blank" href="clerk.com">
                    <SiClerk className="hover:scale-125 transition-all duration-300 ease-in-out" size={25} />
                </Link>
                <Link target="_blank" href="square.com">
                    <CgSquare className="hover:scale-125 transition-all duration-300 ease-in-out" size={35} />
                </Link>
            </div>
        </div>
    );
};

export default PoweredBy;
