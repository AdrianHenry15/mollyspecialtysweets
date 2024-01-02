import React from "react";

import { FieldErrors } from "react-hook-form";
import { Amounts } from "@/lib/constants";
import AutocompleteFormInput from "../form-item";

interface ICookieAmountProps {
    control: any;
    errors: FieldErrors;
}

const CookieAmount = (props: ICookieAmountProps) => {
    return (
        <AutocompleteFormInput
            required
            errors={props.errors}
            autocomplete
            title="Cookie Amount"
            name="cookieAmount"
            options={Amounts as []}
            label="Cookie Amount"
            control={props.control}
        />
    );
};

export default CookieAmount;
