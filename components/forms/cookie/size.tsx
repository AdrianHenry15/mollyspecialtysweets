import React from "react";
import { Controller } from "react-hook-form";

import { SiCookiecutter } from "react-icons/si";

import FormContainer from "../form-container";

interface ICookieAmountProps {
    setMini: (isMini: boolean) => void;
    isMini: boolean;
    control: any;
}

const CookieSize = (props: ICookieAmountProps) => {
    const AmountClass = "border-black border-2 p-6 rounded-xl shadow-md shadow-pink-100 transition-color duration-300 ease-in-out";
    return (
        <FormContainer title="Cookie Size">
            {/* SINGLE */}
            <Controller
                name="mini"
                control={props.control}
                render={({ field }) => (
                    <div className="flex flex-col items-center" onClick={() => props.setMini(true)} {...field}>
                        <SiCookiecutter className={`${props.isMini ? "bg-pink-300" : "bg-transparent"} ${AmountClass} p-14`} size={150} />
                        <p className="text-xs mt-2">Mini</p>
                    </div>
                )}
            />
            {/* MULTIPLE */}
            <Controller
                name="regular"
                control={props.control}
                render={({ field }) => (
                    <div className="flex flex-col items-center" onClick={() => props.setMini(false)} {...field}>
                        <SiCookiecutter className={`${!props.isMini ? "bg-pink-300" : "bg-transparent"} ${AmountClass}`} size={150} />
                        <p className="text-xs mt-2">Regular</p>
                    </div>
                )}
            />
        </FormContainer>
    );
};

export default CookieSize;
