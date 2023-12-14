import React from "react";

import Cookie from "@/public/cookie.png";
import Cake from "@/public/birthday-cake.png";
import Cupcake from "@/public/muffin.png";

import IconsSection from "./icons-section";

const IconsRow = () => {
    return (
        <section className="bg-black flex flex-col justify-center items-center text-center py-14 px-10 md:px-48 lg:flex-row lg:px-36">
            <IconsSection src={Cookie} name="Cookies" description="Expertly crafted artisinal cookies for a joyous indulgence" />
            <IconsSection
                src={Cake}
                name="Cakes"
                description="Save the perfection of Molly's cakes—a delightful blend of quality and flavor in every bite"
            />
            <IconsSection
                src={Cupcake}
                name="Cupcakes"
                description="Sweeten up your day with Molly's Cupcakery—where tiny treats bring big joy"
            />
        </section>
    );
};

export default IconsRow;
