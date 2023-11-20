import Image from "next/image";
import React from "react";

import Splash from "../../../public/cake-splash.jpg";

const Jumbotron = () => {
    return (
        <section className="flex w-full h-full">
            <Image className="flex w-full h-full" src={Splash} alt="splash" width={0} height={0} loading="eager" />
        </section>
    );
};

export default Jumbotron;
