import React from "react";
import { Metadata } from "next";

import ProductRow from "@/components/products/product-row";
import CupcakeForm from "@/components/form-components/forms/bakery/cupcake";

export const metadata: Metadata = {
    title: "Cupcakes",
    description: "Order Cupcakes With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCupcakes = () => {
    return (
        <div className="flex flex-col justify-between w-full">
            {/* <ProductRow collection={"Cupcakes"} /> */}
            <CupcakeForm />
        </div>
    );
};

export default OrderCupcakes;
