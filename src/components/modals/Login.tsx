import React from "react";
import { MdOutlineClose } from "react-icons/md";
import ModalInput from "../inputs/ModalInput";
import { AiFillApple } from "react-icons/ai";
import Facebook from "../../assets/facebook.png";
import Google from "../../assets/google.png";
import ModalBtn from "../buttons/ModalBtn";
import Logo from "../../assets/pastry.png";
import useModalStore from "../../hooks/useModalStore";

const LoginModal = () => {
    const { setLoginModal, setSignUpModal } = useModalStore();

    const setModal = () => {
        setLoginModal(false);
        setSignUpModal(true);
    };
    return (
        <div className="modalOverlay">
            <div className="modal py-10">
                {/* HEADER */}
                <div className="border-b-2 border-slate-200 flex items-center justify-between pb-2">
                    <div onClick={() => setLoginModal(false)} className="cursor-pointer">
                        <MdOutlineClose />
                    </div>
                    <h1 style={{ marginRight: "205px" }}>Log in</h1>
                </div>
                {/* WELCOME */}
                <div className="py-6 flex flex-col items-center">
                    <img src={Logo} alt="logo" width={32} />
                    <h2>{`Welcome to Molly's Specialty Sweets`}</h2>
                </div>
                {/* EMAIL */}
                <ModalInput text="Email" onChange={() => {}} />
                {/* PASSWORD */}
                <ModalInput text="Password" onChange={() => {}} />
                <span
                    style={{
                        marginTop: "274px",
                        marginLeft: "200px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        color: "gray",
                        fontSize: "14px",
                    }}
                    className="absolute bg-white"
                >
                    or
                </span>
                <hr className="my-8" />
                {/* APPLE */}
                <ModalBtn href="" text="Continue with Apple">
                    <AiFillApple size={20} />
                </ModalBtn>
                {/* FACEBOOK */}
                <ModalBtn href="" text="Continue with Facebook">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={Facebook} alt="facebook-icon" width={20} />
                </ModalBtn>
                {/* GOOGLE */}
                <ModalBtn href="" text="Continue with Facebook">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={Google} alt="facebook-icon" width={20} />
                </ModalBtn>
                {/* SIGN UP */}
                <div className="text-xs mt-6">
                    <span className="text-slate-500">Are you new here?</span>
                    <span onClick={() => setModal()} className="text-sky-700 cursor-pointer">
                        {" "}
                        Get Started
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;