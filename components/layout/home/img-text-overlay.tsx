import Image from "next/image";
import React from "react";

interface IImageTextOverlayProps {
    image: any;
}

const ImageTextOverlay = (props: IImageTextOverlayProps) => {
    return (
        <div className="bg-black">
            <Image
                src={props.image}
                alt="cake-splash"
                className={`w-screen object-top md:opacity-75 md:object-top md:h-{100}`}
                loading="eager"
            />

            <h5 className="hidden justify-center absolute inset-0 font-semibold text-white text-2xl md:flex md:items-center md:text-6xl">{`Molly's Specialty Sweets`}</h5>
        </div>
    );
};

export default ImageTextOverlay;
