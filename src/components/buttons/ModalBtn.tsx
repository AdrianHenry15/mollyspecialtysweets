import React from "react";

interface IModalBtn {
    children: JSX.Element;
    href: string;
    text: string;
}

const ModalBtn = (props: IModalBtn) => {
    return (
        <a className="mt-2 mb-2" href={props.href}>
            <button style={{ border: "1px solid gray" }} className="w-full flex items-center bg-white text-black">
                {props.children}
                <span className="ml-2">{props.text}</span>
            </button>
        </a>
    );
};

export default ModalBtn;
