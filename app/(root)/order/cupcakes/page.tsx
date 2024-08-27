import React from "react";
import { Metadata } from "next";

import CupcakeForm from "@/components/forms/cupcake";

export const metadata: Metadata = {
    title: "Cupcakes",
    description: "Order Cupcakes With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCupcakes = () => {
    return <CupcakeForm />;
};

export default OrderCupcakes;
