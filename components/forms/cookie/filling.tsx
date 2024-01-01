import React from "react";

import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CookieFillings } from "@/lib/constants";

interface ICookieFillingProps {
    control: any;
}

const CookieFilling = (props: ICookieFillingProps) => {
    return (
        <AutocompleteFormInput
            autocomplete
            title="Cookie Filling"
            name="cookieFilling"
            options={CookieFillings as []}
            label="Cookie Filling"
            control={props.control}
        />
    );
};

export default CookieFilling;
