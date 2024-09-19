import ContactFormContainer from "@/components/form-components/contact-form-container";
import { Metadata } from "next";
import React from "react";

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
