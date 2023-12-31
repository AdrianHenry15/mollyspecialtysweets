import React from "react";

interface IFormContainerProps {
    children: React.ReactNode;
    title: string;
    className?: string;
    inputLabel?: string;
    paddingBottom?: boolean;
}

const FormContainer = (props: IFormContainerProps) => {
    return (
        <div className="flex flex-col ">
            <h5 className="flex font-semibold text-xl w-full justify-start">{`Choose ${props.title}:`}</h5>
            <div className="w-full">
                <label className="absolute text-xs text-gray-400 flex bg-white ml-2" htmlFor={props.inputLabel}>
                    {props.inputLabel}
                </label>
            </div>
            <div className={`${props.className} ${props.paddingBottom ? "pb-10" : ""} flex justify-evenly pt-2`}>
                {/* SIZE */}
                {props.children}
            </div>
        </div>
    );
};

export default FormContainer;
