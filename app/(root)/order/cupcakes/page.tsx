import React from "react";
import { Metadata } from "next";

import CupcakeForm from "@/components/forms/cupcake";
import PageFormContainer from "@/components/page-form-container";

export const metadata: Metadata = {
    title: "Order Cupcakes",
    description: "Order Cupcakes With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCupcakes = () => {
    return (
        // <PageFormContainer>
        <CupcakeForm />
        // </PageFormContainer>
    );
};

export default OrderCupcakes;
