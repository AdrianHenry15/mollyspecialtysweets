import React, { useState } from "react";
import { GiStairsCake, GiCupcake } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import { PiCookieDuotone } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import RegisterDropdown from "./RegisterDropdown";
import useOrderTypeStore from "../hooks/useOrderTypeStore";
import useModalStore from "../hooks/useModalStore";

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const { setCakeModal, setCupcakeModal, setCookieModal } = useModalStore();
    return (
        <nav id="navbar" className="pt-12 mb-20 text-center sm:text-sm">
            <div className="flex">
                {/* TITLE */}
                <span className="w-full text-center" id="app-header-text">{`Molly's Specialty Sweets`}</span>
                {/* REGISTER */}
                {/* <a
                    onClick={() => setDropdown(!dropdown)}
                    className="cursor-pointer hover:shadow-lg absolute flex right-0 top-2 p-2 items-center border-2 border-black rounded-xl"
                >
                    <div className="mr-4">
                        <RxHamburgerMenu size={20} />
                    </div>
                    <div>
                        <BsPersonCircle size={25} />
                    </div>
                </a>
                {dropdown && <RegisterDropdown />} */}
            </div>
            <div className="mt-20 w-full text-2xl flex flex-col items-center">
                <span className="underline">Choose Template</span>
                <div className="mt-10 w-full flex justify-evenly items-center text-4xl">
                    {/* TODO: These icons activate a modal with choices for the cake that the user wants */}
                    <span className="cursor-pointer" onClick={() => setCakeModal(true)}>
                        <GiStairsCake />
                    </span>
                    <span className="cursor-pointer" onClick={() => setCupcakeModal(true)}>
                        <GiCupcake />
                    </span>
                    <span className="cursor-pointer" onClick={() => setCookieModal(true)}>
                        <PiCookieDuotone />
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
