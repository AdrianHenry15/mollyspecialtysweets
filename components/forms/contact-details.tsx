import React from "react";
import { FieldErrors } from "react-hook-form";

import FormItem from "./form-item";

interface IContactDetailsProps {
    control: any;
    errors: FieldErrors;
}

const ContactDetails = (props: IContactDetailsProps) => {
    return (
        <div>
            {/* FORM */}
            <div className="">
                <h1 className="font-semibold text-4xl underline text-center my-10">Contact Details</h1>
                {/* FIRST NAME */}
                <FormItem textInput control={props.control} title={"First Name"} name={"firstName"} />

                {/* LAST NAME */}
                <FormItem textInput control={props.control} title={"Last Name"} name={"lastName"} />

                {/* PHONE NUMBER */}
                <FormItem textInput control={props.control} title={"Phone Number"} name={"phoneNumber"} />

                {/* EMAIL */}
                <FormItem textInput control={props.control} title={"Email*"} label="Email" name={"email"} required errors={props.errors} />
            </div>
        </div>
    );
};

export default ContactDetails;
