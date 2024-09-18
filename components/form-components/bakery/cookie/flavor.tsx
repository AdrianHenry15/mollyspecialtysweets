import React from "react";
import AutocompleteFormInput from "../../form-item";
import { CookieFlavors } from "@/lib/constants";
import { FieldErrors } from "react-hook-form";

interface ICookieFlavorProps {
    control: any;
    errors: FieldErrors;
}

const CookieFlavor = (props: ICookieFlavorProps) => {
    return (
        <AutocompleteFormInput
            required
            errors={props.errors}
            autocomplete
            title="Cookie Flavor"
            name="cookieFlavor"
            options={CookieFlavors as []}
            label="Cookie Flavor"
            control={props.control}
        />
    );
};

export default CookieFlavor;
