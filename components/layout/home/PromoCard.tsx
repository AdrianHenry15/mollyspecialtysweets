import Link from "next/link";
import React from "react";

interface IPromoCardProps {
    title: string;
    titleAlt: string;
    description: string;
    link: string;
    linkText: string;
}

const PromoCard = (props: IPromoCardProps) => {
    return (
        <div className="z-50 self-center items-center flex justify-center text-center rounded-xl bg-white/75 py-4 w-full mx-4 md:w-1/3 md:px-36 md:py-24">
            <div className="flex self-center flex-col items-center justify-center">
                <h1 className="text-5xl uppercase font-bold text-pink-500 tracking-wide">{props.titleAlt}</h1>
                <h1 className="text-4xl uppercase font-bold">{props.title}</h1>
                <p className="my-10 text-lg">{props.description}</p>
                <Link className="bg-black px-10 text-sm py-2 text-white rounded-2xl" href={props.link}>
                    {props.linkText}
                </Link>
            </div>
        </div>
    );
};

export default PromoCard;
