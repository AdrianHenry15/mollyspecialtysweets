import React from "react";

import AutocompleteFormInput from "../autocomplete-form-input";
import { CakeFrostings } from "@/lib/constants";

interface ICakeFrostingProps {
    control: any;
}

const CakeFrosting = (props: ICakeFrostingProps) => {
    return (
        <AutocompleteFormInput
            title="Cake Frosting"
            name="cakeFrosting"
            options={CakeFrostings}
            label="Cake Frosting"
            control={props.control}
        />
    );
};

export default CakeFrosting;
