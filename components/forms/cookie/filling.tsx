import React from "react";

import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CookieFillings } from "@/lib/constants";

interface ICookieFillingProps {
    control: any;
    className?: string;
}

const CookieFilling = (props: ICookieFillingProps) => {
    return (
        <AutocompleteFormInput
            title="Cookie Filling"
            name="cookieFilling"
            options={CookieFillings}
            label="Cookie Filling"
            control={props.control}
        />
    );
};

export default CookieFilling;
