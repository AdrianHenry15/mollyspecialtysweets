import React from "react";
import { Metadata } from "next";

import ProductRow from "@/components/products/product-row";
import CakeForm from "@/components/form-components/forms/bakery/cake";

export const metadata: Metadata = {
    title: "Cakes",
    description: "Design your own cake",
};

const CakePage = () => {
    return (
        <div className="flex flex-col w-full">
            <ProductRow collection={"Cakes"} />
            <CakeForm />
        </div>
    );
};

export default CakePage;
