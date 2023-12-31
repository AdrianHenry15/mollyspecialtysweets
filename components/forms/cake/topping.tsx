import React from "react";

import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CakeToppings } from "@/lib/constants";
import FormItem from "../form-item";
import { FieldErrors } from "react-hook-form";

interface ICakeToppingProps {
    control: any;
}

const CakeTopping = (props: ICakeToppingProps) => {
    return (
        // <AutocompleteFormInput
        //     title="Cake Topping"
        //     name="cakeTopping"
        //     options={CakeToppings as []}
        //     label="Topping"
        //     control={props.control}
        // />
        <FormItem
            autocomplete
            freeSolo
            control={props.control}
            title={"Cake Toppings"}
            name={"cakeTopping"}
            options={CakeToppings as []}
            label={"Cake Topping"}
        />
    );
};

export default CakeTopping;
