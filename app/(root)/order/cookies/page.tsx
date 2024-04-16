import React from "react";
import { Metadata } from "next";

import CookieForm from "@/components/forms/cookie";
import PageFormContainer from "@/components/page-form-container";

export const metadata: Metadata = {
    title: "Molly's Cookies",
    description: "Order Cookies Here",
};

const OrderCookies = () => {
    return (
        <PageFormContainer>
            <CookieForm />
        </PageFormContainer>
    );
};

export default OrderCookies;
