import React from "react";
import { Metadata } from "next";

import CupcakeForm from "@/components/forms/cupcake";
import PageFormContainer from "@/components/page-form-container";

export const metadata: Metadata = {
    title: "Molly's Cupcakes",
    description: "Order Cupcakes Here",
};

const OrderCupcakes = () => {
    return (
        <PageFormContainer>
            <CupcakeForm />
        </PageFormContainer>
    );
};

export default OrderCupcakes;
