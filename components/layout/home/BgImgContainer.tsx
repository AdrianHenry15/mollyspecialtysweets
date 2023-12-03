import Image from "next/image";
import React from "react";

import CakeSplash from "@/public/cake-splash.jpg";

interface IBgImgContainerProps {
    image1?: string;
    image2?: string;
    singleImg?: boolean;
}

const BgImgContainer = (props: IBgImgContainerProps) => {
    return (
        <div className="relative">
            <Image
                src={CakeSplash}
                alt="cake-splash"
                className={`flex flex-1 absolute ${props.singleImg ? "w-full" : "w-1/2 left-0"}`}
                loading="eager"
            />

            {props.singleImg ? null : (
                <Image loading="eager" src={CakeSplash} alt="cake-splash" className="flex flex-1 w-1/2 absolute right-0" />
            )}
        </div>
    );
};

export default BgImgContainer;
