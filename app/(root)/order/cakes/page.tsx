import React from "react";
import { Metadata } from "next";

import CakeForm from "@/components/form-components/bakery/cake";
import PageFormContainer from "@/components/page-form-container";
import ProductRow from "@/components/products/product-row";

export const metadata: Metadata = {
    title: "Create A Cake",
    description: "Create A Cake With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const CakePage = () => {
    return (
        <div className="flex flex-col w-full">
            {/* CAKE ROW */}
            <ProductRow collection="Cakes" className="bg-emerald-900" />
            <PageFormContainer className="self-center md:w-[600px] lg:w-[650px] xl:w-[700px]">
                <CakeForm />
            </PageFormContainer>
        </div>
    );
};

export default CakePage;
