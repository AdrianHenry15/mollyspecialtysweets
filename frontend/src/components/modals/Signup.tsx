import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { AiFillApple } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import Facebook from "../../assets/facebook.png";
import Google from "../../assets/google.png";
import ModalBtn from "../buttons/ModalBtn";
import Logo from "../../assets/pastry.png";
import useModalStore from "../../hooks/useModalStore";

const SignUpModal = () => {
    const { setLoginModal, setSignUpModal } = useModalStore();

    const setModal = () => {
        setLoginModal(true);
        setSignUpModal(false);
    };
    return (
        <div className="modalOverlay">
            <div className="modal py-10">
                {/* HEADER */}
                <div className="border-b-2 border-slate-200 flex items-center justify-between pb-2">
                    <div onClick={() => setSignUpModal(false)} className="cursor-pointer">
                        <MdOutlineClose />
                    </div>
                    <h1 style={{ marginRight: "205px" }}>Sign Up</h1>
                </div>
                {/* WELCOME */}
                <div className="py-6 flex flex-col items-center">
                    <img src={Logo} alt="logo" width={32} />
                    <h2>{`Welcome to Molly's Specialty Sweets`}</h2>
                </div>
                {/* EMAIL */}
                <ModalBtn href="" text="Continue with Apple">
                    <GoMail size={20} />
                </ModalBtn>
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
                    <span className="text-slate-500">Already have an account?</span>
                    <span onClick={() => setModal()} className="text-sky-700 cursor-pointer">
                        {" "}
                        Log in
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal;
