import Image, { StaticImageData } from "next/image";
import React from "react";

interface IBannerProps {
    img: StaticImageData;
}

const Banner = (props: IBannerProps) => {
    return (
        <section className="relative flex items-center justify-center">
            <Image src={props.img} alt="pink-splash" className="object-cover w-full h-[23rem]" />
        </section>
    );
};

export default Banner;
