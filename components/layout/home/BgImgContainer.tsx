import Image from "next/image";
import React from "react";

interface IBgImgContainerProps {
    image: any;
    children: React.ReactNode;
}

const BgImgContainer = (props: IBgImgContainerProps) => {
    return (
        <div className="fixed top-0">
            {/* <div className="w-full h-screen justify-center items-center hidden md:flex"> */}

            <Image src={props.image} alt="cake-splash" className={`w-screen md:object-cover  md:h-screen`} loading="eager" />
            <div className="flex justify-center items-center md:absolute md:inset-0">{props.children}</div>
        </div>
    );
};

export default BgImgContainer;
