import React from "react";
import { MdOutlineClose } from "react-icons/md";

const LoginModal = () => {
    return (
        <div className="modalOverlay">
            <div className="modal">
                {/* HEADER */}
                <div className="border-b-2 border-slate-200 flex items-center justify-between pb-2">
                    <div className="">
                        <MdOutlineClose />
                    </div>
                    <h1 className="mr-40">Log in or sign up</h1>
                </div>
                {/* WELCOME */}
                <div className="py-6">
                    <h2>{`Welcome to Molly's Specialty Sweets`}</h2>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
