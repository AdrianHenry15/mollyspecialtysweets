import ContactFormContainer from "@/components/forms/contact-form-container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Contact Our Team",
    description: "Contact The Molly Specialty Sweets Team",
};

const ContactUsPage = () => {
    return (
        <div>
            <ContactFormContainer />
        </div>
    );
};

export default ContactUsPage;
