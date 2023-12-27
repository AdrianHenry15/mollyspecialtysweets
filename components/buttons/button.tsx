import React from "react";

interface IButtonProps {
    name: string;
    className?: string;
    icon?: React.ReactNode;
    roundedFull?: boolean;
    altColor?: boolean;
    onClick?: () => void;
    submit?: boolean;
}

const Button = (props: IButtonProps) => {
    return (
        <button
            type={props.submit ? "submit" : "button"}
            onClick={props.onClick}
            className={`${props.className} ${props.roundedFull ? "rounded-full" : "rounded-lg"} ${
                props.altColor
                    ? "text-pink-500 bg-transparent hover:text-white"
                    : "bg-pink-500 transition-all duration-300 ease-in-out hover:text-black text-white"
            } flex items-center py-2 px-6 shadow-lg`}
        >
            {props.name}
            {props.icon ? props.icon : null}
        </button>
    );
};

export default Button;
