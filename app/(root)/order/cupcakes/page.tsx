import React from "react";
import { Metadata } from "next";

import CupcakeForm from "@/components/forms/bakery/cupcake";
import ProductRow from "@/components/products/product-row";

export const metadata: Metadata = {
    title: "Cupcakes",
    description: "Order Cupcakes With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCupcakes = () => {
    return (
        <div className="flex flex-col justify-between w-full">
            <div className="pr-10 bg-black">
                <ProductRow collection={"Cupcakes"} />
            </div>
            <CupcakeForm />
        </div>
    );
};

export default OrderCupcakes;
