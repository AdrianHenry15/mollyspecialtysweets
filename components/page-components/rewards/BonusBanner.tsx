import Image from "next/image";
import React from "react";

const BonusBanner = () => {
    return (
        <section className="bg-white flex flex-col p-4 md:text-center">
            <div className="flex flex-col">
                <h4 className="font-semibold text-2xl md:text-4xl">Bonus points & Double Cream Days</h4>
                <p className="my-2">Never miss a chance to earn Double Cream on select days so you can get FREE treats faster!</p>
            </div>
            {/* <Image className="self-center" src={IceCreamVariety} alt="vanilla-cone" height={500} width={500} /> */}
        </section>
    );
};

export default BonusBanner;
