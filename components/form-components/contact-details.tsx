import React from "react";
import { FieldErrors } from "react-hook-form";

import FormItem from "./form-item";
import { useUser } from "@clerk/nextjs";

interface IContactDetailsProps {
    control: any;
    errors: FieldErrors;
}

const ContactDetails = (props: IContactDetailsProps) => {
    const { user } = useUser();
    return (
        <div>
            {/* FORM */}
            <div className="">
                <h1 className="font-semibold text-4xl underline text-center my-10">Contact Details</h1>
                {/* FIRST NAME */}
                <FormItem defaultValue={user?.firstName || ""} textInput control={props.control} title={"First Name"} name={"firstName"} />

                {/* LAST NAME */}
                <FormItem defaultValue={user?.lastName || ""} textInput control={props.control} title={"Last Name"} name={"lastName"} />

                {/* PHONE NUMBER */}
                <FormItem
                    defaultValue={user?.primaryPhoneNumber?.phoneNumber || ""}
                    textInput
                    control={props.control}
                    title={"Phone Number"}
                    name={"phoneNumber"}
                />

                {/* EMAIL */}
                <FormItem
                    defaultValue={user?.primaryEmailAddress?.emailAddress || ""}
                    textInput
                    control={props.control}
                    title={"Email*"}
                    label="Email"
                    name={"email"}
                    required
                    errors={props.errors}
                />
            </div>
        </div>
    );
};

export default ContactDetails;
