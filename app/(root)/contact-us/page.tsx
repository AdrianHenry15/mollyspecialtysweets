import React from "react";
import { Metadata } from "next";

import ContactFormContainer from "@/components/forms/contact-form-container";

export const metadata: Metadata = {
    title: "Contact Our Team",
    description: "Contact Our Team Today",
};

const ContactUsPage = () => {
    return (
        <div>
            <ContactFormContainer />
        </div>
    );
};

export default ContactUsPage;
