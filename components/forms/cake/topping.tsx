import React from "react";

import AutocompleteFormInput from "../autocomplete-form-input";
import { CakeToppings } from "@/lib/constants";

interface ICakeToppingProps {
    control: any;
}

const CakeTopping = (props: ICakeToppingProps) => {
    return <AutocompleteFormInput title="Cake Topping" name="cakeTopping" options={CakeToppings} label="Topping" control={props.control} />;
};

export default CakeTopping;
