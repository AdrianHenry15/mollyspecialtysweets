import React from "react";

import AutocompleteFormInput from "../inputs/autocomplete-form-input";
import { CakeFrostings } from "@/lib/constants";

interface ICakeFrostingProps {
    control: any;
}

const CakeFrosting = (props: ICakeFrostingProps) => {
    return (
        <AutocompleteFormInput
            title="Cake Frosting"
            name="cakeFrosting"
            required
            options={CakeFrostings as []}
            label="Cake Frosting"
            control={props.control}
        />
    );
};

export default CakeFrosting;
