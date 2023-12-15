import Image from "next/image";
import React from "react";

interface IImageTextOverlayProps {
    image?: any;
}

const ImageTextOverlay = () => {
    return (
        <div
            className={`flex w-full items-center justify-center relative bg-cover bg-[url('/cake-splash.jpg')] h-80 md:h-[80vh] lg:h-[50vh]`}
        ></div>
    );
};

export default ImageTextOverlay;
