import React from "react";
import { MdOutlineClose } from "react-icons/md";

const LoginModal = () => {
    return (
        <div className="modalOverlay">
            <div className="modal py-10">
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
                {/* EMAIL */}
                <div className="flex flex-col">
                    <span>Email</span>
                    <input className="rounded-md py-2" type="text" />
                </div>
                <button className="w-full flex items-center bg-black text-white  mt-4">Continue With Email</button>
            </div>
        </div>
    );
};

export default LoginModal;
