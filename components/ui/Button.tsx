import Link from "next/link";
import React from "react";

interface IButtonProps {
    text: string;
    isLink: boolean;
    path?: string;
    containerClass?: string;
    onClick?: () => void;
    btnClass?: string;
}

const Button = (props: IButtonProps) => {
    return (
        <div onClick={props.onClick} className={`${props.containerClass} flex bottom-0 justify-center w-full`}>
            {props.isLink && (
                <Link
                    className={`${props.btnClass} flex justify-center bg-black py-[10px] w-64 rounded-full shadow-lg`}
                    href={props.path!}
                    legacyBehavior
                >
                    {props.text}
                </Link>
            )}
            {!props.isLink && (
                <div className={`${props.btnClass} flex justify-center bg-black py-[10px] w-64 rounded-full shadow-lg`}>
                    <button>
                        <h5 className="text-white font-bold flex text-xs">{props.text}</h5>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Button;
