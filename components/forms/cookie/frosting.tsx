import React from "react";

import { CookieFrostings } from "@/lib/constants";
import AutocompleteFormInput from "../form-item";

interface ICookieFrostingProps {
    control: any;
}

const CookieFrosting = (props: ICookieFrostingProps) => {
    return (
        <AutocompleteFormInput
            autocomplete
            title="Cookie Frosting"
            name="cookieFrosting"
            options={CookieFrostings as []}
            label="Cookie Frosting"
            control={props.control}
        />
    );
};

export default CookieFrosting;
