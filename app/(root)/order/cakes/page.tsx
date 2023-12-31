import CakeForm from "@/components/forms/cake";
import React from "react";

import { SiCookiecutter } from "react-icons/si";
import { GiCupcake } from "react-icons/gi";
import FormNav from "@/components/forms/form-nav";

const CakesPage = () => {
    return (
        <div>
            {/* <div className="flex justify-evenly items-center h-64 bg-black">
                <div className="flex flex-col items-center">
                    <SiCookiecutter className="text-white p-6" size={100} />
                    <p className="text-xs text-white">Order Cookies</p>
                </div>
                <div className="flex flex-col items-center">
                    <GiCupcake className="text-white p-6" size={100} />
                    <p className="text-xs text-white">Order Cookies</p>
                </div>
            </div> */}
            <FormNav
                icon={<SiCookiecutter className="text-white p-6" size={100} />}
                name="Order Cookies"
                link={"/order/cookies"}
                icon2={<GiCupcake className="text-white p-6" size={100} />}
                name2="Order Cupcakes"
                link2={"/order/cupcakes"}
            />
            <CakeForm />
        </div>
    );
};

export default CakesPage;
