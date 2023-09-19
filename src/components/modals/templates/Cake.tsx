import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { AiFillApple } from "react-icons/ai";
import { LuCakeSlice } from "react-icons/lu";
import { GiStairsCake, GiCupcake } from "react-icons/gi";
import { BsPersonCircle } from "react-icons/bs";
import { PiCookieDuotone } from "react-icons/pi";
import ModalBtn from "../../buttons/ModalBtn";
import useModalStore from "../../../hooks/useModalStore";
import Logo from "../../../assets/pastry.png";
import Facebook from "../../../assets/facebook.png";
import Google from "../../../assets/google.png";
import TemplateBtn from "../../buttons/TemplateBtn";

const CakeModal = () => {
    const { setCakeModal, setCupcakeModal, setCookieModal } = useModalStore();

    const setModal = (type: "Cupcake" | "Cookie") => {
        if (type === "Cupcake") {
            setCupcakeModal(true);
            setCookieModal(false);
        } else {
            setCupcakeModal(false);
            setCookieModal(true);
        }
    };
    return (
        <div className="modalOverlay">
            <div className="modal py-10">
                {/* HEADER */}
                <div className="border-b-2 border-slate-200 flex items-center justify-between pb-2">
                    <div onClick={() => setCakeModal(false)} className="cursor-pointer">
                        <MdOutlineClose />
                    </div>
                    <h1 style={{ marginRight: "150px" }}>Choose a Cake Template</h1>
                </div>
                {/* WELCOME */}
                <div className="py-6 flex flex-col items-center">
                    {/* <img src={Logo} alt="logo" width={32} /> */}
                    <GiStairsCake size={32} />
                    {/* <h2>{`Welcome to Molly's Specialty Sweets`}</h2> */}
                </div>
                {/* EMAIL */}
                <TemplateBtn className="bg-amber-100" text="Vanilla">
                    <LuCakeSlice size={20} />
                </TemplateBtn>
                {/* APPLE */}
                <ModalBtn href="" text="Continue with Apple">
                    <AiFillApple size={20} />
                </ModalBtn>
                {/* FACEBOOK */}
                <ModalBtn href="" text="Continue with Facebook">
                    <img src={Facebook} alt="facebook-icon" width={20} />
                </ModalBtn>
                {/* GOOGLE */}
                <ModalBtn href="" text="Continue with Facebook">
                    <img src={Google} alt="facebook-icon" width={20} />
                </ModalBtn>
                {/* SIGN UP */}
                <div className="text-xs mt-6">
                    <span className="text-slate-500">Would you like a different treat?</span>
                    {/* <span onClick={() => {}} className="text-sky-700 cursor-pointer">
                        {" "}
                        Log in
                    </span> */}
                </div>
            </div>
        </div>
    );
};

export default CakeModal;
