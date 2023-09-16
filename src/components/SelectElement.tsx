import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import "./SelectElement.css";

interface ISelectElementProps {
    isMulti?: boolean;
}

const SelectElement = (props: ISelectElementProps) => {
    const [cake, setCake] = useState(false);
    const [cupcake, setCupcake] = useState(false);
    const [cookie, setCookie] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const selectCakeOption = () => {
        setCake(true);
        setDropdown(false);
    };
    const deselectCakeOption = () => {
        setCake(false);
        setDropdown(false);
    };
    const selectCupcakeOption = () => {
        setCupcake(true);
        setDropdown(false);
    };
    const deselectCupcakeOption = () => {
        setCupcake(false);
        setDropdown(false);
    };
    const selectCookieOption = () => {
        setCookie(true);
        setDropdown(false);
    };
    const deselectCookieOption = () => {
        setCookie(false);
        setDropdown(false);
    };

    return (
        <div>
            <div className="flex px-2 w-80 h-12 bg-white border-2 border-black items-center justify-between">
                <div className="flex">
                    {/* CAKE */}
                    <div onClick={() => deselectCakeOption()} style={!cake ? { display: "none" } : {}} className="se-option-container">
                        <span className="se-selected-option-text">{cake ? "Cake" : ""}</span>
                        <div className="se-close-btn-container">
                            <AiOutlineClose size={12} />
                        </div>
                    </div>
                    {/* CUPCAKE */}
                    <div
                        onClick={() => deselectCupcakeOption()}
                        style={!cupcake ? { display: "none" } : {}}
                        className="se-option-container"
                    >
                        <span className="se-selected-option-text">{cupcake ? "Cupcake" : ""}</span>
                        <div className="se-close-btn-container">
                            <AiOutlineClose size={12} />
                        </div>
                    </div>
                    {/* COOKIE */}
                    <div onClick={() => deselectCookieOption()} style={!cookie ? { display: "none" } : {}} className="se-option-container">
                        <span className="se-selected-option-text">{cookie ? "Cookie" : ""}</span>
                        <div className="se-close-btn-container">
                            <AiOutlineClose size={12} />
                        </div>
                    </div>
                </div>
                <BiChevronDown onClick={() => setDropdown(!dropdown)} size={20} />
            </div>
            {dropdown && (
                <div className="flex flex-col bg-white border-x-2 border-b-2 border-black">
                    {!cake && (
                        <span onClick={() => selectCakeOption()} className="p-2 hover:bg-sky-600">
                            Cake
                        </span>
                    )}
                    {!cupcake && (
                        <span onClick={() => selectCupcakeOption()} className="p-2 hover:bg-sky-600">
                            Cupcake
                        </span>
                    )}
                    {!cookie && (
                        <span onClick={() => selectCookieOption()} className="p-2 hover:bg-sky-600">
                            Cookie
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectElement;
