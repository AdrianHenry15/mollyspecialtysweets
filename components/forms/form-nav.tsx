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
    const IconClass = "text-white p-6";
    const ContainerClass = "flex flex-col justify-evenly w-full lg:flex-row lg:w-[50%]";
    return (
        <div className="flex justify-evenly items-center h-[50vh] bg-black">
            {pathname === "/order/cakes" && (
                <div className={ContainerClass}>
                    {/* CUPCAKE */}
                    <Link href={"/order/cupcakes"} className="flex flex-col items-center my-4">
                        {<GiCupcake className={IconClass} size={125} />}
                        <p className={TextClass}>{"Order Cupcakes"}</p>
                    </Link>
                    {/* COOKIE */}
                    <Link href={"/order/cookies"} className="flex flex-col items-center my-4">
                        {<SiCookiecutter className={IconClass} size={125} />}
                        <p className={TextClass}>{"Order Cookies"}</p>
                    </Link>
                </div>
            )}
            {pathname === "/order/cookies" && (
                <div className={ContainerClass}>
                    {/* CAKE */}
                    <Link href={"/order/cakes"} className="flex flex-col items-center">
                        {<BsCake className={IconClass} size={125} />}
                        <p className={TextClass}>{"Order Cakes"}</p>
                    </Link>
                    {/* CUPCAKE */}
                    <Link href={"/order/cupcakes"} className="flex flex-col items-center">
                        {<GiCupcake className={IconClass} size={125} />}
                        <p className={TextClass}>{"Order Cupcakes"}</p>
                    </Link>
                </div>
            )}
            {pathname === "/order/cupcakes" && (
                <div className={ContainerClass}>
                    {/* CAKE */}
                    <Link href={"/order/cakes"} className="flex flex-col items-center">
                        {<BsCake className={IconClass} size={125} />}
                        <p className={TextClass}>{"Order Cakes"}</p>
                    </Link>
                    {/* COOKIE */}
                    <Link href={"/order/cookies"} className="flex flex-col items-center">
                        {<SiCookiecutter className={IconClass} size={125} />}
                        <p className={TextClass}>{"Order Cookies"}</p>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default FormNav;
