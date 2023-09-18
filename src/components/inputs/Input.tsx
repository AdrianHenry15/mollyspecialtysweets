import React from "react";

interface IInputProps {
    value: string;
    onChange: (e: any) => void;
    placeholder: string;
}

const Input = (props: IInputProps) => {
    return (
        <input
            value={props.value}
            onChange={props.onChange}
            className="form-input"
            placeholder={props.placeholder}
            style={{ minHeight: "38px" }}
            type="text"
        />
    );
};

export default Input;
