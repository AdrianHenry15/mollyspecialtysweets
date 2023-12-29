import React from "react";
import CakeTier from "./tier";
import CakeSize from "./size";
import CakeShape from "./shape";
import CakeFlavor from "./flavor";
import CakeFrosting from "./frosting";
import CakeFilling from "./filling";
import CakeTopping from "./topping";

const CakeForm = () => {
    return (
        <section>
            <CakeTier />
            <CakeSize />
            <CakeShape />
            <CakeFlavor />
            <CakeFrosting />
            <CakeFilling />
            <CakeTopping />
        </section>
    );
};

export default CakeForm;
