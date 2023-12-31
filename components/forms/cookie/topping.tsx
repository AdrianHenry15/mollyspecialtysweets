import React from "react";
import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CookieToppings } from "@/lib/constants";

interface ICookieToppingProps {
    control: any;
    className?: string;
}

const CookieTopping = (props: ICookieToppingProps) => {
    return (
        <AutocompleteFormInput
            title="Cookie Topping"
            name="cookieTopping"
            options={CookieToppings}
            label="Cookie Topping"
            control={props.control}
        />
    );
};

export default CookieTopping;
