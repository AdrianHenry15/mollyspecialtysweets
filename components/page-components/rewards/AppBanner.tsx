import Image from "next/image";
import React from "react";

import IPhone from "@/public/transparent-iphone.png";
import Link from "next/link";

const AppBanner = () => {
    return (
        <section className="flex flex-col p-4 bg-main md:items-center">
            <div className="flex flex-col items-start md:justify-center">
                <h5 className="font-semibold text-2xl md:text-4xl">Download the App for the best experience</h5>
                <p className="my-4">Enjoy personalize ordering, FREE Cream, birthday rewards, and more with the Taharka Bros. App.</p>
                <Link className="flex text-white bg-black rounded-full px-20 py-2 self-center" href={"/taharka-app"}>
                    Download the app
                </Link>
            </div>
            <Image className="self-center mt-6" src={IPhone} alt="iphone" width={200} height={200} />
        </section>
    );
};

export default AppBanner;
