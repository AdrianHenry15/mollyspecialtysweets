import React from "react";

import AutocompleteFormInput from "../form-item";
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
            hasFruit
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
