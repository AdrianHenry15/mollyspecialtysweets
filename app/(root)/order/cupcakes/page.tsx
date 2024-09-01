import React from "react";
import { Metadata } from "next";

import CupcakeForm from "@/components/forms/cupcake";
import ProductRow from "@/components/products/product-row";
import { Category } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Cupcakes",
    description: "Order Cupcakes With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCupcakes = () => {
    return (
        <div>
            <ProductRow category={Category.CUPCAKES} />
            <CupcakeForm />
        </div>
    );
};

export default OrderCupcakes;
