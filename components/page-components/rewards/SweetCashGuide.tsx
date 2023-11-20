import React from "react";

import { BsHandIndexThumb } from "react-icons/bs";
import { HiOutlineHandThumbUp } from "react-icons/hi2";

const SweetCashGuide = () => {
    return (
        <section className="flex flex-col items-center p-4">
            <h3 className="font-semibold text-2xl md:text-4xl">Using your Cream Cash</h3>
            {/* CONTAINER 1 */}
            <div className="flex items-center py-4">
                <BsHandIndexThumb className="flex flex-1" size={100} />
                <div className="flex flex-col flex-1">
                    <h5 className="font-semibold text-xl">How to use in-store</h5>
                    <p className="font-light text-sm">
                        Enter your phone number at checkout OR tap in your Cream card to reveal a QR code which you can scan at any Cream
                        location.
                    </p>
                </div>
            </div>
            {/* CONTAINER 2 */}
            <div className="flex items-center py-4">
                <div className="flex flex-col flex-1">
                    <h5 className="font-semibold text-xl">How to use online</h5>
                    <p className="font-light text-sm">{`You can also use your Cream Card during checkout on the Taharka App or website. Look for the button labeled "Cream Cash" on the tip and payment screen.`}</p>
                </div>
                <HiOutlineHandThumbUp className="flex flex-1" size={100} />
            </div>
        </section>
    );
};

export default SweetCashGuide;
