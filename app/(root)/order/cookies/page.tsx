import { Metadata } from "next";
import React from "react";

import CookieForm from "@/components/forms/cookie";
import ProductRow from "@/components/products/product-row";
import { Collection } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Cookies",
    description: "Order Cookies With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const OrderCookies = () => {
    return (
        <div>
            <div className="pr-10 bg-black">
                <ProductRow collection={Collection.COOKIES} />
            </div>
            <CookieForm />
        </div>
    );
};

export default OrderCookies;
