import React, { useState } from "react";
import { GiStairsCake, GiCupcake } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import { PiCookieDuotone } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import RegisterDropdown from "./RegisterDropdown";
import useOrderTypeStore from "../hooks/useOrderTypeStore";

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const { setOrderType } = useOrderTypeStore();
    return (
        <nav id="navbar" className="pt-12 mb-20 text-center sm:text-sm">
            <div className="flex">
                <span className="w-full text-center" id="app-header-text">{`Molly's Specialty Sweets`}</span>
                <a
                    onClick={() => setDropdown(!dropdown)}
                    className="cursor-pointer hover:shadow-lg absolute flex right-2 top-2 p-2 items-center border-2 border-black rounded-xl"
                >
                    <div className="mr-4">
                        <RxHamburgerMenu size={20} />
                    </div>
                    <div>
                        <BsPersonCircle size={25} />
                    </div>
                </a>
                {dropdown && <RegisterDropdown />}
            </div>
            <div className="mt-20 w-full text-2xl flex flex-col items-center">
                <span className="underline">Choose Template</span>
                <div className="mt-10 w-full flex justify-evenly items-center text-4xl">
                    {/* 
                    TODO: If you click the icon than it selects the Order Type... 
                    This Order Type needs to be displayed inside of the react-select 'Select' element
                */}
                    <span className="cursor-pointer" onClick={(selected: any) => setOrderType(selected)}>
                        <GiStairsCake />
                    </span>
                    <span className="cursor-pointer" onClick={() => {}}>
                        <GiCupcake />
                    </span>
                    <span className="cursor-pointer" onClick={() => {}}>
                        <PiCookieDuotone />
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
