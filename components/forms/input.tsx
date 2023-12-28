import React from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
    className: string;
    onClick: () => void;
    type: string;
    placeholder?: string;
    register: (options?: RegisterOptions) => UseFormRegisterReturn;
    required?: boolean;
    pattern?: RegExp;
}

const Input = (props: IInputProps) => {
    return (
        <input
            className={props.className}
            onClick={props.onClick}
            type={props.type}
            placeholder={props.placeholder}
            {...props.register({
                required: props.required || false,
                pattern: props.pattern || undefined,
            })}
        />
    );
};

export default Input;
