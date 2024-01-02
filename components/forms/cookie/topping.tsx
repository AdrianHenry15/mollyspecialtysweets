import React from "react";

import { CookieToppings } from "@/lib/constants";
import AutocompleteFormInput from "../form-item";

interface ICookieToppingProps {
    control: any;
}

const CookieTopping = (props: ICookieToppingProps) => {
    return (
        <AutocompleteFormInput
            autocomplete
            title="Cookie Topping"
            name="cookieTopping"
            options={CookieToppings as []}
            label="Cookie Topping"
            control={props.control}
        />
    );
};

export default CookieTopping;
