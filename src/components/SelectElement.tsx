import React from "react";

interface ISelectElementProps {
    isMulti?: boolean;
}

const SelectElement = () => {
    return (
        <div className="flex px-2 w-80 h-10 bg-white border-2 border-black items-center justify-start text-start">
            <span className="">stuff</span>
        </div>
    );
};

export default SelectElement;
