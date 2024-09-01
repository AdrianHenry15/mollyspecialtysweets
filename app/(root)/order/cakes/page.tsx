import React from "react";
import { Metadata } from "next";

import CakeForm from "@/components/forms/cake";
import ProductRow from "@/components/products/product-row";
import { Category } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Cakes",
    description: "Design your own cake",
};

const CakePage = () => {
    return (
        <div>
            <ProductRow category={Category.CAKES} />
            <CakeForm />
        </div>
    );
};

export default CakePage;
