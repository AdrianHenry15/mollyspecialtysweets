import React from "react";

interface IModalInputProps {
    text: string;
    onChange: () => void;
}

const ModalInput = (props: IModalInputProps) => {
    return (
        <div className="flex flex-col mb-2">
            <span>{props.text}</span>
            <input className="rounded-md py-2" type="text" onChange={props.onChange} />
        </div>
    );
};

export default ModalInput;
