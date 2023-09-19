import React from "react";

interface ITemplateBtn {
    children: JSX.Element;
    text: string;
    className: string;
    style?: {};
}

const TemplateBtn = (props: ITemplateBtn) => {
    return (
        <div className="mt-2 mb-2 cursor-pointer">
            <button style={props.style} className={`w-full flex items-center ${props.className}`}>
                {props.children}
                <span className="ml-2">{props.text}</span>
            </button>
        </div>
    );
};

export default TemplateBtn;
