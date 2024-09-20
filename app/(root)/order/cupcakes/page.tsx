import React from "react";
import { Metadata } from "next";

import CupcakeForm from "@/components/form-components/bakery/cupcake";
import PageFormContainer from "@/components/page-form-container";
import ProductRow from "@/components/products/product-row";

export const metadata: Metadata = {
    title: "Order Cupcakes",
    description: "Order Cupcakes With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCupcakes = () => {
    return (
        <div className="flex flex-col w-full">
            {/* CUPCAKE ROW */}
            <ProductRow collection="Cupcakes" className="bg-pink-900" />
            <PageFormContainer className="self-center md:w-[600px] lg:w-[650px] xl:w-[700px]">
                <CupcakeForm />
            </PageFormContainer>
        </div>
    );
};

export default OrderCupcakes;
