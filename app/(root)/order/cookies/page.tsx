import { Metadata } from "next";
import React from "react";

import ProductRow from "@/components/products/product-row";
import CookieForm from "@/components/form-components/forms/bakery/cookie";

export const metadata: Metadata = {
    title: "Cookies",
    description: "Order Cookies With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCookies = () => {
    return (
        <div className="flex flex-col justify-between w-full">
            <ProductRow collection={"Cookies"} />
            <CookieForm />
        </div>
    );
};

export default OrderCookies;
