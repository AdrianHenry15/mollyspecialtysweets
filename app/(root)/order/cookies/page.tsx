import { Metadata } from "next";
import React from "react";

import CookieForm from "@/components/forms/cookie";
import ProductRow from "@/components/products/product-row";
import { Category } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Cookies",
    description: "Order Cookies With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCookies = () => {
    return (
        <div>
            <ProductRow category={Category.COOKIES} />
            <CookieForm />
        </div>
    );
};

export default OrderCookies;
