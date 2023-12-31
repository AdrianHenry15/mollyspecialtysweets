"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsCake } from "react-icons/bs";
import { GiCupcake } from "react-icons/gi";
import { SiCookiecutter } from "react-icons/si";

interface IFormNavProps {}

const FormNav = (props: IFormNavProps) => {
    const pathname = usePathname();

    const TextClass = "text-lg font-semibold text-white";
    return (
        <div className="flex justify-evenly items-center h-64 bg-black">
            {pathname === "/order/cakes" && (
                <div className="flex justify-evenly w-full lg:w-[50%]">
                    {/* CUPCAKE */}
                    <Link href={"/order/cupcakes"} className="flex flex-col items-center">
                        {<GiCupcake className="text-white p-6" size={125} />}
                        <p className={TextClass}>{"Order Cupcakes"}</p>
                    </Link>
                    {/* COOKIE */}
                    <Link href={"/order/cookies"} className="flex flex-col items-center">
                        {<SiCookiecutter className="text-white p-6" size={125} />}
                        <p className={TextClass}>{"Order Cookies"}</p>
                    </Link>
                </div>
            )}
            {pathname === "/order/cookies" && (
                <div className="flex justify-evenly w-full lg:w-[50%]">
                    {/* CAKE */}
                    <Link href={"/order/cakes"} className="flex flex-col items-center">
                        {<BsCake className="text-white p-6" size={125} />}
                        <p className={TextClass}>{"Order Cakes"}</p>
                    </Link>
                    {/* CUPCAKE */}
                    <Link href={"/order/cupcakes"} className="flex flex-col items-center">
                        {<GiCupcake className="text-white p-6" size={125} />}
                        <p className={TextClass}>{"Order Cupcakes"}</p>
                    </Link>
                </div>
            )}
            {pathname === "/order/cupcakes" && (
                <div className="flex justify-evenly w-full lg:w-[50%]">
                    {/* CAKE */}
                    <Link href={"/order/cakes"} className="flex flex-col items-center">
                        {<BsCake className="text-white p-6" size={125} />}
                        <p className={TextClass}>{"Order Cakes"}</p>
                    </Link>
                    {/* COOKIE */}
                    <Link href={"/order/cookies"} className="flex flex-col items-center">
                        {<SiCookiecutter className="text-white p-6" size={125} />}
                        <p className={TextClass}>{"Order Cookies"}</p>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default FormNav;
