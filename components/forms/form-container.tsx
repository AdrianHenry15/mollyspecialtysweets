import React from "react";

interface IFormContainerProps {
    children: React.ReactNode;
    title: string;
    className?: string;
    inputLabel?: string;
}

const FormContainer = (props: IFormContainerProps) => {
    return (
        <div className="flex flex-col ">
            <h5 className="flex font-semibold text-xl w-full justify-start">{`Choose ${props.title}:`}</h5>
            <div className="w-full">
                <label className="absolute text-xs text-gray-400 flex mt-[31px] bg-white ml-2" htmlFor={props.inputLabel}>
                    {props.inputLabel}
                </label>
            </div>
            <div className={`${props.className} flex justify-evenly py-10`}>
                {/* SIZE */}
                {props.children}
            </div>
        </div>
    );
};

export default FormContainer;
