import React from "react";
import { Metadata } from "next";

import CakeForm from "@/components/forms/bakery/cake";
import ProductRow from "@/components/products/product-row";
import { Collection } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Cakes",
    description: "Design your own cake",
};

const CakePage = () => {
    return (
        <div className="flex flex-col w-full">
            {/* <div className="pr-10 bg-black"> */}
            <ProductRow collection={"Cakes"} />
            {/* </div> */}
            <CakeForm />
        </div>
    );
};

export default CakePage;
