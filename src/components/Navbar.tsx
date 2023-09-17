import React from "react";
import { GiStairsCake, GiCupcake } from "react-icons/gi";
import { AiFillContacts } from "react-icons/ai";
import { PiCookieDuotone } from "react-icons/pi";
import { useGlobalStore } from "../stores/GlobalStore";

const Navbar = () => {
    return (
        <nav id="navbar" className="pt-12 mb-20 text-center sm:text-sm">
            <span className="w-full text-center" id="app-header-text">{`Molly's Specialty Sweets`}</span>
            <div className="mt-10 w-full flex justify-evenly items-center text-4xl">
                <a onChange={() => {}} href={"#contact"}>
                    <AiFillContacts />
                </a>
                {/* 
                    TODO: If you click the icon than it selects the Order Type... 
                    This Order Type needs to be displayed inside of the react-select 'Select' element
                */}
                <a onChange={() => {}} href={"#cake"}>
                    <GiStairsCake />
                </a>
                <a onChange={() => {}} href={"#cupcake"}>
                    <GiCupcake />
                </a>
                <a onChange={() => {}} href={"#cookie"}>
                    <PiCookieDuotone />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
