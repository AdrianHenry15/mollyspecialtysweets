import React from "react";

import AutocompleteFormInput from "../autocomplete-form-input";
import { CookieFrostings } from "@/lib/constants";

interface ICookieFrostingProps {
    control: any;
    className?: string;
}

const CookieFrosting = (props: ICookieFrostingProps) => {
    return (
        <AutocompleteFormInput
            title="Cookie Frosting"
            name="cookieFrosting"
            options={CookieFrostings}
            label="Cookie Frosting"
            control={props.control}
        />
    );
};

export default CookieFrosting;
