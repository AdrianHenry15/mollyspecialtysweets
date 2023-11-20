import Link from "next/link";
import React from "react";

interface IChoiceCardProps {
    children: React.ReactNode;
    title: string;
    description: string;
    link: string;
    linkTitle: string;
}

const ChoiceCard = (props: IChoiceCardProps) => {
    const link = props.title.toLowerCase().replace(" ", "-");
    return (
        <div className="flex items-start py-10 md:max-w-[300px]">
            {props.children}
            <div className="flex flex-col ml-4">
                <h5 className="font-semibold text-xl">{props.title}</h5>
                <p className="font-light text-sm py-2">{props.description}</p>
                <Link className="text-sm border-[1px] border-black py-2 px-10 rounded-full w-min whitespace-nowrap" href={link}>
                    {props.linkTitle}
                </Link>
            </div>
        </div>
    );
};

export default ChoiceCard;
