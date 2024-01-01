import React from "react";

import AutocompleteFormInput from "../form-item";
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
