import Image from "next/image";
import React from "react";

interface IBgImgContainerProps {
    image: any;
    children: React.ReactNode;
}

const BgImgContainer = (props: IBgImgContainerProps) => {
    return (
        <div className="relative">
            <Image src={props.image} alt="cake-splash" className={`object-cover w-screen h-full`} loading="eager" />
            <div className="absolute inset-0 flex justify-center items-center">{props.children}</div>
        </div>
    );
};

export default BgImgContainer;
