import Image from "next/image";
import React from "react";

interface IIconsSectionProps {
    src: any;
    name: string;
    description: string;
}

const IconsSection = (props: IIconsSectionProps) => {
    return (
        <article className="flex flex-col px-4 py-10 justify-center items-center flex-1 mx-10">
            <Image src={props.src} alt="cookie-icon" width={75} height={75} />
            <h5 className="text-white my-4 font-semibold text-2xl">{props.name}</h5>
            <p className="text-white font-light">{props.description}</p>
        </article>
    );
};

export default IconsSection;
