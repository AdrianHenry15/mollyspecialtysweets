import { Metadata } from "next";
import React from "react";

import ContactFormContainer from "@/components/form-components/forms/contact-form-container";

export const metadata: Metadata = {
    title: "Get An Estimate Today",
    description: "Get An Estimate For Your Bakery Needs",
};

const Estimate = () => {
    return (
        <div>
            <ContactFormContainer />
        </div>
    );
};

export default Estimate;
