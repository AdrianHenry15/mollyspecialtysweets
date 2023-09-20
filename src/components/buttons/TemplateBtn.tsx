import React from "react";
import { LuCakeSlice } from "react-icons/lu";
import { GiCupcake } from "react-icons/gi";
import { SiCookiecutter } from "react-icons/si";

interface ITemplateBtn {
    text: string;
    className: string;
    template: "Cake" | "Cupcake" | "Cookie";
    onClick: () => void;
    style?: {};
}

const TemplateBtn = (props: ITemplateBtn) => {
    const getIcon = () => {
        if (props.template === "Cake") {
            return <LuCakeSlice size={20} />;
        } else if (props.template === "Cupcake") {
            return <GiCupcake size={20} />;
        } else {
            return <SiCookiecutter size={20} />;
        }
    };

    return (
        <div onClick={props.onClick} className="mt-2 mb-2 cursor-pointer">
            <button style={props.style} className={`w-full flex items-center ${props.className}`}>
                {getIcon()}
                <span className="ml-2">{props.text}</span>
            </button>
        </div>
    );
};

export default TemplateBtn;
