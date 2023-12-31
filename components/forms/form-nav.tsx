import Link from "next/link";
import React from "react";

interface IFormNavProps {
    icon: React.ReactNode;
    icon2: React.ReactNode;
    name: string;
    name2: string;
    link: string;
    link2: string;
}

const FormNav = (props: IFormNavProps) => {
    return (
        <div className="flex justify-evenly items-center h-64 bg-black">
            <Link href={props.link} className="flex flex-col items-center">
                {props.icon}
                <p className="text-xs text-white">{props.name}</p>
            </Link>
            <Link href={props.link2} className="flex flex-col items-center">
                {props.icon2}
                <p className="text-xs text-white">{props.name2}</p>
            </Link>
        </div>
    );
};

export default FormNav;
