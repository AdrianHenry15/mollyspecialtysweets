import React from "react";

const RegisterDropdown = () => {
    return (
        <div className="absolute top-16 right-2 flex flex-col bg-white border-2 border-black rounded-xl py-2 items-start justify-start">
            <span className="flex pr-40 mx-4 my-4 cursor-pointer hover:underline">Sign Up</span>
            <span className="flex pr-40 mx-4 my-4 cursor-pointer hover:underline">Login</span>
        </div>
    );
};

export default RegisterDropdown;
