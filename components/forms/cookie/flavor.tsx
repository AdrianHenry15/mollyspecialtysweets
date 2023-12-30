import React from "react";
import AutocompleteFormInput from "../autocomplete-form-input";
import { CookieFlavors } from "@/lib/constants";

interface ICookieFlavorProps {
    control: any;
    className?: string;
}

const CookieFlavor = (props: ICookieFlavorProps) => {
    return (
        <AutocompleteFormInput
            title="Cookie Filling"
            name="cookieFilling"
            options={CookieFlavors}
            label="Cookie Flavor"
            control={props.control}
        />
    );
};

export default CookieFlavor;
