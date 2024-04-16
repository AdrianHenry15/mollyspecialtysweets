import React from "react";
import { Metadata } from "next";

import CakeForm from "@/components/forms/cake";
import PageFormContainer from "@/components/page-form-container";

export const metadata: Metadata = {
    title: "Molly's Cakes",
    description: "Create a Cake",
};

const CakePage = () => {
    return (
        <div>
            <PageFormContainer>
                <CakeForm />
            </PageFormContainer>
        </div>
    );
};

export default CakePage;
