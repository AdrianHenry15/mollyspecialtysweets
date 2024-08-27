import React from "react";
import { Metadata } from "next";

import CakeForm from "@/components/forms/cake";
import PageFormContainer from "@/components/page-form-container";

export const metadata: Metadata = {
    title: "Create A Cake",
    description: "Create A Cake With Our Pre-Selected Frostings, Fillings, and Flavors",
};

const CakePage = () => {
    return (
        <div>
            {/* <PageFormContainer> */}
            <CakeForm />
            {/* </PageFormContainer> */}
        </div>
    );
};

export default CakePage;
