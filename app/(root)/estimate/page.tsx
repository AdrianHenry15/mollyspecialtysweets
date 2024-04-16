import React from "react";
import { Metadata } from "next";

import ContactFormContainer from "@/components/forms/contact-form-container";

export const metadata: Metadata = {
    title: "Get Your Free Estimate",
    description: "Get An Estimate Today",
};

const Estimate = () => {
    return (
        <div>
            <ContactFormContainer />
        </div>
    );
};

export default Estimate;
