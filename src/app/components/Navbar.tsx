import React from "react";
import { GiStairsCake, GiCupcake } from "react-icons/gi";
import { AiFillContacts } from "react-icons/ai";
import { PiCookieDuotone } from "react-icons/pi";
import Link from "next/link";
import { useGlobalStore } from "../_stores/GlobalStore";

const Navbar = () => {
    const { orderType, setOrderType } = useGlobalStore().orderTypeStore;

    // const selectOrderType = (type: "Cake" | "Cupcakes" | "Cookies") => {
    //     if (orderType?.some((selected) => selected.value === type)) setOrderType([{ value: `${type.toLowerCase()}`, label: type }]);
    // };
    return (
        <nav id="navbar" className="pt-12 mb-20 text-center sm:text-sm">
            <span className="w-full text-center" id="app-header-text">{`Molly's Specialty Sweets`}</span>
            <div className="mt-10 w-full flex justify-evenly items-center text-4xl">
                <Link href={"#contact"} replace>
                    <AiFillContacts />
                </Link>
                {/* 
                    TODO: If you click the icon than it selects the Order Type... 
                    This Order Type needs to be displayed inside of the react-select 'Select' element
                */}
                <Link onChange={(selected: any) => setOrderType(selected)} href={"#cake"} replace>
                    <GiStairsCake />
                </Link>
                <Link href={"#cupcake"} replace>
                    <GiCupcake />
                </Link>
                <Link href={"#cookie"} replace>
                    <PiCookieDuotone />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
