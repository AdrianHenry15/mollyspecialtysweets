import React from "react";
import Image from "next/image";

const BirthdayBanner = () => {
    return (
        <section className="flex flex-col bg-main p-4 md:flex-row md:justify-center">
            <div className="flex flex-col md:flex-1 md:justify-center md:px-10 md:max-w-[700px]">
                <h2 className="font-semibold text-2xl md:text-4xl">Birthday Treat</h2>
                <p className="font-light text-sm py-2 md:text-lg">
                    Enjoy a FREE ice cream on your birthday every year! To sign up, simply visit your <strong>Taharka Bros Account</strong>{" "}
                    online or add your birthday through the Taharka App.
                </p>
            </div>
            {/* <div className="self-center"> */}
            {/* <Image className="self-center md:flex-1 md:max-w-[500px]" src={IceCreamImage} alt="ice-cream-png" width={500} height={500} /> */}
            {/* </div> */}
        </section>
    );
};

export default BirthdayBanner;
