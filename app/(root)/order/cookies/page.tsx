import { Metadata } from "next";
import React from "react";

import CookieForm from "@/components/forms/cookie";
import PageFormContainer from "@/components/page-form-container";

export const metadata: Metadata = {
    title: "Order Cookies",
    description: "Order Cookies With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCookies = () => {
    return (
        // <PageFormContainer>
        <CookieForm />
        // </PageFormContainer>
    );
};

export default OrderCookies;
