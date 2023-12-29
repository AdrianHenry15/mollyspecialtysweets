import React from "react";
import CupcakeSize from "./size";
import CupcakeFlavor from "./flavor";
import CupcakeFrosting from "./frosting";
import CupcakeFilling from "./filling";

const CupcakeForm = () => {
    return (
        <section>
            <CupcakeSize />
            <CupcakeFlavor />
            <CupcakeFrosting />
            <CupcakeFilling />
        </section>
    );
};

export default CupcakeForm;
