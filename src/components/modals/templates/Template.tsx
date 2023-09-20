import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { GiStairsCake, GiCupcake } from "react-icons/gi";
import useModalStore from "../../../hooks/useModalStore";
import TemplateBtn from "../../buttons/TemplateBtn";
import { SiCookiecutter } from "react-icons/si";
import useOrderTypeStore from "../../../hooks/useOrderTypeStore";

interface ITemplateProps {
    template: "Cake" | "Cupcake" | "Cookie";
    children: React.ReactNode;
}

const Template = (props: ITemplateProps) => {
    const { setCakeModal, setCupcakeModal, setCookieModal } = useModalStore();
    const { setCakeType, setCupcakeType, setCookieType } = useOrderTypeStore();

    const setModal = (template: "Cake" | "Cupcake" | "Cookie") => {
        if (template === "Cake") {
            setCakeModal(true);
            setCupcakeModal(false);
            setCookieModal(false);
        } else if (template === "Cupcake") {
            setCakeModal(false);
            setCupcakeModal(true);
            setCookieModal(false);
        } else {
            setCakeModal(false);
            setCupcakeModal(false);
            setCookieModal(true);
        }
    };

    const renderIcons = () => {
        if (props.template === "Cake") {
            return (
                <div className="text-xs mt-6 flex items-center justify-center">
                    <span className="text-slate-500">Would you like a different treat?</span>
                    <div onClick={() => setModal("Cupcake")} className="ml-2 text-gray-700 cursor-pointer">
                        <GiCupcake size={25} />
                    </div>
                    <div onClick={() => setModal("Cookie")} className="ml-2 text-gray-700 cursor-pointer">
                        <SiCookiecutter size={20} />
                    </div>
                </div>
            );
        } else if (props.template === "Cupcake") {
            return (
                <div className="text-xs mt-6 flex items-center justify-center">
                    <span className="text-slate-500">Would you like a different treat?</span>
                    <div onClick={() => setModal("Cake")} className="ml-2 text-gray-700 cursor-pointer">
                        <GiStairsCake size={25} />
                    </div>
                    <div onClick={() => setModal("Cookie")} className="ml-2 text-gray-700 cursor-pointer">
                        <SiCookiecutter size={20} />
                    </div>
                </div>
            );
        } else if (props.template === "Cookie") {
            return (
                <div className="text-xs mt-6 flex items-center justify-center">
                    <span className="text-slate-500">Would you like a different treat?</span>
                    <div onClick={() => setModal("Cupcake")} className="ml-2 text-gray-700 cursor-pointer">
                        <GiCupcake size={25} />
                    </div>
                    <div onClick={() => setModal("Cake")} className="ml-2 text-gray-700 cursor-pointer">
                        <GiStairsCake size={20} />
                    </div>
                </div>
            );
        } else {
            <div></div>;
        }
    };

    const renderHeaderIcon = () => {
        if (props.template === "Cake") {
            return <GiStairsCake size={32} />;
        } else if (props.template === "Cupcake") {
            return <GiCupcake size={32} />;
        } else if (props.template === "Cookie") {
            return <SiCookiecutter size={32} />;
        } else {
            return <div></div>;
        }
    };

    const closeModal = () => {
        if (props.template === "Cake") {
            setCakeModal(false);
            setCakeType(false);
        } else if (props.template === "Cupcake") {
            setCupcakeModal(false);
            setCupcakeType(false);
        } else {
            setCookieModal(false);
            setCookieType(false);
        }
    };

    const submitFlavor = () => {
        if (props.template === "Cake") {
            setCakeType(true);
            setCakeModal(false);
        } else if (props.template === "Cupcake") {
            setCupcakeType(true);
            setCupcakeModal(false);
        } else {
            setCookieType(true);
            setCookieModal(false);
        }
    };
    return (
        <div className="modalOverlay">
            <div className="modal py-10">
                {/* HEADER */}
                <div className="border-b-2 border-slate-200 flex items-center justify-center pb-2 w-full">
                    <div style={{}} onClick={() => closeModal()} className="cursor-pointer">
                        <MdOutlineClose />
                    </div>
                    <h1 className="flex flex-3 items-center w-full text-center justify-center mr-4">{`Choose a ${props.template} Template`}</h1>
                </div>
                {/* WELCOME */}
                <div className="py-6 flex flex-col items-center">{renderHeaderIcon()}</div>
                <div className="pb-2">{props.children}</div>
                <hr className="pt-2" />
                {/* THIS JUMPS TO THE BEGINNING OF SELECTED ORDER FORM */}
                <a href={`#${props.template.toLowerCase()}`}>
                    <TemplateBtn text="Submit" className={"bg-black text-white"} template={props.template} onClick={() => submitFlavor()} />
                </a>

                {/* SIGN UP */}
                {renderIcons()}
            </div>
        </div>
    );
};

export default Template;
