import React from "react";
import TemplateBtn from "../../buttons/TemplateBtn";
import Template from "./Template";
import useCupcakeStore from "../../../hooks/useCupcakeStore";

const CupcakeModal = () => {
    const { setCupcakeFlavor, setCupcakeFrosting } = useCupcakeStore();
    const setVanilla = () => {
        setCupcakeFlavor("Vanilla");
        setCupcakeFrosting("Vanilla Buttercream");
    };

    const setChocolate = () => {
        setCupcakeFlavor("Chocolate");
        setCupcakeFrosting("Chocolate Buttercream");
    };

    const setStrawberry = () => {
        setCupcakeFlavor("Strawberry");
        setCupcakeFrosting("Strawberry Buttercream");
    };
    return (
        <Template template="Cupcake">
            {/* VANILLA */}
            <TemplateBtn onClick={() => setVanilla()} template="Cupcake" className="bg-amber-100" text="Vanilla" />
            {/* CHOCOLATE */}
            <TemplateBtn onClick={() => setChocolate()} template="Cupcake" className="bg-amber-900" text="Chocolate" />
            {/* STRAWBERRY */}
            <TemplateBtn onClick={() => setStrawberry()} template="Cupcake" className="bg-rose-400" text="Strawberry" />
        </Template>
    );
};

export default CupcakeModal;
