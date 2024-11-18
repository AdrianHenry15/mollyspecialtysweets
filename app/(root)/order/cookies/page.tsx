import { Metadata } from "next";
import React from "react";

import CookieForm from "@/components/form-components/bakery/cookie";
import PageFormContainer from "@/components/page-form-container";
import ProductRow from "@/components/products/product-row";

export const metadata: Metadata = {
    title: "Order Cookies",
    description: "Order Cookies With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCookies = () => {
    return (
        <div className="flex flex-col w-full">
            {/* COOKIE ROW */}
            <ProductRow collection="Cookies" className="bg-amber-900" />
            <PageFormContainer className="self-center md:w-[600px] lg:w-[650px] xl:w-[700px]">
                <CookieForm />
            </PageFormContainer>
        </div>
    );
};

export default OrderCookies;
