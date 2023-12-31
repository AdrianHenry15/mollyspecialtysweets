import React from "react";
import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CookieFlavors } from "@/lib/constants";

interface ICookieFlavorProps {
    control: any;
    className?: string;
}

const CookieFlavor = (props: ICookieFlavorProps) => {
    return (
        <AutocompleteFormInput
            title="Cookie Flavor"
            name="cookieFlavor"
            options={CookieFlavors}
            label="Cookie Flavor"
            control={props.control}
        />
    );
};

export default CookieFlavor;
